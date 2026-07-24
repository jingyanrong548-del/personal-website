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
        aiEngineer: resolve(__dirname, 'ai-engineer.html'),
        tools: resolve(__dirname, 'tools.html'),
        cases: resolve(__dirname, 'cases.html'),
        founder: resolve(__dirname, 'founder.html'),
        roadmap: resolve(__dirname, 'roadmap.html'),
        why: resolve(__dirname, 'why.html'),
        aiWorkspace: resolve(__dirname, 'ai-workspace.html'),
        projects: resolve(__dirname, 'projects.html'),
        knowledge: resolve(__dirname, 'knowledge.html'),
        hthpColumn: resolve(__dirname, 'hthp-column.html'),
        heatPumpStandards: resolve(__dirname, 'heat-pump-standards.html'),
        heatPumpRefrigerants: resolve(__dirname, 'heat-pump-refrigerants.html'),
        usefulLinks: resolve(__dirname, 'useful-links.html'),
        heatPumpPolicies: resolve(__dirname, 'heat-pump-policies.html'),
        knowledgeRefrigerants: resolve(__dirname, 'knowledge-refrigerants.html'),
        knowledgeCycles: resolve(__dirname, 'knowledge-cycles.html'),
        knowledgeCompressor: resolve(__dirname, 'knowledge-compressor.html'),
        knowledgeExchanger: resolve(__dirname, 'knowledge-exchanger.html'),
        knowledgeValves: resolve(__dirname, 'knowledge-valves.html'),
        knowledgeVessels: resolve(__dirname, 'knowledge-vessels.html'),
        knowledgeElectrical: resolve(__dirname, 'knowledge-electrical.html'),
        knowledgeLubricants: resolve(__dirname, 'knowledge-lubricants.html'),
        knowledgePiping: resolve(__dirname, 'knowledge-piping.html'),
        knowledgeEnclosure: resolve(__dirname, 'knowledge-enclosure.html'),
        knowledgeShopTest: resolve(__dirname, 'knowledge-shop-test.html'),
        services: resolve(__dirname, 'services.html'),
        servicesTechnologies: resolve(__dirname, 'services-technologies.html'),
        servicesIntegration: resolve(__dirname, 'services-integration.html'),
        servicesTransition: resolve(__dirname, 'services-transition.html'),
        servicesSpecs: resolve(__dirname, 'services-specs.html'),
        servicesDissemination: resolve(__dirname, 'services-dissemination.html'),
        ...collectHtmlInputs(__dirname, 'briefings'),
        ...collectHtmlInputs(__dirname, 'insights'),
        ...collectHtmlInputs(__dirname, 'cases'),
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
