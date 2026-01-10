import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const htmlPath = join(__dirname, '../dist/index.html')
let html = readFileSync(htmlPath, 'utf-8')

// 移除 crossorigin 属性
html = html.replace(/\s+crossorigin=""/g, '')
html = html.replace(/\s+crossorigin/g, '')

writeFileSync(htmlPath, html, 'utf-8')
console.log('✓ Removed crossorigin attributes from index.html')
