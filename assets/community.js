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
  async function loadFeed(channel, containerId, render) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
      const res = await fetch(`/api/discord-feed?channel=${channel}`);
      const data = await res.json();
      render(container, data.messages || [], data.live);
    } catch {
      // Leave whatever was already rendered (sample/static fallback in HTML).
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

  function renderSpotlightCards(container, messages) {
    if (!messages.length) return;
    container.innerHTML = messages.map(m => `
      <div class="spotlight-card border border-outline-variant bg-surface-container-lowest p-md">
        <span class="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-widest font-mono">@${escapeHtml(m.author)}</span>
        <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">${escapeHtml(m.content)}</p>
      </div>
    `).join('');
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
    const grid = document.querySelector('.channel-grid');
    const section = grid?.closest('section');
    if (!section) return;

    const tag = document.getElementById('channelSectionTag');
    const heading = document.getElementById('channelSectionHeading');
    const cards = Array.from(section.querySelectorAll('.channel-card'));

    let triggered = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async entry => {
        if (!entry.isIntersecting || triggered) return;
        triggered = true;
        observer.disconnect();

        if (tag) await typewriter(tag, tag.textContent.trim());
        if (heading) heading.classList.add('is-visible');

        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('is-visible');
            const tagEl = card.querySelector('.channel-tag');
            if (tagEl) glitchIn(tagEl, tagEl.textContent.trim());
          }, i * 90);
        });
      });
    }, { threshold: 0.2 });

    observer.observe(section);

    cards.forEach(card => {
      const liveEl = card.querySelector('.channel-desc-live');
      if (liveEl) {
        liveEl.dataset.final = liveEl.textContent.trim();

        const reveal = () => scrambleReveal(liveEl, 380);
        const restore = () => {
          if (liveEl._scrambleId) {
            clearInterval(liveEl._scrambleId);
            liveEl._scrambleId = null;
          }
          liveEl.textContent = liveEl.dataset.final;
        };

        card.addEventListener('mouseenter', reveal);
        card.addEventListener('focusin', reveal);
        card.addEventListener('mouseleave', restore);
        card.addEventListener('focusout', restore);
      }

      if (!REDUCE_MOTION) {
        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `translateY(-4px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      }
    });

    if (!REDUCE_MOTION) {
      setInterval(() => {
        const dots = section.querySelectorAll('.channel-activity-dot');
        if (!dots.length) return;
        const dot = dots[Math.floor(Math.random() * dots.length)];
        dot.classList.add('spike');
        setTimeout(() => dot.classList.remove('spike'), 700);
      }, 3500);
    }
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
    loadFeed('showcase', 'spotlightFeed', renderSpotlightCards);
    initChannelSection();
    initBuildLogSection();

    setInterval(() => {
      loadFeed('buildlog', 'buildLogFeed', renderFeedLines);
      loadFeed('showcase', 'spotlightFeed', renderSpotlightCards);
    }, FEED_POLL_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
