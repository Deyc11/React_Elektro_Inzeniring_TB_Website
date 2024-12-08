import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@fortawesome/fontawesome-free": "/node_modules/@fortawesome/fontawesome-free",
    },
  },
  server: {
    host: '0.0.0.0', // Allows the server to listen on all network interfaces
    port: 5173, // Optional: You can specify the port if needed
  },
});


