import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

export function audioManifestPlugin(): Plugin {
  return {
    name: 'audio-manifest',
    buildStart() {
      generateManifest();
    },
    configureServer(server) {
      // Regenerate manifest when files change in dev
      const audioDir = path.resolve(__dirname, 'public/audio');
      
      // Generate on server start
      generateManifest();
      
      // Watch for changes
      server.watcher.add(audioDir);
      server.watcher.on('all', (event, filePath) => {
        if (filePath.startsWith(audioDir) && filePath.endsWith('.mp3')) {
          generateManifest();
        }
      });
    },
  };
}

function generateManifest() {
  const audioDir = path.resolve(__dirname, 'public/audio');
  const manifestPath = path.resolve(audioDir, 'manifest.json');
  
  // Ensure directory exists
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }
  
  // Find all MP3 files
  let files: string[] = [];
  try {
    files = fs.readdirSync(audioDir)
      .filter(file => file.toLowerCase().endsWith('.mp3'))
      .sort();
  } catch (e) {
    // Directory might not exist yet
  }
  
  // Write manifest
  fs.writeFileSync(manifestPath, JSON.stringify({ files }, null, 2));
  console.log(`[audio-manifest] Generated manifest with ${files.length} tracks`);
}
