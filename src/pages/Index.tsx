import { useState, useEffect } from 'react';
import { CassettePlayer } from '@/components/CassettePlayer';
import { PlaylistSidebar } from '@/components/PlaylistSidebar';
import { AudioStartOverlay } from '@/components/AudioStartOverlay';
import { useAudioPlayerContext } from '@/contexts/AudioPlayerContext';
import { useTracks } from '@/hooks/useTracks';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const { data: tracks = [], isLoading: isLoadingTracks } = useTracks();
  
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    currentTrack,
    currentTrackIndex,
    tracks: playerTracks,
    togglePlayPause,
    stop,
    previousTrack,
    nextTrack,
    seek,
    setVolume,
    selectTrack,
    setTracks,
  } = useAudioPlayerContext();

  // Sync tracks to audio player context when loaded
  useEffect(() => {
    if (tracks.length > 0 && playerTracks.length === 0) {
      setTracks(tracks);
    }
  }, [tracks, playerTracks.length, setTracks]);

  const handleAudioStart = () => {
    setAudioEnabled(true);
  };

  return (
    <>
      {/* Audio Start Overlay */}
      {!audioEnabled && (
        <AudioStartOverlay onStart={handleAudioStart} />
      )}

      {/* Main Layout */}
      <div className="min-h-screen bg-background p-4 md:p-8 crt-overlay vignette">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-lcd text-wood tracking-wider">
              RETRO CASSETTE PLAYER
            </h1>
            <p className="text-muted-foreground mt-2">
              Your personal MP3 collection
            </p>
          </header>

          {/* Loading State */}
          {isLoadingTracks ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-wood animate-spin" />
              <p className="mt-4 text-muted-foreground">Loading tracks...</p>
            </div>
          ) : (
            /* Main Content */
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center">
              {/* Cassette Player - Center */}
              <div className="w-full lg:w-auto lg:flex-shrink-0">
                <CassettePlayer
                  track={currentTrack}
                  isPlaying={isPlaying}
                  currentTime={currentTime}
                  duration={duration}
                  volume={volume}
                  isLoading={isLoading}
                  onPlayPause={togglePlayPause}
                  onStop={stop}
                  onPrevious={previousTrack}
                  onNext={nextTrack}
                  onSeek={seek}
                  onVolumeChange={setVolume}
                  className="max-w-md mx-auto lg:mx-0"
                />
              </div>

              {/* Playlist Sidebar - Right */}
              <div className="w-full lg:w-80">
                <PlaylistSidebar
                  tracks={tracks}
                  currentTrackIndex={currentTrackIndex}
                  onSelectTrack={selectTrack}
                />
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-12 text-center text-xs text-muted-foreground">
            <p>Upload MP3 files to <code className="px-1.5 py-0.5 bg-muted rounded">/public/audio/</code> to add tracks</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Index;
