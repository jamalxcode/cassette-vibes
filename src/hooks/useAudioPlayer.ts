import { useState, useRef, useEffect, useCallback } from 'react';
import { Track } from '@/lib/trackLoader';
import { toast } from 'sonner';

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  currentTrackIndex: number;
}

export function useAudioPlayer(tracks: Track[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isLoading: false,
    currentTrackIndex: 0,
  });

  const currentTrack = tracks[state.currentTrackIndex] || null;

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = state.volume;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleDurationChange = () => {
      setState(prev => ({ ...prev, duration: audio.duration || 0 }));
    };

    const handleEnded = () => {
      setState(prev => {
        const nextIndex = prev.currentTrackIndex + 1;
        if (nextIndex < tracks.length) {
          return { ...prev, currentTrackIndex: nextIndex, isPlaying: true };
        }
        return { ...prev, isPlaying: false, currentTime: 0 };
      });
    };

    const handleLoadStart = () => {
      setState(prev => ({ ...prev, isLoading: true }));
    };

    const handleCanPlay = () => {
      setState(prev => ({ ...prev, isLoading: false }));
    };

    const handleError = (e: Event) => {
      setState(prev => ({ ...prev, isLoading: false, isPlaying: false }));
      const audio = e.target as HTMLAudioElement;
      const track = tracks[state.currentTrackIndex];
      console.error('Audio playback error:', audio.error);
      toast.error(`Failed to load: ${track?.title || 'track'}`, {
        description: 'The audio file could not be played'
      });
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, [tracks.length]);

  // Load track when index changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      const wasPlaying = state.isPlaying;
      audioRef.current.src = currentTrack.src;
      audioRef.current.load();
      
      if (wasPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [state.currentTrackIndex, currentTrack?.src]);

  // Handle play/pause state
  useEffect(() => {
    if (audioRef.current) {
      if (state.isPlaying) {
        audioRef.current.play().catch(() => {
          setState(prev => ({ ...prev, isPlaying: false }));
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [state.isPlaying]);

  const play = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
  }, []);

  const togglePlayPause = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const nextTrack = useCallback(() => {
    setState(prev => {
      const nextIndex = (prev.currentTrackIndex + 1) % tracks.length;
      return { ...prev, currentTrackIndex: nextIndex, currentTime: 0 };
    });
  }, [tracks.length]);

  const previousTrack = useCallback(() => {
    setState(prev => {
      if (prev.currentTime > 3) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
        }
        return { ...prev, currentTime: 0 };
      }
      const prevIndex = prev.currentTrackIndex === 0 
        ? tracks.length - 1 
        : prev.currentTrackIndex - 1;
      return { ...prev, currentTrackIndex: prevIndex, currentTime: 0 };
    });
  }, [tracks.length]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState(prev => ({ ...prev, currentTime: time }));
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    setState(prev => ({ ...prev, volume }));
  }, []);

  const selectTrack = useCallback((index: number) => {
    setState(prev => ({ 
      ...prev, 
      currentTrackIndex: index, 
      currentTime: 0,
      isPlaying: true 
    }));
  }, []);

  return {
    ...state,
    currentTrack,
    play,
    pause,
    stop,
    togglePlayPause,
    nextTrack,
    previousTrack,
    seek,
    setVolume,
    selectTrack,
  };
}
