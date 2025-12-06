import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { audioManifestPlugin } from "./vite-plugin-audio-manifest";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // For GitHub Pages: use repo name as base path
  // For Lovable preview: use root
  base: '/',
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
