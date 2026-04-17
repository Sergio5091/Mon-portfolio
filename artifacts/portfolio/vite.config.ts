import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,

    // 🔥 IMPORTANT : supprime tes warnings sourcemap
    sourcemap: false,

    // 🚀 optimisation bundle (réduit ton gros JS de 596KB)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react-vendor";
            if (id.includes("framer-motion")) return "motion";
            return "vendor";
          }
        },
      },
    },
  },
});