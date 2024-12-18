import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // Root folder
  build: {
    outDir: "dist", // Output directory
    rollupOptions: {
      input: "./index.html", // Ensure index.html is the build entry point
    },
  },
});
