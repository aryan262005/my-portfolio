import React, { useState, useRef } from "react";
import { sound } from "../../utils/audio";
import { DEFAULT_TRACKS } from "../../data/musicTracks";
import { MusicContext } from "./MusicContextInstance";

export function MusicProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(DEFAULT_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicLabOpen, setIsMusicLabOpen] = useState(false);
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [volume, setVolume] = useState(80);
  const iframeRef = useRef(null);

  const playTrack = (track) => {
    sound.playClick();
    setCurrentTrack(track);
    setIsPlaying(true);
    setIsMiniPlayerVisible(true);
    setIsMinimized(false);
  };

  const togglePlay = () => {
    sound.playClick();
    setIsPlaying((prev) => !prev);
    if (!isPlaying) {
      setIsMiniPlayerVisible(true);
    }
  };

  const openMusicLab = () => {
    sound.playClick();
    setIsMusicLabOpen(true);
  };

  const closeMusicLab = () => {
    sound.playClick();
    setIsMusicLabOpen(false);
  };

  const closeMiniPlayer = () => {
    sound.playClick();
    setIsPlaying(false);
    setIsMiniPlayerVisible(false);
  };

  const toggleMinimize = () => {
    sound.playClick();
    setIsMinimized((prev) => !prev);
  };

  const getEmbedUrl = () => {
    if (!currentTrack?.youtubeId) return "";
    const autoplay = isPlaying ? "1" : "0";
    return `https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=${autoplay}&rel=0&modestbranding=1`;
  };

  const value = {
    currentTrack,
    isPlaying,
    isMusicLabOpen,
    isMiniPlayerVisible,
    isMinimized,
    volume,
    curatedTracks: DEFAULT_TRACKS,
    playTrack,
    togglePlay,
    openMusicLab,
    closeMusicLab,
    closeMiniPlayer,
    toggleMinimize,
    setVolume,
    getEmbedUrl,
    iframeRef,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}
