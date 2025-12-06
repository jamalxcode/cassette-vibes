import { Play, Pause, SkipBack, SkipForward, Square } from 'lucide-react';
import { CassetteWindow } from './CassetteWindow';
import { LCDDisplay } from './LCDDisplay';
import { VUMeterProgress } from './VUMeterProgress';
import { VolumeSlider } from './VolumeSlider';
import { TransportButton } from './TransportButton';
import { Track } from '@/data/tracks';
import { cn } from '@/lib/utils';

interface CassettePlayerProps {
  track: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  onPlayPause: () => void;
  onStop: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  className?: string;
}

export function CassettePlayer({
  track,
  isPlaying,
  currentTime,
  duration,
  volume,
  isLoading,
  onPlayPause,
  onStop,
  onPrevious,
  onNext,
  onSeek,
  onVolumeChange,
  className,
}: CassettePlayerProps) {
  const progress = duration > 0 ? currentTime / duration : 0;

  const handleSeek = (newProgress: number) => {
    onSeek(newProgress * duration);
  };

  return (
    <div 
      className={cn(
        "deck-body rounded-2xl p-6 md:p-8 shadow-deck relative noise-overlay",
        "border-t-2 border-white/20",
        className
      )}
    >
      {/* Wood grain accent strip */}
      <div className="absolute top-0 left-0 right-0 h-3 wood-texture rounded-t-2xl" />
      <div className="absolute bottom-0 left-0 right-0 h-3 wood-texture rounded-b-2xl" />
      
      {/* Chrome trim */}
      <div className="absolute top-3 left-4 right-4 h-0.5 chrome-effect rounded-full opacity-60" />
      
      {/* Brand label */}
      <div className="absolute top-5 left-6 text-xs font-bold tracking-[0.3em] text-wood/60">
        LOVABLE
      </div>
      <div className="absolute top-5 right-6 text-xs font-medium tracking-wider text-muted-foreground/50">
        STEREO
      </div>
      
      <div className="mt-6 space-y-6">
        {/* Cassette Window */}
        <CassetteWindow isPlaying={isPlaying} className="mx-auto max-w-xs" />
        
        {/* LCD Display */}
        <LCDDisplay 
          track={track}
          currentTime={currentTime}
          duration={duration}
          isLoading={isLoading}
        />
        
        {/* VU Meter Progress Bar */}
        <VUMeterProgress 
          progress={progress}
          onSeek={handleSeek}
        />
        
        {/* Transport Controls */}
        <div className="flex justify-center items-center gap-3 md:gap-4">
          <TransportButton 
            onClick={onPrevious}
            aria-label="Previous track"
            size="md"
          >
            <SkipBack className="w-6 h-6 fill-current" />
          </TransportButton>
          
          <TransportButton 
            onClick={onPlayPause}
            variant="primary"
            size="lg"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current ml-1" />
            )}
          </TransportButton>
          
          <TransportButton 
            onClick={onStop}
            aria-label="Stop"
            size="md"
          >
            <Square className="w-5 h-5 fill-current" />
          </TransportButton>
          
          <TransportButton 
            onClick={onNext}
            aria-label="Next track"
            size="md"
          >
            <SkipForward className="w-6 h-6 fill-current" />
          </TransportButton>
        </div>
        
        {/* Volume Control */}
        <div className="max-w-xs mx-auto">
          <VolumeSlider 
            volume={volume}
            onChange={onVolumeChange}
          />
        </div>
      </div>
      
      {/* Bottom vent holes decoration */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-8 h-1 bg-deck-shadow/30 rounded-full" />
        ))}
      </div>
    </div>
  );
}
