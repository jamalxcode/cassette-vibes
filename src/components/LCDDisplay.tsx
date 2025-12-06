import { cn } from '@/lib/utils';
import { Track } from '@/data/tracks';

interface LCDDisplayProps {
  track: Track | null;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  className?: string;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function LCDDisplay({ track, currentTime, duration, isLoading, className }: LCDDisplayProps) {
  return (
    <div 
      className={cn(
        "bg-lcd-bg rounded-lg p-4 shadow-lcd relative overflow-hidden scanlines",
        className
      )}
    >
      <div className="relative z-10 font-lcd text-lcd-text lcd-glow">
        {isLoading ? (
          <div className="text-2xl animate-pulse-glow">LOADING...</div>
        ) : track ? (
          <>
            <div className="text-2xl md:text-3xl truncate leading-tight">
              {track.title}
            </div>
            <div className="text-lg md:text-xl text-lcd-text/70 truncate mt-1">
              {track.artist}
            </div>
            <div className="flex justify-between items-center mt-3 text-xl">
              <span>{formatTime(currentTime)}</span>
              <span className="text-lcd-text/50">|</span>
              <span>{formatTime(duration)}</span>
            </div>
          </>
        ) : (
          <div className="text-2xl">NO TRACK LOADED</div>
        )}
      </div>
    </div>
  );
}
