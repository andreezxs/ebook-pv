import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

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
 * Trilha ambiente gerada em tempo real (pad contemplativo em loop infinito).
 * Vive na raiz da aplicação, por isso nunca reinicia ao navegar entre páginas.
 */
export function AmbientAudioProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.35);
  const [ready, setReady] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const startedRef = useRef(false);
  const wantsRef = useRef(false);

  const buildGraph = useCallback(() => {
    if (startedRef.current) return;
    const AudioCtor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;

    const ctx = new AudioCtor();
    const master = ctx.createGain();
    master.gain.value = 0;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.6;

    const reverbish = ctx.createDelay(1.2);
    reverbish.delayTime.value = 0.55;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.32;
    reverbish.connect(feedback);
    feedback.connect(reverbish);

    filter.connect(master);
    filter.connect(reverbish);
    reverbish.connect(master);
    master.connect(ctx.destination);

    // Acorde suspenso, contemplativo (A2 / E3 / C#4 / B4)
    const voices = [110, 164.81, 277.18, 493.88];
    voices.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = freq;

      const gain = ctx.createGain();
      gain.gain.value = 0.12 / (i + 1);

      // respiração lenta de cada voz
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.03 + i * 0.017;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.05 / (i + 1);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      const detune = ctx.createOscillator();
      detune.frequency.value = 0.07 + i * 0.011;
      const detuneGain = ctx.createGain();
      detuneGain.gain.value = 1.8;
      detune.connect(detuneGain);
      detuneGain.connect(osc.detune);

      osc.connect(gain);
      gain.connect(filter);
      osc.start();
      lfo.start();
      detune.start();
    });

    ctxRef.current = ctx;
    masterRef.current = master;
    startedRef.current = true;
    setReady(true);
  }, []);

  const fadeTo = useCallback((target: number, seconds = 1.8) => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(target, now + seconds);
  }, []);

  const start = useCallback(async () => {
    buildGraph();
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") await ctx.resume();
    fadeTo(volume);
    setPlaying(true);
  }, [buildGraph, fadeTo, volume]);

  const stop = useCallback(() => {
    fadeTo(0, 1.1);
    setPlaying(false);
  }, [fadeTo]);

  const toggle = useCallback(() => {
    wantsRef.current = !playing;
    localStorage.setItem(STORAGE_ENABLED, wantsRef.current ? "1" : "0");
    if (wantsRef.current) void start();
    else stop();
  }, [playing, start, stop]);

  const setVolume = useCallback(
    (v: number) => {
      setVolumeState(v);
      localStorage.setItem(STORAGE_VOLUME, String(v));
      if (playing) fadeTo(v, 0.25);
    },
    [fadeTo, playing],
  );

  // preferência salva + início discreto após a primeira interação
  useEffect(() => {
    const savedVolume = Number(localStorage.getItem(STORAGE_VOLUME));
    if (!Number.isNaN(savedVolume) && savedVolume > 0) setVolumeState(savedVolume);
    wantsRef.current = localStorage.getItem(STORAGE_ENABLED) !== "0";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AmbientContext.Provider value={{ playing, volume, ready, toggle, setVolume }}>
      {children}
    </AmbientContext.Provider>
  );
}

export function useAmbientAudio() {
  const ctx = useContext(AmbientContext);
  if (!ctx) throw new Error("useAmbientAudio precisa estar dentro de AmbientAudioProvider");
  return ctx;
}
