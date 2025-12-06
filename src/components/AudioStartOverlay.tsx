import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioStartOverlayProps {
  onStart: () => void;
  className?: string;
}

export function AudioStartOverlay({ onStart, className }: AudioStartOverlayProps) {
  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-background/95 backdrop-blur-sm",
        className
      )}
      onClick={onStart}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onStart()}
      aria-label="Tap to enable audio playback"
    >
      <div className="text-center animate-fade-in">
        {/* Cassette Icon */}
        <div className="w-32 h-20 mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-deck-body rounded-lg shadow-deck" />
          <div className="absolute inset-2 cassette-glass rounded flex items-center justify-center gap-4">
            <div className="w-8 h-8 tape-reel rounded-full" />
            <div className="w-8 h-8 tape-reel rounded-full" />
          </div>
        </div>
        
        {/* Text */}
        <h2 className="text-2xl md:text-3xl font-lcd text-wood mb-2">
          RETRO CASSETTE PLAYER
        </h2>
        <p className="text-muted-foreground mb-8">
          Your personal MP3 collection
        </p>
        
        {/* Start Button */}
        <button className="retro-button px-8 py-4 rounded-xl flex items-center gap-3 mx-auto text-button-text font-semibold">
          <Play className="w-6 h-6 fill-current" />
          <span>TAP TO START</span>
        </button>
        
        <p className="mt-6 text-sm text-muted-foreground/60">
          (Audio requires user interaction)
        </p>
      </div>
    </div>
  );
}
