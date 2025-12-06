import { useQuery } from '@tanstack/react-query';
import { loadTracksFromManifest, Track } from '@/lib/trackLoader';

export function useTracks() {
  return useQuery<Track[]>({
    queryKey: ['tracks'],
    queryFn: loadTracksFromManifest,
    staleTime: Infinity, // Tracks don't change during session
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
