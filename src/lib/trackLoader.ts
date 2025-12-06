import jsmediatags from 'jsmediatags';

export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover?: string;
}

// Default cover for tracks without embedded art
export const DEFAULT_COVER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%234a3728' width='100' height='100'/%3E%3Ccircle cx='50' cy='50' r='35' fill='none' stroke='%23d4a574' stroke-width='3'/%3E%3Ccircle cx='50' cy='50' r='12' fill='%23d4a574'/%3E%3Ccircle cx='50' cy='50' r='5' fill='%234a3728'/%3E%3C/svg%3E";

interface ID3Tags {
  title?: string;
  artist?: string;
  picture?: {
    format: string;
    data: number[];
  };
}

// Extract ID3 tags from an MP3 file
export function extractID3Tags(url: string): Promise<ID3Tags> {
  return new Promise((resolve) => {
    jsmediatags.read(url, {
      onSuccess: (tag: any) => {
        const tags = tag.tags || {};
        resolve({
          title: tags.title,
          artist: tags.artist,
          picture: tags.picture,
        });
      },
      onError: () => {
        resolve({});
      },
    });
  });
}

// Convert ID3 picture data to base64 data URL
export function pictureToDataUrl(picture: { format: string; data: number[] }): string {
  const base64 = btoa(
    picture.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
  return `data:${picture.format};base64,${base64}`;
}

// Parse filename to extract title (fallback when no ID3 tags)
function parseFilename(filename: string): { title: string; artist: string } {
  // Remove extension
  const name = filename.replace(/\.mp3$/i, '');
  
  // Try to split by " - " for "Artist - Title" format
  if (name.includes(' - ')) {
    const [artist, title] = name.split(' - ', 2);
    return { artist: artist.trim(), title: title.trim() };
  }
  
  // Just use filename as title
  return { title: name, artist: 'Unknown Artist' };
}

// Load manifest and build track list
export async function loadTracksFromManifest(): Promise<Track[]> {
  try {
    // Fetch the manifest file
    const response = await fetch('audio/manifest.json');
    if (!response.ok) {
      console.warn('No manifest.json found in /audio folder');
      return [];
    }
    
    const manifest = await response.json();
    const files: string[] = manifest.files || [];
    
    if (files.length === 0) {
      return [];
    }
    
    // Load each track with ID3 metadata
    const tracks: Track[] = await Promise.all(
      files.map(async (filename, index) => {
        const src = `audio/${filename}`;
        const id = String(index + 1);
        
        // Try to extract ID3 tags
        const tags = await extractID3Tags(src);
        const fallback = parseFilename(filename);
        
        // Build cover from embedded picture
        let cover: string | undefined;
        if (tags.picture) {
          try {
            cover = pictureToDataUrl(tags.picture);
          } catch {
            cover = undefined;
          }
        }
        
        return {
          id,
          title: tags.title || fallback.title,
          artist: tags.artist || fallback.artist,
          src,
          cover,
        };
      })
    );
    
    return tracks;
  } catch (error) {
    console.error('Error loading tracks:', error);
    return [];
  }
}
