(() => {
  // Set this to your Discord server ID and enable "Server Widget" in
  // Server Settings → Widget to show a live online-member count in the hero.
  // Leave empty to hide the count.
  const DISCORD_GUILD_ID = '';

  const FEED_POLL_MS = 60 * 1000;

  function timeAgo(iso) {
    if (!iso) return '';
    const diffMs = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ── Live member count (Discord widget API — public, no token needed) ─────
  async function loadMemberCount() {
    const el = document.getElementById('discordMemberCount');
    if (!el || !DISCORD_GUILD_ID) return;

    try {
      const res = await fetch(`https://discord.com/api/guilds/${DISCORD_GUILD_ID}/widget.json`);
      if (!res.ok) return;
      const data = await res.json();
      const count = Array.isArray(data.members) ? data.members.length : data.presence_count;
      if (typeof count === 'number') {
        el.textContent = `${count} online now`;
        el.classList.remove('hidden');
      }
    } catch {
      // Widget disabled or offline — leave the placeholder hidden.
    }
  }

  // ── Live feeds (build log + spotlight) ────────────────────────────────────
  const FEED_MAX_ENTRIES = 5;
  const FEED_RETRY_MS = 4000;
  const FEED_MAX_RETRIES = 4;

  async function loadFeed(channel, containerId, render, attempt = 0) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
      const res = await fetch(`/api/discord-feed?channel=${channel}`);
      const data = await res.json();
      const messages = (data.messages || []).slice(0, FEED_MAX_ENTRIES);

      if (!data.live && attempt < FEED_MAX_RETRIES) {
        setTimeout(() => loadFeed(channel, containerId, render, attempt + 1), FEED_RETRY_MS);
        return;
      }

      render(container, messages, data.live);
    } catch {
      if (attempt < FEED_MAX_RETRIES) {
        setTimeout(() => loadFeed(channel, containerId, render, attempt + 1), FEED_RETRY_MS);
      }
      // Otherwise leave whatever was already rendered (sample/static fallback in HTML).
    }
  }

  const FEED_AGE_FALLBACK_MIN = [2, 19, 47];
  let buildLogRevealed = false;

  function formatFeedContent(text) {
    return escapeHtml(text).replace(/`([^`]+)`/g, '<code class="feed-code">$1</code>');
  }

  function updateFeedTime(el) {
    const ts = Number(el.dataset.ts);
    if (!ts) return;
    el.textContent = timeAgo(new Date(ts).toISOString());
  }

  function typeFeedMessage(el, text, onDone) {
    if (REDUCE_MOTION) {
      el.innerHTML = formatFeedContent(text);
      onDone();
      return;
    }
    el.textContent = '';
    el.classList.add('feed-typing');
    let i = 0;
    const speed = Math.max(8, Math.min(22, 600 / Math.max(text.length, 1)));
    const tick = () => {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        setTimeout(tick, speed);
      } else {
        el.classList.remove('feed-typing');
        el.innerHTML = formatFeedContent(text);
        onDone();
      }
    };
    tick();
  }

  function updateFeedStatus() {
    const status = document.getElementById('feedStatus');
    const container = document.getElementById('buildLogFeed');
    if (!status || !container || !buildLogRevealed) return;

    const live = container.dataset.live === 'true';
    status.classList.add('is-connected');
    status.classList.toggle('is-live', live);

    const text = status.querySelector('.feed-status-text');
    if (!text) return;
    const label = live ? 'connected' : 'sample data';
    if (text.textContent.trim() !== label) {
      text.textContent = label;
      scrambleReveal(text, 300);
    }
  }

  function revealBuildLogFeed() {
    const container = document.getElementById('buildLogFeed');
    if (!container) return;
    buildLogRevealed = true;
    updateFeedStatus();

    const lines = Array.from(container.querySelectorAll('.feed-line'));
    if (REDUCE_MOTION) {
      lines.forEach(line => {
        const msgEl = line.querySelector('.feed-msg');
        if (msgEl) msgEl.innerHTML = formatFeedContent(msgEl.dataset.final || msgEl.textContent.trim());
      });
      return;
    }

    let i = 0;
    const next = () => {
      if (i >= lines.length) return;
      const msgEl = lines[i].querySelector('.feed-msg');
      if (!msgEl) { i++; next(); return; }
      typeFeedMessage(msgEl, msgEl.dataset.final || '', () => {
        i++;
        setTimeout(next, 220);
      });
    };
    next();
  }

  function prepareFeedLines(container) {
    container.querySelectorAll('.feed-line').forEach(line => {
      const msgEl = line.querySelector('.feed-msg');
      if (msgEl && !msgEl.dataset.final) {
        msgEl.dataset.final = msgEl.textContent.trim();
        if (!REDUCE_MOTION) msgEl.textContent = '';
      }
      const timeEl = line.querySelector('.feed-time');
      if (timeEl) {
        if (!timeEl.dataset.ts) {
          const ago = Number(timeEl.dataset.ago || 0);
          timeEl.dataset.ts = String(Date.now() - ago * 60000);
        }
        updateFeedTime(timeEl);
      }
    });

    container._feedIds = Array.from(container.querySelectorAll('.feed-line')).map(line => {
      const author = line.querySelector('.feed-author')?.textContent.trim() || '';
      const msg = line.querySelector('.feed-msg')?.dataset.final || '';
      return `${author}:${msg}`;
    });
    container.dataset.live = container.dataset.live || 'false';
  }

  function renderFeedLines(container, messages, live) {
    if (!messages.length) return;

    container.dataset.live = String(!!live);

    const prevIds = container._feedIds;
    const nextIds = messages.map(m => `@${m.author}:${m.content}`);

    container.innerHTML = messages.map(() => `
      <div class="feed-line flex items-start gap-sm py-xs">
        <span class="feed-author font-label-sm text-label-sm text-primary-fixed-dim font-mono shrink-0 flex items-center gap-xs"><span class="feed-author-dot" aria-hidden="true"></span></span>
        <span class="feed-msg font-body-md text-body-md text-on-surface-variant font-mono leading-snug"></span>
        <span class="feed-meta font-label-sm text-label-sm text-outline font-mono shrink-0 ml-auto flex items-center gap-xs">
          <span class="feed-time"></span>
          <a href="#" class="feed-link" aria-label="View on Discord">↗</a>
        </span>
      </div>
    `).join('');

    const lines = Array.from(container.querySelectorAll('.feed-line'));
    lines.forEach((line, i) => {
      const m = messages[i];
      const isNew = !!prevIds && !prevIds.includes(nextIds[i]);

      const authorEl = line.querySelector('.feed-author');
      authorEl.append(`@${m.author}`);

      const msgEl = line.querySelector('.feed-msg');
      msgEl.dataset.final = m.content;

      const timeEl = line.querySelector('.feed-time');
      const ts = m.timestamp
        ? new Date(m.timestamp).getTime()
        : Date.now() - FEED_AGE_FALLBACK_MIN[i % FEED_AGE_FALLBACK_MIN.length] * 60000;
      timeEl.dataset.ts = String(ts);
      updateFeedTime(timeEl);

      if (!buildLogRevealed) return;

      if (isNew && !REDUCE_MOTION) {
        line.classList.add('feed-line-new');
        typeFeedMessage(msgEl, msgEl.dataset.final, () => {});
      } else {
        msgEl.innerHTML = formatFeedContent(msgEl.dataset.final);
      }
    });

    container._feedIds = nextIds;
    updateFeedStatus();
  }

  // ── Channel section entrance + interactions ───────────────────────────────
  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#$%&';

  function typewriter(el, text, speed = 28) {
    return new Promise(resolve => {
      if (REDUCE_MOTION || !text) { el.textContent = text; resolve(); return; }
      let i = 0;
      el.textContent = '';
      const tick = () => {
        el.textContent = text.slice(0, i);
        i++;
        if (i <= text.length) {
          setTimeout(tick, speed);
        } else {
          resolve();
        }
      };
      tick();
    });
  }

  function scrambleReveal(el, duration = 400) {
    const final = el.dataset.final || el.textContent.trim();
    el.dataset.final = final;

    if (REDUCE_MOTION) { el.textContent = final; return; }
    if (el._scrambleId) clearInterval(el._scrambleId);

    const len = final.length;
    let frame = 0;
    const totalFrames = Math.ceil(duration / 40);
    el._scrambleId = setInterval(() => {
      const resolved = Math.floor(len * Math.min((frame / totalFrames) * 1.6, 1));
      let out = '';
      for (let i = 0; i < len; i++) {
        const ch = final[i];
        out += (i < resolved || ch === ' ')
          ? ch
          : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      el.textContent = out;
      if (++frame > totalFrames) {
        el.textContent = final;
        clearInterval(el._scrambleId);
        el._scrambleId = null;
      }
    }, 40);
  }

  function glitchIn(el, finalText, duration = 500) {
    if (REDUCE_MOTION) { el.textContent = finalText; return; }
    const start = performance.now();
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const settled = Math.floor(progress * finalText.length);
      let out = '';
      for (let i = 0; i < finalText.length; i++) {
        const ch = finalText[i];
        out += (i < settled || ch === ' ' || ch === '#' || ch === '-')
          ? ch
          : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      el.textContent = out;
      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = finalText;
    }
    requestAnimationFrame(frame);
  }

  function initChannelSection() {
    const network = document.querySelector('.channel-network');
    const section = network?.closest('section');
    if (!section) return;

    const tag = document.getElementById('channelSectionTag');
    const heading = document.getElementById('channelSectionHeading');
    const nodes = Array.from(section.querySelectorAll('.channel-node'));
    const hubNode = nodes.find(n => n.dataset.nodeId === 'build-log');

    const panel = document.getElementById('channelDetailPanel');
    const panelIcon = document.getElementById('channelDetailIcon');
    const panelTag = document.getElementById('channelDetailTag');
    const panelDesc = document.getElementById('channelDetailDesc');
    const panelLive = document.getElementById('channelDetailLive');

    function setPanel(node) {
      if (!node || !panel) return;
      const apply = () => {
        if (panelIcon) panelIcon.textContent = node.dataset.icon || '';
        if (panelTag) {
          if (REDUCE_MOTION) panelTag.textContent = node.dataset.tag || '';
          else glitchIn(panelTag, node.dataset.tag || '');
        }
        if (panelDesc) panelDesc.textContent = node.dataset.desc || '';
        if (panelLive) panelLive.textContent = node.dataset.live || '';
        panel.classList.remove('is-updating');
      };

      if (REDUCE_MOTION) { apply(); return; }
      panel.classList.add('is-updating');
      setTimeout(apply, 160);
    }

    let triggered = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async entry => {
        if (!entry.isIntersecting || triggered) return;
        triggered = true;
        observer.disconnect();

        if (tag) await typewriter(tag, tag.textContent.trim());
        if (heading) heading.classList.add('is-visible');

        network.classList.add('is-visible');

        nodes.forEach((node, i) => {
          setTimeout(() => {
            node.classList.add('is-visible');
            const labelEl = node.querySelector('.channel-icon-label');
            if (labelEl) glitchIn(labelEl, labelEl.textContent.trim());
          }, i * 90);
        });
      });
    }, { threshold: 0.2 });

    observer.observe(section);

    // ── Network hover: light up connected edges + neighbor nodes, update detail panel ──
    const EDGE_ENDPOINTS = {
      'e-hub-goals': ['build-log', 'goals'],
      'e-hub-showcase': ['build-log', 'showcase'],
      'e-hub-wins': ['build-log', 'wins'],
      'e-hub-stuck': ['build-log', 'stuck'],
      'e-hub-accountability': ['build-log', 'accountability'],
      'e-ring-goals-showcase': ['goals', 'showcase'],
      'e-ring-showcase-wins': ['showcase', 'wins'],
      'e-ring-wins-stuck': ['wins', 'stuck'],
      'e-ring-stuck-accountability': ['stuck', 'accountability'],
      'e-ring-accountability-goals': ['accountability', 'goals'],
    };

    function drawEdge(edge, fromNodeId) {
      if (REDUCE_MOTION) { edge.classList.add('is-active'); return; }
      const id = edge.dataset.edgeId;
      const [a, b] = EDGE_ENDPOINTS[id] || [];
      if (!edge._origD) edge._origD = edge.getAttribute('d');

      if (b === fromNodeId && a !== fromNodeId) {
        const m = edge._origD.match(/M\s*([\d.\-]+)[ ,]+([\d.\-]+)\s*L\s*([\d.\-]+)[ ,]+([\d.\-]+)/);
        if (m) edge.setAttribute('d', `M${m[3]},${m[4]} L${m[1]},${m[2]}`);
      } else {
        edge.setAttribute('d', edge._origD);
      }

      edge.classList.add('is-active');
      const len = edge.getTotalLength();
      edge.style.transition = 'none';
      edge.style.strokeDasharray = `${len}`;
      edge.style.strokeDashoffset = `${len}`;
      edge.getBoundingClientRect(); // force reflow
      edge.classList.add('is-drawing');
      edge.style.transition = '';
      requestAnimationFrame(() => {
        edge.style.strokeDashoffset = '0';
      });
    }

    function resetEdge(edge) {
      edge.classList.remove('is-active', 'is-drawing');
      if (edge._origD) edge.setAttribute('d', edge._origD);
      // Snap dash properties back to their resting values with no transition
      // first, so the leftover entrance transition on stroke-dashoffset
      // (1.1s on .is-visible .edge) can't animate a stale offset back to 0
      // and produce a visible dashed/segmented line for ~1s after mouseleave.
      edge.style.transition = 'none';
      edge.style.strokeDasharray = '48';
      edge.style.strokeDashoffset = '0';
      edge.getBoundingClientRect();
      edge.style.transition = '';
      edge.style.strokeDasharray = '';
      edge.style.strokeDashoffset = '';
    }

    nodes.forEach(node => {
      const edgeIds = (node.dataset.edges || '').split(/\s+/).filter(Boolean);
      const neighborIds = (node.dataset.neighbors || '').split(/\s+/).filter(Boolean);

      const activate = () => {
        network.classList.add('has-hover');
        node.classList.add('is-active');
        edgeIds.forEach(id => {
          const edge = network.querySelector(`[data-edge-id="${id}"]`);
          if (edge) drawEdge(edge, node.dataset.nodeId);
        });
        neighborIds.forEach(id => {
          const neighbor = network.querySelector(`[data-node-id="${id}"]`);
          if (neighbor) neighbor.classList.add('is-neighbor');
        });
        setPanel(node);
      };

      const deactivate = () => {
        network.classList.remove('has-hover');
        node.classList.remove('is-active');
        edgeIds.forEach(id => {
          const edge = network.querySelector(`[data-edge-id="${id}"]`);
          if (edge) resetEdge(edge);
        });
        neighborIds.forEach(id => {
          const neighbor = network.querySelector(`[data-node-id="${id}"]`);
          if (neighbor) neighbor.classList.remove('is-neighbor');
        });
        if (hubNode && hubNode !== node) setPanel(hubNode);
      };

      node.addEventListener('mouseenter', activate);
      node.addEventListener('focusin', activate);
      node.addEventListener('mouseleave', deactivate);
      node.addEventListener('focusout', deactivate);
    });

  }

  function initBuildLogSection() {
    const container = document.getElementById('buildLogFeed');
    const section = container?.closest('section');
    if (!container || !section) return;

    prepareFeedLines(container);

    const tag = document.getElementById('buildLogSectionTag');
    const heading = document.getElementById('buildLogSectionHeading');
    const dots = section.querySelector('.feed-terminal-dots');
    const cta = document.getElementById('buildLogCta');

    let triggered = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async entry => {
        if (!entry.isIntersecting || triggered) return;
        triggered = true;
        observer.disconnect();

        if (REDUCE_MOTION) {
          if (heading) heading.classList.add('is-visible');
          if (dots) dots.classList.add('is-visible');
          if (tag) tag.nextElementSibling?.classList.add('hidden');
          revealBuildLogFeed();
          return;
        }

        if (tag) {
          await typewriter(tag, tag.textContent.trim());
          tag.nextElementSibling?.classList.add('hidden');
        }
        if (heading) scrambleReveal(heading, 500);
        if (dots) dots.classList.add('is-visible');
        if (cta) {
          const ctaLabel = cta.querySelector('span');
          if (ctaLabel) scrambleReveal(ctaLabel, 400);
        }

        setTimeout(() => revealBuildLogFeed(), 450);
      });
    }, { threshold: 0.2 });

    observer.observe(section);
  }

  function init() {
    loadMemberCount();
    loadFeed('buildlog', 'buildLogFeed', renderFeedLines);
    initChannelSection();
    initBuildLogSection();

    setInterval(() => {
      loadFeed('buildlog', 'buildLogFeed', renderFeedLines);
    }, FEED_POLL_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
