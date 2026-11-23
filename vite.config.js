import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Nombre del repositorio en GitHub. Debe coincidir EXACTAMENTE con el nombre
// del repo para que GitHub Pages sirva bien los archivos
// (https://<usuario>.github.io/<REPO_NAME>/).
const REPO_NAME = 'viajes-nombre-apellido-pfy2202';

export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  // En desarrollo se sirve desde la raíz; en el build (y su preview), desde /<repo>/
  base: command === 'build' || isPreview ? `/${REPO_NAME}/` : '/',
  server: { port: 3000, open: true },
}));
