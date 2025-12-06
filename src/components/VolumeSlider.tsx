import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VolumeSliderProps {
  volume: number; // 0 to 1
  onChange: (volume: number) => void;
  className?: string;
}

export function VolumeSlider({ volume, onChange, className }: VolumeSliderProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        onClick={() => onChange(volume > 0 ? 0 : 0.7)}
        className="text-wood hover:text-wood-light transition-colors"
        aria-label={volume > 0 ? "Mute" : "Unmute"}
      >
        {volume > 0 ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
      
      <div className="relative flex-1 h-3 bg-zinc-800 rounded-full shadow-inset-deep overflow-hidden">
        {/* Track fill */}
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-wood-dark to-wood rounded-full transition-all"
          style={{ width: `${volume * 100}%` }}
        />
        
        {/* Invisible range input for interaction */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Volume"
        />
        
        {/* Knob */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full chrome-effect border border-chrome-dark shadow-md pointer-events-none"
          style={{ left: `calc(${volume * 100}% - 8px)` }}
        />
      </div>
    </div>
  );
}
