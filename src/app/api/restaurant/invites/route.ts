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

  // If there is already an active invite, do nothing.
  const activeExisting = await db
    .select({ id: invites.id })
    .from(invites)
    .where(
      and(
        eq(invites.shiftId, body.shiftId),
        eq(invites.freelancerId, body.freelancerId),
        eq(invites.status, 'sent'),
        gt(invites.expiresAt, now),
      ),
    )
    .limit(1)

  if (activeExisting.length) {
    return NextResponse.json({ ok: true, alreadyInvited: true })
  }

  // Reuse the same row when possible (unique per shift+freelancer).
  const existingAny = await db
    .select({ id: invites.id, status: invites.status })
    .from(invites)
    .where(
      and(
        eq(invites.shiftId, body.shiftId),
        eq(invites.freelancerId, body.freelancerId),
      ),
    )
    .limit(1)

  const expiresAt = new Date(now.getTime() + 60 * 60 * 1000)

  if (existingAny.length) {
    const row = existingAny[0]

    // If already accepted, do not allow re-inviting (for now).
    if (row.status === 'accepted') {
      return NextResponse.json(
        { ok: false, error: 'already accepted' },
        { status: 409 },
      )
    }

    await db
      .update(invites)
      .set({
        restaurantId: body.restaurantId,
        status: 'sent',
        expiresAt,
        createdAt: now,
      })
      .where(eq(invites.id, row.id))

    return NextResponse.json({ ok: true, expiresAt })
  }

  const id = makeId('inv')

  await db.insert(invites).values({
    id,
    restaurantId: body.restaurantId,
    shiftId: body.shiftId,
    freelancerId: body.freelancerId,
    status: 'sent',
    expiresAt,
    createdAt: now,
  })

  return NextResponse.json({ ok: true, expiresAt })
}
