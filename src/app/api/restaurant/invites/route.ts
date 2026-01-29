import { NextResponse } from 'next/server'

import { db } from '@/db/client'
import { ensureDbReady } from '@/db/init'
import { and, eq, gt } from 'drizzle-orm'

import { invites } from '@/db/schema'

function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

export async function POST(req: Request) {
  await ensureDbReady()
  const body = (await req.json()) as {
    restaurantId: string
    shiftId: string
    freelancerId: string
  }

  if (!body?.restaurantId || !body?.shiftId || !body?.freelancerId) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }

  const now = new Date()

  // Avoid duplicates: if there is already an active invite, do nothing
  const existing = await db
    .select()
    .from(invites)
    .where(
      and(
        eq(invites.shiftId, body.shiftId),
        eq(invites.freelancerId, body.freelancerId),
        gt(invites.expiresAt, now)
      )
    )
    .limit(1)

  if (existing.length) {
    return NextResponse.json({ ok: true, alreadyInvited: true })
  }

  const id = makeId('inv')
  const expiresAt = new Date(now.getTime() + 60 * 60 * 1000)

  await db
    .insert(invites)
    .values({
      id,
      restaurantId: body.restaurantId,
      shiftId: body.shiftId,
      freelancerId: body.freelancerId,
      status: 'sent',
      expiresAt,
      createdAt: now,
    })
    .onConflictDoNothing()

  return NextResponse.json({ ok: true, expiresAt })
}
