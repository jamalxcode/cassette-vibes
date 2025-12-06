export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover?: string;
}

// Default cover for tracks without embedded art (cassette tape SVG)
export const DEFAULT_COVER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%234a3728' width='100' height='100'/%3E%3Ccircle cx='30' cy='50' r='20' fill='none' stroke='%23d4a574' stroke-width='2'/%3E%3Ccircle cx='70' cy='50' r='20' fill='none' stroke='%23d4a574' stroke-width='2'/%3E%3Ccircle cx='30' cy='50' r='8' fill='%23d4a574'/%3E%3Ccircle cx='70' cy='50' r='8' fill='%23d4a574'/%3E%3Crect x='30' y='45' width='40' height='10' fill='%23d4a574' opacity='0.3'/%3E%3C/svg%3E";

// Parse filename to extract title and artist
function parseFilename(filename: string): { title: string; artist: string } {
  // Remove extension
  const name = filename.replace(/\.mp3$/i, '');
  
  // Try to split by " - " for "Artist - Title" format
  if (name.includes(' - ')) {
    const [artist, title] = name.split(' - ', 2);
    return { artist: artist.trim(), title: title.trim() };
  }
  
  // Just use filename as title
  return { title: name.replace(/_/g, ' '), artist: 'Unknown Artist' };
}

// Get the base URL for assets (handles GitHub Pages subdirectory)
const BASE_URL = import.meta.env.BASE_URL || '/';

// Load tracks from manifest.json
export async function loadTracksFromManifest(): Promise<Track[]> {
  try {
    // Fetch the manifest file using BASE_URL for GitHub Pages compatibility
    const manifestUrl = `${BASE_URL}audio/manifest.json`;
    const response = await fetch(manifestUrl);
    if (!response.ok) {
      console.warn(`No manifest.json found at ${manifestUrl}`);
      return [];
    }
    
    const manifest = await response.json();
    const files: string[] = manifest.files || [];
    
    if (files.length === 0) {
      return [];
    }
    
    // Build track list from filenames using BASE_URL for paths
    const tracks: Track[] = files.map((filename, index) => {
      const src = `${BASE_URL}audio/${filename}`;
      const id = String(index + 1);
      const { title, artist } = parseFilename(filename);
      
      return {
        id,
        title,
        artist,
        src,
        cover: undefined, // Will use DEFAULT_COVER
      };
    });
    
    return tracks;
  } catch (error) {
    console.error('Error loading tracks:', error);
    return [];
  }
}
