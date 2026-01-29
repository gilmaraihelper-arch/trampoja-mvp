import { NextResponse } from 'next/server'

import { and, eq, gt } from 'drizzle-orm'

import { db } from '@/db/client'
import { ensureDbReady } from '@/db/init'
import { invites } from '@/db/schema'

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

  // Only rescind active (sent) invites.
  await db
    .update(invites)
    .set({ status: 'canceled', expiresAt: now })
    .where(
      and(
        eq(invites.restaurantId, body.restaurantId),
        eq(invites.shiftId, body.shiftId),
        eq(invites.freelancerId, body.freelancerId),
        eq(invites.status, 'sent'),
        gt(invites.expiresAt, now),
      ),
    )

  return NextResponse.json({ ok: true })
}
