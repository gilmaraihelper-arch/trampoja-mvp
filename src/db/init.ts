import { runMigrations } from './migrate'
import { ensureSeed } from './seed'

const globalForInit = globalThis as unknown as {
  __trampojaDbReady?: Promise<void>
}

export function ensureDbReady() {
  if (!globalForInit.__trampojaDbReady) {
    globalForInit.__trampojaDbReady = (async () => {
      runMigrations()
      await ensureSeed()
    })()
  }

  return globalForInit.__trampojaDbReady
}
