// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { resumeSeoPlugin } from './vite-plugin-resume-seo'
import { assetsDetectPlugin } from './vite-plugin-assets-detect'
import { resumeValidatePlugin } from './vite-plugin-resume-validate'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_BASE_PATH || '/cv/',
    define: {
      'import.meta.env.VITE_RESSOURCES_URL': JSON.stringify(env.VITE_RESSOURCES_URL),
    },
    plugins: [
      react(),
      tailwindcss(),
      assetsDetectPlugin(),
      resumeValidatePlugin(),
      resumeSeoPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
