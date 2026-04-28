import { defineConfig } from 'vite'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

// 读取 package.json 获取版本号
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))
const version = packageJson.version

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
  ],
  define: {
    '__APP_VERSION__': JSON.stringify(version)
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        knowledge: resolve(__dirname, 'knowledge.html'),
      },
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
