import { eq } from 'drizzle-orm'

import { db } from './client'
import { freelancers, restaurants, shifts } from './schema'

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

export async function ensureSeed() {
  const existing = await db.select().from(restaurants).limit(1)
  if (existing.length) return

  const now = new Date()
  const rId = 'rest_1001'
  await db.insert(restaurants).values({
    id: rId,
    name: 'Bistrô do Centro',
    city: 'Curitiba',
    createdAt: now,
  })

  const fl = [
    { id: 'f_001', name: 'Ana Souza', rating: 48, reliability: 95 },
    { id: 'f_044', name: 'Camila Rocha', rating: 49, reliability: 97 },
    { id: 'f_019', name: 'Bruno Lima', rating: 45, reliability: 93 },
  ]

  await db.insert(freelancers).values(
    fl.map((f) => ({ ...f, createdAt: now }))
  )

  await db.insert(shifts).values({
    id: 'rs_1001',
    restaurantId: rId,
    title: 'Garçom — Sexta (jantar)',
    neighborhood: 'Centro',
    startsAt: new Date('2026-02-06T20:00:00.000Z'),
    endsAt: new Date('2026-02-07T02:00:00.000Z'),
    headcount: 3,
    filled: 1,
    status: 'open',
    createdAt: now,
  })

  // sanity read (no-op)
  await db.select().from(restaurants).where(eq(restaurants.id, rId)).limit(1)
}
