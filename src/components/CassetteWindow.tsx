import { TapeReel } from './TapeReel';
import { cn } from '@/lib/utils';

interface CassetteWindowProps {
  isPlaying: boolean;
  className?: string;
}

export function CassetteWindow({ isPlaying, className }: CassetteWindowProps) {
  return (
    <div 
      className={cn(
        "cassette-glass rounded-lg p-4 relative",
        className
      )}
    >
      {/* Cassette label area */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-100/90 rounded text-xs font-bold text-amber-900 tracking-wider">
        CHROME • 90
      </div>
      
      {/* Tape reels container */}
      <div className="flex justify-center items-center gap-8 py-6">
        <TapeReel isSpinning={isPlaying} size="lg" />
        
        {/* Tape between reels */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-4">
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-amber-900/40" />
          <div className="absolute inset-x-0 top-1/2 mt-1 h-0.5 bg-amber-900/30" />
        </div>
        
        <TapeReel isSpinning={isPlaying} size="lg" />
      </div>
      
      {/* Tape head window */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-zinc-900/80 rounded-sm" />
      
      {/* Corner screws */}
      {[
        'top-2 left-2',
        'top-2 right-2', 
        'bottom-2 left-2',
        'bottom-2 right-2'
      ].map((position, i) => (
        <div 
          key={i}
          className={cn(
            "absolute w-2 h-2 rounded-full chrome-effect",
            "shadow-sm",
            position
          )}
        >
          <div className="absolute inset-0.5 rounded-full bg-zinc-600" />
        </div>
      ))}
    </div>
  );
}
