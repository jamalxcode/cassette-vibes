import { useState } from 'react';
import { CassettePlayer } from '@/components/CassettePlayer';
import { PlaylistSidebar } from '@/components/PlaylistSidebar';
import { AudioStartOverlay } from '@/components/AudioStartOverlay';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { tracks } from '@/data/tracks';

const Index = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    currentTrack,
    currentTrackIndex,
    togglePlayPause,
    stop,
    previousTrack,
    nextTrack,
    seek,
    setVolume,
    selectTrack,
  } = useAudioPlayer(tracks);

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

          {/* Main Content */}
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

          {/* Footer */}
          <footer className="mt-12 text-center text-sm text-muted-foreground">
            <p>
              Add your tracks to <code className="px-2 py-1 bg-muted rounded text-xs">src/data/tracks.ts</code>
            </p>
            <p className="mt-1 text-xs">
              Place MP3 files in <code className="px-1 py-0.5 bg-muted rounded">/audio</code> and album art in <code className="px-1 py-0.5 bg-muted rounded">/covers</code>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Index;
