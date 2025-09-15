import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    open: true,

    proxy: {
      // qualquer req. que comece com '/api' sera redirecionada
      "/api": {
        // o alvo do redirecionamento é o servidor back-end
        target: "http://localhost:4000",

        // evitando problemas de origem/CORS
        changeOrigin: true,
      },
    },
  },
});
