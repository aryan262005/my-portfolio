import React, { useState } from "react";
import {
  X,
  Search,
  Play,
  Pause,
  ExternalLink,
  Radio,
  Sparkles,
  Disc3,
  Headphones,
  Loader2,
  ListMusic,
} from "lucide-react";
import { useMusic } from "./useMusic";
import { sound } from "../../utils/audio";
import { searchYouTubeSongs, extractYouTubeId } from "../../utils/youtubeSearch";
import Card3D from "../ui/Card3D";

const QUICK_SUGGESTIONS = [
  { label: "Husn", query: "Anuv Jain Husn" },
  { label: "Starboy", query: "The Weeknd Starboy" },
  { label: "Yellow", query: "Coldplay Yellow" },
  { label: "Kesariya", query: "Arijit Singh Kesariya" },
  { label: "Interstellar", query: "Hans Zimmer Interstellar theme" },
  { label: "Lofi Girl", query: "Lofi hip hop beats to relax study to" },
];

export default function MusicPlayerModal() {
  const {
    isMusicLabOpen,
    closeMusicLab,
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    curatedTracks,
    getEmbedUrl,
  } = useMusic();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [activeTab, setActiveTab] = useState("curated"); // "curated" | "search"

  const executeSearch = async (queryText) => {
    const q = (queryText || searchQuery).trim();
    if (!q) return;

    sound.playClick();
    setIsSearching(true);
    setSearchError(null);

    // 1. Direct link or 11-char ID
    const directId = extractYouTubeId(q);
    if (directId) {
      const directTrack = {
        id: `direct-${directId}`,
        youtubeId: directId,
        title: "Direct YouTube Audio Stream",
        artist: "YouTube Stream",
        genre: "Custom Video",
        duration: "Live",
        tagline: "Playing requested YouTube video stream.",
        badge: "DIRECT LINK",
      };
      setSearchResults([directTrack]);
      setActiveTab("search");
      playTrack(directTrack);
      setIsSearching(false);
      return;
    }

    // 2. Query search
    try {
      const results = await searchYouTubeSongs(q);
      if (results && results.length > 0) {
        setSearchResults(results);
        setActiveTab("search");
        playTrack(results[0]);
      } else {
        setSearchError(
          `No direct results found for "${q}". Try another song name or paste a YouTube link.`
        );
      }
    } catch (err) {
      console.error("Search error:", err);
      setSearchError("Failed to search YouTube. Please check network or paste a direct YouTube link.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeSearch();
  };

  const handleQuickPick = (query) => {
    setSearchQuery(query);
    executeSearch(query);
  };

  // If closed and not playing, unmount to save resources
  if (!isMusicLabOpen && !isPlaying) return null;

  return (
    <div
      className={
        isMusicLabOpen
          ? "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          : "fixed -bottom-[9999px] -left-[9999px] w-[320px] h-[240px] pointer-events-none opacity-0 overflow-hidden"
      }
    >
      <div className="relative w-full max-w-4xl rounded-3xl bg-[var(--color-bg-card)] border border-[var(--color-border-accent)] shadow-[0_0_50px_var(--color-accent-glow)] overflow-hidden flex flex-col max-h-[92vh] backdrop-blur-xl">
        {/* Header HUD */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[var(--color-bg-surface)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[var(--color-accent-primary)]/10 border border-[var(--color-border-accent)] text-[var(--color-accent-primary)]">
              <Headphones size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-mono-code text-white tracking-wide">
                  MUSIC LAB
                </h3>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] font-bold border border-[var(--color-border-accent)]">
                  FREE STREAMING
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono-code mt-0.5 hidden sm:block">
                Search any song, artist or soundtrack & listen freely while exploring
              </p>
            </div>
          </div>

          <button
            onClick={closeMusicLab}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Minimize to Background Dock"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Bar + Quick Suggestions */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[var(--color-bg-surface)]/80 space-y-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-grow">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-accent-primary)]/70"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any song (e.g. Husn, Starboy, Coldplay, Arijit Singh) or paste YouTube link..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/[0.04] border border-[var(--color-border-accent)] text-white placeholder-slate-500 text-xs sm:text-sm font-mono-code focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)]/50 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
              className="px-4 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] disabled:opacity-50 text-black font-mono-code font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 cursor-pointer shadow-[0_0_20px_var(--color-accent-glow)] transition-all"
            >
              {isSearching ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Play size={14} />
                  <span>Search & Play</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Instant Picks */}
          <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-mono-code text-slate-400">
            <span className="text-slate-500 text-[10px] uppercase font-bold mr-1">
              Popular:
            </span>
            {QUICK_SUGGESTIONS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleQuickPick(item.query)}
                className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-[var(--color-accent-primary)]/20 hover:text-[var(--color-accent-primary)] border border-white/10 hover:border-[var(--color-border-accent)] text-[11px] text-slate-300 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {searchError && (
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono-code">
              {searchError}
            </div>
          )}

          {/* Tab Selector & YouTube Direct Link */}
          <div className="flex items-center justify-between pt-1 text-xs font-mono-code border-t border-white/5">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setActiveTab("curated")}
                className={`cursor-pointer transition-colors pb-1 ${
                  activeTab === "curated"
                    ? "text-[var(--color-accent-primary)] font-bold border-b-2 border-[var(--color-accent-primary)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Curated Stations ({curatedTracks.length})
              </button>

              {searchResults.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab("search")}
                  className={`cursor-pointer transition-colors pb-1 flex items-center gap-1.5 ${
                    activeTab === "search"
                      ? "text-[var(--color-accent-primary)] font-bold border-b-2 border-[var(--color-accent-primary)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <ListMusic size={13} />
                  <span>Search Matches ({searchResults.length})</span>
                </button>
              )}
            </div>

            {currentTrack?.youtubeId && (
              <a
                href={`https://www.youtube.com/watch?v=${currentTrack.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--color-accent-primary)] hover:opacity-80 underline text-[11px]"
              >
                <span>Open on YouTube</span>
                <ExternalLink size={10} />
              </a>
            )}
          </div>
        </div>

        {/* Main Player & Playlist Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[var(--color-bg-dark)]/95 overflow-y-auto">
          {/* Left 7 Columns: YouTube Player with 3D Tilt */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <Card3D maxTilt={6} className="w-full">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-[var(--color-border-accent)] shadow-2xl">
                {currentTrack?.youtubeId ? (
                  <iframe
                    src={getEmbedUrl()}
                    title={currentTrack.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-2">
                    <Disc3 size={32} className="animate-spin text-[var(--color-accent-primary)]/40" />
                    <span className="text-xs font-mono-code">Select a track to launch official player</span>
                  </div>
                )}
              </div>
            </Card3D>

            {/* Stream Status Info */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isPlaying ? "bg-[var(--color-accent-primary)] animate-ping" : "bg-slate-600"
                  }`}
                />
                <span>{isPlaying ? "ACTIVE STREAM" : "PLAYER PAUSED"}</span>
              </span>
              <span className="text-slate-500 text-[10px]">
                Plays in background while browsing
              </span>
            </div>
          </div>

          {/* Right 5 Columns: Metadata + Track / Search Results List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Now Streaming Card with 3D Tilt */}
            <Card3D maxTilt={8} className="w-full">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono-code text-[var(--color-accent-primary)] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <Radio size={11} className="animate-pulse" />
                    NOW STREAMING
                  </span>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] font-bold border border-[var(--color-border-accent)]">
                    {currentTrack?.badge || "ACTIVE"}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white font-mono-code line-clamp-1">
                  {currentTrack?.title}
                </h4>
                <p className="text-xs text-slate-400 font-mono-code mt-0.5">
                  {currentTrack?.artist} {currentTrack?.genre ? `// ${currentTrack.genre}` : ""}
                </p>
                <p className="text-[11px] text-slate-300 mt-2 italic font-sans leading-relaxed">
                  "{currentTrack?.tagline}"
                </p>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-accent-primary)] hover:opacity-90 text-black font-mono-code font-bold text-xs transition-colors cursor-pointer shadow-[0_0_15px_var(--color-accent-glow)]"
                  >
                    {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                    <span>{isPlaying ? "Pause Stream" : "Resume Playback"}</span>
                  </button>

                  <span className="text-[10px] font-mono-code text-slate-500">
                    Duration: {currentTrack?.duration || "Streaming"}
                  </span>
                </div>
              </div>
            </Card3D>

            {/* List Drawer: Curated or Search Results with 3D Tilt */}
            <div className="space-y-1.5 max-h-[230px] overflow-y-auto pr-1 scrollbar-thin">
              <span className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider block mb-1">
                {activeTab === "search" ? "MATCHING YOUTUBE TRACKS" : "QUICK CODING STATIONS"}
              </span>

              {activeTab === "search" &&
                searchResults.map((track) => {
                  const isCurrent = currentTrack?.youtubeId === track.youtubeId;
                  return (
                    <Card3D
                      key={track.id}
                      maxTilt={6}
                      className="w-full"
                      onClick={() => playTrack(track)}
                    >
                      <div
                        className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono-code transition-all flex items-center justify-between group cursor-pointer ${
                          isCurrent
                            ? "bg-[var(--color-accent-primary)]/20 border-[var(--color-border-accent)] text-white shadow-[0_0_12px_var(--color-accent-glow)]"
                            : "bg-white/[0.02] hover:bg-white/[0.05] border-white/5 text-slate-300 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <div
                            className={`p-1.5 rounded-lg ${
                              isCurrent ? "bg-[var(--color-accent-primary)] text-black" : "bg-white/5 text-[var(--color-accent-primary)]"
                            }`}
                          >
                            {isCurrent && isPlaying ? (
                              <Disc3 size={12} className="animate-spin" />
                            ) : (
                              <Play size={12} />
                            )}
                          </div>
                          <div className="truncate">
                            <div className="font-bold truncate">{track.title}</div>
                            <div className="text-[10px] text-slate-400">{track.artist}</div>
                          </div>
                        </div>

                        <span className="text-[10px] text-[var(--color-accent-primary)] font-mono-code shrink-0 ml-2">
                          {track.duration}
                        </span>
                      </div>
                    </Card3D>
                  );
                })}

              {activeTab === "curated" &&
                curatedTracks.map((track) => {
                  const isCurrent = currentTrack?.id === track.id;
                  return (
                    <Card3D
                      key={track.id}
                      maxTilt={6}
                      className="w-full"
                      onClick={() => playTrack(track)}
                    >
                      <div
                        className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono-code transition-all flex items-center justify-between group cursor-pointer ${
                          isCurrent
                            ? "bg-[var(--color-accent-primary)]/20 border-[var(--color-border-accent)] text-white shadow-[0_0_12px_var(--color-accent-glow)]"
                            : "bg-white/[0.02] hover:bg-white/[0.05] border-white/5 text-slate-300 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <div
                            className={`p-1.5 rounded-lg ${
                              isCurrent ? "bg-[var(--color-accent-primary)] text-black" : "bg-white/5 text-[var(--color-accent-primary)]"
                            }`}
                          >
                            {isCurrent && isPlaying ? (
                              <Disc3 size={12} className="animate-spin" />
                            ) : (
                              <Play size={12} />
                            )}
                          </div>
                          <div className="truncate">
                            <div className="font-bold truncate">{track.title}</div>
                            <div className="text-[10px] text-slate-400">{track.artist}</div>
                          </div>
                        </div>

                        <span className="text-[10px] text-[var(--color-accent-primary)] font-mono-code shrink-0 ml-2">
                          {track.duration}
                        </span>
                      </div>
                    </Card3D>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="p-3 sm:px-6 border-t border-white/10 bg-[var(--color-bg-surface)]/60 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-code text-slate-500 gap-2">
          <span className="flex items-center gap-1.5">
            <Sparkles size={11} className="text-[var(--color-accent-primary)] shrink-0" />
            <span>Official YouTube Embedded API. Search & listen freely without subscriptions.</span>
          </span>
          <span className="text-slate-400 text-[10px]">
            Background dock enabled · Continues playing while exploring
          </span>
        </div>
      </div>
    </div>
  );
}
