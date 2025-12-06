import { cn } from '@/lib/utils';

interface TapeReelProps {
  isSpinning: boolean;
  size?: 'sm' | 'lg';
  className?: string;
}

export function TapeReel({ isSpinning, size = 'lg', className }: TapeReelProps) {
  const sizeClasses = size === 'lg' ? 'w-20 h-20' : 'w-16 h-16';
  
  return (
    <div 
      className={cn(
        "tape-reel rounded-full relative",
        sizeClasses,
        isSpinning && "animate-spin-slow",
        className
      )}
    >
      {/* Center hub */}
      <div className="absolute inset-1/3 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-inner" />
      
      {/* Spokes */}
      {[0, 60, 120, 180, 240, 300].map((rotation) => (
        <div
          key={rotation}
          className="absolute top-1/2 left-1/2 w-0.5 h-1/3 bg-zinc-600 origin-bottom -translate-x-1/2"
          style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
        />
      ))}
      
      {/* Tape on reel */}
      <div className="absolute inset-2 rounded-full border-4 border-amber-900/60 opacity-80" />
      <div className="absolute inset-3 rounded-full border-2 border-amber-800/40" />
    </div>
  );
}
