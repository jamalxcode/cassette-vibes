import { cn } from '@/lib/utils';

interface VUMeterProgressProps {
  progress: number; // 0 to 1
  onSeek: (progress: number) => void;
  className?: string;
}

export function VUMeterProgress({ progress, onSeek, className }: VUMeterProgressProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, x / rect.width));
    onSeek(newProgress);
  };

  const segments = 20;
  const filledSegments = Math.floor(progress * segments);

  return (
    <div 
      className={cn(
        "h-6 bg-zinc-900 rounded p-1 cursor-pointer shadow-inset-deep",
        className
      )}
      onClick={handleClick}
      role="slider"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
    >
      <div className="flex h-full gap-0.5">
        {Array.from({ length: segments }).map((_, i) => {
          const isFilled = i < filledSegments;
          const isGreen = i < segments * 0.6;
          const isYellow = i >= segments * 0.6 && i < segments * 0.8;
          const isRed = i >= segments * 0.8;
          
          return (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-sm transition-all duration-75",
                isFilled ? (
                  isGreen ? "bg-vu-green shadow-[0_0_4px_hsl(var(--vu-green))]" :
                  isYellow ? "bg-vu-yellow shadow-[0_0_4px_hsl(var(--vu-yellow))]" :
                  "bg-vu-red shadow-[0_0_4px_hsl(var(--vu-red))]"
                ) : "bg-zinc-800"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
