import { defineConfig } from 'vite'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { resolve, join } from 'path'
import tailwindcss from '@tailwindcss/vite'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))
const version = packageJson.version

function collectHtmlInputs(rootDir, subfolder) {
  const dir = join(rootDir, subfolder)
  const inputs = {}
  if (!existsSync(dir)) return inputs
  readdirSync(dir)
    .filter((f) => f.endsWith('.html'))
    .forEach((f) => {
      const name = f.replace('.html', '')
      inputs[`${subfolder}/${name}`] = resolve(dir, f)
    })
  return inputs
}

export default defineConfig({
  base: './',
  plugins: [tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        articles: resolve(__dirname, 'articles.html'),
        knowledge: resolve(__dirname, 'knowledge.html'),
        hthpColumn: resolve(__dirname, 'hthp-column.html'),
        heatPumpStandards: resolve(__dirname, 'heat-pump-standards.html'),
        heatPumpRefrigerants: resolve(__dirname, 'heat-pump-refrigerants.html'),
        usefulLinks: resolve(__dirname, 'useful-links.html'),
        heatPumpPolicies: resolve(__dirname, 'heat-pump-policies.html'),
        ...collectHtmlInputs(__dirname, 'briefings'),
        ...collectHtmlInputs(__dirname, 'insights'),
      },
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
