/**
 * YOUTUBE SEARCH & METADATA UTILITY
 * -------------------------------------------------------------
 * Provides fast, client-side search for YouTube songs/videos
 * without requiring API keys or subscriptions.
 * Supports direct video IDs, URLs, and multi-endpoint fallback.
 */

export function extractYouTubeId(input) {
  if (!input) return null;
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  );
  return match ? match[1] : null;
}

export function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return "3:30";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export async function searchYouTubeSongs(query) {
  const cleanQuery = query.trim();
  if (!cleanQuery) return [];

  // 1. Direct YouTube URL or 11-char ID
  const directId = extractYouTubeId(cleanQuery);
  if (directId) {
    return [
      {
        id: `direct-${directId}`,
        youtubeId: directId,
        title: "Direct YouTube Audio Stream",
        artist: "YouTube Stream",
        genre: "Direct Video",
        duration: "Live",
        tagline: "Playing requested YouTube video stream.",
        badge: "DIRECT LINK",
      },
    ];
  }

  // 2. Primary Fast Endpoint: Piped API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);
    const res = await fetch(
      `https://pipedapi.ducks.party/search?q=${encodeURIComponent(cleanQuery)}&filter=videos`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.items) && data.items.length > 0) {
        const results = data.items
          .filter((item) => item.url && item.url.includes("watch?v="))
          .slice(0, 10)
          .map((item) => {
            const vidId = item.url.split("watch?v=")[1]?.split("&")[0];
            return {
              id: `yt-${vidId}`,
              youtubeId: vidId,
              title: item.title,
              artist: item.uploaderName || "YouTube Artist",
              genre: "YouTube Track",
              duration: formatDuration(item.duration),
              thumbnail: item.thumbnail,
              tagline: `Top search match for "${cleanQuery}" on YouTube.`,
              badge: "YOUTUBE",
            };
          });

        if (results.length > 0) return results;
      }
    }
  } catch (err) {
    console.warn("Primary search provider unreachable, falling back...", err);
  }

  // 3. Secondary Backup: Invidious API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);
    const res = await fetch(
      `https://invidious.f5.si/api/v1/search?q=${encodeURIComponent(cleanQuery)}&type=video`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data
          .filter((item) => item.type === "video" || item.videoId)
          .slice(0, 10)
          .map((item) => ({
            id: `yt-${item.videoId}`,
            youtubeId: item.videoId,
            title: item.title,
            artist: item.author || "YouTube Artist",
            genre: "YouTube Track",
            duration: formatDuration(item.lengthSeconds),
            thumbnail: item.videoThumbnails?.[0]?.url,
            tagline: `Search result for "${cleanQuery}".`,
            badge: "YOUTUBE",
          }));
      }
    }
  } catch (err) {
    console.warn("Secondary search provider unreachable:", err);
  }

  return [];
}
