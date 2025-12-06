export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover?: string;
}

// Default cover image for tracks without album art
export const DEFAULT_COVER = "https://images.unsplash.com/photo-1619983081563-430f63602796?w=200&h=200&fit=crop&q=80";

// Edit this array to add/remove tracks from your collection
// Place your MP3 files in the /audio folder
// Place your album art in the /covers folder
export const tracks: Track[] = [
  {
    id: "1",
    title: "Midnight Drive",
    artist: "The Cassette Kings",
    src: "audio/demo-track-1.mp3",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&q=80"
  },
  {
    id: "2", 
    title: "Summer of '85",
    artist: "Analog Dreams",
    src: "audio/demo-track-2.mp3",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop&q=80"
  },
  {
    id: "3",
    title: "Tape Rewind",
    artist: "Vintage Vibes",
    src: "audio/demo-track-3.mp3",
    cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=200&h=200&fit=crop&q=80"
  },
];
