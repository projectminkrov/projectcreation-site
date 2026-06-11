/**
 * GET /api/discord-feed?channel=buildlog|showcase
 *
 * Returns the most recent messages from a configured Discord channel so
 * the Community page can show a live build-log feed and builder spotlight.
 *
 * Environment variables required in Cloudflare Pages dashboard:
 *   DISCORD_BOT_TOKEN            — bot token with "Read Message History" on the server
 *   DISCORD_BUILD_LOG_CHANNEL_ID — channel ID for the live build-log feed
 *   DISCORD_SHOWCASE_CHANNEL_ID  — channel ID for the builder spotlight feed
 *
 * Graceful degradation:
 *   - If the bot token or the requested channel ID isn't configured, returns
 *     a small set of sample entries with `live: false` so the page still
 *     looks complete in dev/preview.
 *   - If the Discord API call fails, falls back to the same sample entries.
 */

const SAMPLE = {
  buildlog: [
    { author: 'ProjectDiver', content: 'Connecting to #build-log…', timestamp: null },
  ],
  showcase: [
    { author: 'alex',   content: 'Finally launched my note app after 3 months of grinding. Feels unreal.', timestamp: null },
    { author: 'mira',   content: '30 days of building in public, done. Here is the recap thread.', timestamp: null },
    { author: 'devkid', content: 'First paying customer today. Small win but a real one.', timestamp: null },
  ],
};

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const channel = url.searchParams.get('channel') === 'showcase' ? 'showcase' : 'buildlog';

  const channelId = channel === 'showcase'
    ? env.DISCORD_SHOWCASE_CHANNEL_ID
    : env.DISCORD_BUILD_LOG_CHANNEL_ID;

  if (!env.DISCORD_BOT_TOKEN || !channelId) {
    return json({ live: false, messages: SAMPLE[channel] });
  }

  try {
    const res = await fetch(
      `https://discord.com/api/v10/channels/${channelId}/messages?limit=6`,
      { headers: { Authorization: `Bot ${env.DISCORD_BOT_TOKEN}` } }
    );

    if (!res.ok) {
      return json({ live: false, messages: SAMPLE[channel] });
    }

    const data = await res.json();
    const messages = data
      .map(extractMessage)
      .filter(Boolean)
      .map(m => ({
        ...m,
        content: m.content.length > 220 ? `${m.content.slice(0, 220)}…` : m.content,
      }));

    if (messages.length === 0) {
      return json({ live: false, messages: SAMPLE[channel] });
    }

    return json({ live: true, messages });
  } catch {
    return json({ live: false, messages: SAMPLE[channel] });
  }
}

// ProjectDiver posts build-log updates as rich embeds (plain `content` is
// empty), so pull a readable line out of the embed's "Changed" field.
function extractMessage(m) {
  if (typeof m.content === 'string' && m.content.trim().length > 0) {
    return {
      author: m.member?.nick || m.author?.global_name || m.author?.username || 'someone',
      content: m.content.trim(),
      timestamp: m.timestamp || null,
    };
  }

  const embed = m.embeds?.[0];
  if (!embed) return null;

  const changed = embed.fields?.find(f => /^changed$/i.test((f.name || '').trim()));
  let summary = '';
  if (changed?.value) {
    summary = changed.value
      .split('\n')
      .map(line => line.replace(/^[-*]\s*/, '').trim())
      .filter(Boolean)
      .join(' ');
  }
  if (!summary) summary = embed.title || '';
  if (!summary) return null;

  const project = embed.title?.match(/—\s*(.+)$/)?.[1]?.trim();

  return {
    author: 'ProjectDiver',
    content: project ? `[${project}] ${summary}` : summary,
    timestamp: m.timestamp || null,
  };
}

function json(data) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=30, s-maxage=60',
    },
  });
}
