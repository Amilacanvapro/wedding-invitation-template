import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Reliable in-DOM <audio> wedding soundtrack controller:
 * - Binds to a real <audio ref={audioRef} loop preload="auto" /> element for 100% iOS/Android/Desktop support
 * - Must be invoked synchronously inside user click handlers (e.g. VIEW INVITATION / Audio FAB)
 *   so browser autoplay policies always allow immediate playback
 * - Single click on Audio FAB mutes/pauses cleanly; clicking again resumes seamlessly from currentTime
 */
export function useWeddingAudio(audioUrl?: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !audioUrl) return;

    el.volume = 0.7;
    el.loop = true;

    const syncState = () => {
      setIsPlaying(!el.paused && !el.muted);
    };

    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      setHasError(false);
    };

    el.addEventListener('play', syncState);
    el.addEventListener('playing', syncState);
    el.addEventListener('pause', syncState);
    el.addEventListener('volumechange', syncState);
    el.addEventListener('ended', syncState);
    el.addEventListener('error', handleError);
    el.addEventListener('canplay', handleCanPlay);

    return () => {
      el.removeEventListener('play', syncState);
      el.removeEventListener('playing', syncState);
      el.removeEventListener('pause', syncState);
      el.removeEventListener('volumechange', syncState);
      el.removeEventListener('ended', syncState);
      el.removeEventListener('error', handleError);
      el.removeEventListener('canplay', handleCanPlay);
      el.pause();
    };
  }, [audioUrl]);

  const start = useCallback(() => {
    const el = audioRef.current;
    if (!el || !audioUrl) return;

    el.muted = false;
    el.volume = 0.7;

    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setHasError(false);
          setIsPlaying(!el.paused && !el.muted);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      setIsPlaying(!el.paused && !el.muted);
    }
  }, [audioUrl]);

  const mute = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = true;
    el.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el || !audioUrl) return;

    const currentlyAudible = !el.paused && !el.muted;
    if (currentlyAudible) {
      mute();
    } else {
      start();
    }
  }, [audioUrl, mute, start]);

  return { audioRef, isPlaying, hasError, start, mute, toggle };
}
