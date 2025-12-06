import { useEffect } from 'react';
import { useAudioPlayerContext } from '@/contexts/AudioPlayerContext';
import { DEFAULT_COVER } from '@/lib/trackLoader';

export function useMediaSession() {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlayPause, 
    nextTrack, 
    previousTrack, 
    stop,
    currentTime,
    duration,
    seek 
  } = useAudioPlayerContext();

  // Update metadata when track changes
  useEffect(() => {
    if (!('mediaSession' in navigator) || !currentTrack) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: currentTrack.artist,
      album: 'Cassette Player',
      artwork: [
        { src: currentTrack.cover || DEFAULT_COVER, sizes: '96x96', type: 'image/png' },
        { src: currentTrack.cover || DEFAULT_COVER, sizes: '128x128', type: 'image/png' },
        { src: currentTrack.cover || DEFAULT_COVER, sizes: '192x192', type: 'image/png' },
        { src: currentTrack.cover || DEFAULT_COVER, sizes: '256x256', type: 'image/png' },
        { src: currentTrack.cover || DEFAULT_COVER, sizes: '384x384', type: 'image/png' },
        { src: currentTrack.cover || DEFAULT_COVER, sizes: '512x512', type: 'image/png' },
      ],
    });
  }, [currentTrack]);

  // Update playback state
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
  }, [isPlaying]);

  // Set up action handlers
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;

    navigator.mediaSession.setActionHandler('play', togglePlayPause);
    navigator.mediaSession.setActionHandler('pause', togglePlayPause);
    navigator.mediaSession.setActionHandler('stop', stop);
    navigator.mediaSession.setActionHandler('previoustrack', previousTrack);
    navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.seekTime !== undefined) {
        seek(details.seekTime);
      }
    });
    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
      const skipTime = details.seekOffset || 10;
      seek(Math.max(currentTime - skipTime, 0));
    });
    navigator.mediaSession.setActionHandler('seekforward', (details) => {
      const skipTime = details.seekOffset || 10;
      seek(Math.min(currentTime + skipTime, duration));
    });

    return () => {
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('stop', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
      navigator.mediaSession.setActionHandler('seekto', null);
      navigator.mediaSession.setActionHandler('seekbackward', null);
      navigator.mediaSession.setActionHandler('seekforward', null);
    };
  }, [togglePlayPause, stop, previousTrack, nextTrack, seek, currentTime, duration]);

  // Update position state for seek bar on lock screen
  useEffect(() => {
    if (!('mediaSession' in navigator) || !('setPositionState' in navigator.mediaSession)) return;
    
    if (duration > 0) {
      try {
        navigator.mediaSession.setPositionState({
          duration,
          playbackRate: 1,
          position: currentTime,
        });
      } catch (e) {
        // Ignore position state errors
      }
    }
  }, [currentTime, duration]);
}
