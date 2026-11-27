import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Dual-mode wedding audio controller:
 * - Plays an external audio URL if configured in weddingConfig.media.audioUrl
 * - Falls back to a gentle Web Audio API romantic harp/chime pad so the Audio FAB
 *   always responds gracefully without broken third-party MP3 links.
 */
export function useWeddingAudio(audioUrl?: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const stopSynth = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      void audioCtxRef.current.suspend();
    }
  }, []);

  const startSynth = useCallback(() => {
    const AudioCtx =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    // Gentle D-major romantic arpeggio notes
    const notes = [293.66, 369.99, 440.0, 554.37, 587.33, 440.0, 369.99, 329.63];
    let step = 0;

    const playNote = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(notes[step % notes.length], now);
      step += 1;

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.032, now + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.5);
    };

    playNote();
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(playNote, 1350);
  }, []);

  const start = useCallback(() => {
    if (audioUrl) {
      if (!audioElRef.current) {
        const el = new Audio(audioUrl);
        el.loop = true;
        el.volume = 0.45;
        audioElRef.current = el;
      }
      audioElRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          startSynth();
          setIsPlaying(true);
        });
      return;
    }

    try {
      startSynth();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [audioUrl, startSynth]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      if (audioElRef.current) {
        audioElRef.current.pause();
      }
      stopSynth();
      setIsPlaying(false);
    } else {
      start();
    }
  }, [isPlaying, start, stopSynth]);

  useEffect(() => {
    return () => {
      if (audioElRef.current) {
        audioElRef.current.pause();
        audioElRef.current = null;
      }
      stopSynth();
      if (audioCtxRef.current) {
        void audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, [stopSynth]);

  return { isPlaying, start, toggle };
}
