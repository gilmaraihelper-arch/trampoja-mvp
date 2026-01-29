import fs from 'node:fs'
import path from 'node:path'

const dataDir = path.join(process.cwd(), '.data')

try {
  fs.mkdirSync(dataDir, { recursive: true })
} catch (err) {
  console.error('Failed to create .data directory:', err)
  process.exit(1)
}
