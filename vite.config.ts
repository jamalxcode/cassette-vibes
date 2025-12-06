import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { audioManifestPlugin } from "./vite-plugin-audio-manifest";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Set base to repo name for GitHub Pages (e.g., '/my-cassette-player/')
  // Leave as '/' for Lovable preview or root domain deployment
  base: process.env.GITHUB_ACTIONS ? './' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    audioManifestPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
