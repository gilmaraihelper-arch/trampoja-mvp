import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

import { eq } from 'drizzle-orm'

import { db, DB_PATH } from '../src/db/client'
import { ensureDbReady } from '../src/db/init'
import { favorites, freelancers, invites, restaurants, shifts } from '../src/db/schema'

function id(prefix) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

async function main() {
  await mkdir(dirname(DB_PATH), { recursive: true })
  await ensureDbReady()

  const now = new Date()

  // Clear (simple order)
  await db.delete(invites)
  await db.delete(favorites)
  await db.delete(shifts)
  await db.delete(freelancers)
  await db.delete(restaurants)

  const restaurantId = 'rest_1001'

  await db.insert(restaurants).values({
    id: restaurantId,
    name: 'Bistrô do Centro',
    city: 'Curitiba',
    createdAt: now,
  })

  const f1 = { id: 'fr_1001', name: 'Ana Carolina', rating: 48, reliability: 92, createdAt: now }
  const f2 = { id: 'fr_1002', name: 'Marcos Oliveira', rating: 46, reliability: 88, createdAt: now }
  const f3 = { id: 'fr_1003', name: 'Roberto Silva', rating: 45, reliability: 80, createdAt: now }

  await db.insert(freelancers).values([f1, f2, f3])

  const shiftId = 'shift_1001'
  await db.insert(shifts).values({
    id: shiftId,
    restaurantId,
    title: 'Garçom — Sexta (jantar)',
    neighborhood: 'Centro',
    startsAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
    endsAt: new Date(now.getTime() + 30 * 60 * 60 * 1000),
    headcount: 2,
    filled: 0,
    status: 'open',
    createdAt: now,
  })

  await db.insert(favorites).values([
    { id: id('fav'), restaurantId, freelancerId: f1.id, createdAt: now },
    { id: id('fav'), restaurantId, freelancerId: f2.id, createdAt: now },
  ])

  await db.insert(invites).values([
    // Active
    {
      id: id('inv'),
      restaurantId,
      shiftId,
      freelancerId: f1.id,
      status: 'sent',
      expiresAt: new Date(now.getTime() + 60 * 60 * 1000),
      createdAt: now,
    },
    // Expired
    {
      id: id('inv'),
      restaurantId,
      shiftId,
      freelancerId: f2.id,
      status: 'sent',
      expiresAt: new Date(now.getTime() - 10 * 60 * 1000),
      createdAt: now,
    },
    // Canceled
    {
      id: id('inv'),
      restaurantId,
      shiftId,
      freelancerId: f3.id,
      status: 'canceled',
      expiresAt: new Date(now.getTime() - 5 * 60 * 1000),
      createdAt: now,
    },
  ])

  console.log('Seed OK')
  console.log({ restaurantId, shiftId })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
