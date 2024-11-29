import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,   // Habilita el monitoreo con sondeo
      interval: 100       // Ajusta el intervalo del sondeo en milisegundos (opcional)
    },
    host: true,           // Permite acceder desde la red local si necesitas
    strictPort: true      // Fuerza el uso de un solo puerto
  }
});