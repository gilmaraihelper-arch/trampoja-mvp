import { NextResponse } from 'next/server'

import { db } from '@/db/client'
import { ensureDbReady } from '@/db/init'
import { favorites } from '@/db/schema'

function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

export async function POST(req: Request) {
  await ensureDbReady()
  const body = (await req.json()) as {
    restaurantId: string
    freelancerId: string
  }

  if (!body?.restaurantId || !body?.freelancerId) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }

  const id = makeId('fav')
  await db.insert(favorites).values({
    id,
    restaurantId: body.restaurantId,
    freelancerId: body.freelancerId,
    createdAt: new Date(),
  })

  return NextResponse.json({ ok: true, id })
}
