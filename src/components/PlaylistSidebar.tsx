import { Track, DEFAULT_COVER } from '@/lib/trackLoader';
import { cn } from '@/lib/utils';
import { Music } from 'lucide-react';

interface PlaylistSidebarProps {
  tracks: Track[];
  currentTrackIndex: number;
  onSelectTrack: (index: number) => void;
  className?: string;
}

export function PlaylistSidebar({ 
  tracks, 
  currentTrackIndex, 
  onSelectTrack,
  className 
}: PlaylistSidebarProps) {
  return (
    <div 
      className={cn(
        "bg-playlist-bg rounded-2xl shadow-deck overflow-hidden",
        "border border-border/50",
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-deck-body">
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-wood" />
          <h2 className="font-semibold text-foreground tracking-wide">PLAYLIST</h2>
          <span className="ml-auto text-sm text-muted-foreground">{tracks.length} tracks</span>
        </div>
      </div>
      
      {/* Track List */}
      <div className="overflow-y-auto max-h-[400px] md:max-h-[500px]">
        {tracks.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p>No tracks found.</p>
            <p className="text-sm mt-2">Add MP3 files to /public/audio/</p>
          </div>
        ) : (
          <ul className="divide-y divide-border/30">
            {tracks.map((track, index) => (
              <li key={track.id}>
                <button
                  onClick={() => onSelectTrack(index)}
                  className={cn(
                    "w-full p-3 flex items-center gap-3 text-left transition-retro",
                    "hover:bg-playlist-hover",
                    "focus:outline-none focus:bg-playlist-hover",
                    "min-h-[68px]",
                    currentTrackIndex === index && "bg-playlist-active border-l-4 border-wood"
                  )}
                >
                  {/* Album Art */}
                  <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 shadow-md bg-muted">
                    <img
                      src={track.cover || DEFAULT_COVER}
                      alt={`${track.title} album art`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_COVER;
                      }}
                    />
                  </div>
                  
                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "font-medium truncate",
                      currentTrackIndex === index ? "text-wood-dark" : "text-foreground"
                    )}>
                      {track.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {track.artist}
                    </p>
                  </div>
                  
                  {/* Playing indicator */}
                  {currentTrackIndex === index && (
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3].map((bar) => (
                        <div
                          key={bar}
                          className="w-1 bg-wood rounded-full animate-pulse"
                          style={{
                            height: `${8 + bar * 4}px`,
                            animationDelay: `${bar * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
