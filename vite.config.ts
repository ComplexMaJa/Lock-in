import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const osUsername = process.env.USERNAME || process.env.USER || process.env.LOGNAME || 'Kidung';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.VITE_OS_USERNAME': JSON.stringify(osUsername),
  },
});
