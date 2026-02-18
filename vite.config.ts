import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { resumeSeoPlugin } from './vite-plugin-resume-seo'
import { assetsDetectPlugin } from './vite-plugin-assets-detect'
import { resumeValidatePlugin } from './vite-plugin-resume-validate'

export default defineConfig(({ command }) => {
  // En développement, utiliser '/'
  // En production, utiliser la variable d'environnement ou '/cv/'
  const base = command === 'serve'
    ? '/'
    : (process.env.VITE_BASE_PATH || '/cv/')
  
  console.log(`Building with base path: ${base}`)
  
  return {
    base,
    plugins: [react(), tailwindcss(), assetsDetectPlugin(), resumeValidatePlugin(), resumeSeoPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})