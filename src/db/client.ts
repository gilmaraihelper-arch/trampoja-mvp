import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

import * as schema from './schema'

const DB_PATH = process.env.TRAMPOJA_DB_PATH || '.data/trampoja.db'

// Keep a singleton in dev to avoid file locks on hot reload.
const globalForDb = globalThis as unknown as {
  __trampojaSqlite?: Database.Database
}

const sqlite = globalForDb.__trampojaSqlite ?? new Database(DB_PATH)
if (!globalForDb.__trampojaSqlite) globalForDb.__trampojaSqlite = sqlite

// Pragmas for a small app
sqlite.pragma('journal_mode = WAL')
sqlite.pragma('foreign_keys = ON')

export const db = drizzle(sqlite, { schema })
