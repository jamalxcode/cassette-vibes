# Retro Cassette Player

A beautiful retro-styled cassette tape music player built with React.

## Adding Music

Simply upload your MP3 files to the `/public/audio/` folder. The app will automatically detect and load them - no configuration needed!

### File Naming

For best results, name your files using this format:
```
Artist Name - Song Title.mp3
```

Examples:
- `The Beatles - Hey Jude.mp3`
- `Queen - Bohemian Rhapsody.mp3`
- `Unknown Artist - My Song.mp3`

The app will parse the filename to extract the artist and title automatically.

### How to Upload via GitHub

1. Navigate to the `public/audio` folder in your repository
2. Click **Add file** → **Upload files**
3. Drag and drop your MP3 files
4. Click **Commit changes**

The app will rebuild automatically and your new tracks will appear in the playlist.

## Deploying to GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Under "Build and deployment", set Source to **GitHub Actions**
3. Push your code - the app will deploy automatically

Your app will be available at: `https://YOUR-USERNAME.github.io/REPO-NAME/`

## Technology Stack

- React + Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
