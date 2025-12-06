import { useEffect } from 'react';
import { useAudioPlayerContext } from '@/contexts/AudioPlayerContext';

export function useKeyboardShortcuts() {
  const { togglePlayPause, nextTrack, previousTrack, seek, currentTime, duration } = useAudioPlayerContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (e.shiftKey) {
            // Shift + Right = next track
            nextTrack();
          } else {
            // Right = seek forward 10s
            seek(Math.min(currentTime + 10, duration));
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (e.shiftKey) {
            // Shift + Left = previous track
            previousTrack();
          } else {
            // Left = seek back 10s
            seek(Math.max(currentTime - 10, 0));
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayPause, nextTrack, previousTrack, seek, currentTime, duration]);
}
