import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import ambientTrack from "@/assets/music-player.mp3";

type AmbientContextValue = {
  playing: boolean;
  volume: number;
  ready: boolean;
  toggle: () => void;
  setVolume: (v: number) => void;
};

const AmbientContext = createContext<AmbientContextValue | null>(null);

const STORAGE_ENABLED = "tramas:audio-enabled";
const STORAGE_VOLUME = "tramas:audio-volume";

/**
 * Trilha ambiente simples, em loop contínuo, com uma única saída de áudio.
 */
export function AmbientAudioProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.35);
  const [ready, setReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wantsRef = useRef(false);

  const setAudioVolume = useCallback((value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = Math.min(1, Math.max(0, value));
  }, []);

  const start = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.loop = true;
      audio.currentTime = 0;
      setAudioVolume(volume);
      audio.src = ambientTrack;
      audio.load();
      await audio.play();
      setPlaying(true);
      setReady(true);
    } catch (error) {
      console.warn("[Audio] Não foi possível iniciar a trilha ambiente:", error);
      setPlaying(false);
    }
  }, [setAudioVolume, volume]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    wantsRef.current = !playing;
    localStorage.setItem(STORAGE_ENABLED, wantsRef.current ? "1" : "0");
    if (wantsRef.current) void start();
    else stop();
  }, [playing, start, stop]);

  const setVolume = useCallback(
    (v: number) => {
      const nextValue = Math.min(1, Math.max(0, v));
      setVolumeState(nextValue);
      localStorage.setItem(STORAGE_VOLUME, String(nextValue));
      setAudioVolume(nextValue);
    },
    [setAudioVolume],
  );

  useEffect(() => {
    const savedVolume = Number(localStorage.getItem(STORAGE_VOLUME));
    const initialVolume = Number.isNaN(savedVolume) || savedVolume <= 0 ? 0.35 : savedVolume;
    setVolumeState(initialVolume);
    wantsRef.current = localStorage.getItem(STORAGE_ENABLED) !== "0";

    const audio = audioRef.current;
    if (audio) {
      audio.src = ambientTrack;
      audio.loop = true;
      audio.crossOrigin = "anonymous";
      audio.preload = "auto";
      audio.volume = initialVolume;
      audio.load();
    }

    const onFirstGesture = () => {
      if (wantsRef.current) void start();
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      window.removeEventListener("scroll", onFirstGesture);
    };

    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    window.addEventListener("keydown", onFirstGesture, { once: true });
    window.addEventListener("scroll", onFirstGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      window.removeEventListener("scroll", onFirstGesture);
    };
  }, [start]);

  return (
    <AmbientContext.Provider value={{ playing, volume, ready, toggle, setVolume }}>
      <audio ref={audioRef} className="hidden" preload="auto" aria-hidden="true" />
      {children}
    </AmbientContext.Provider>
  );
}

export function useAmbientAudio() {
  const ctx = useContext(AmbientContext);
  if (!ctx) throw new Error("useAmbientAudio precisa estar dentro de AmbientAudioProvider");
  return ctx;
}
