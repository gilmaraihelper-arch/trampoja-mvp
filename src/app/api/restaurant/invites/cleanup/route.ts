import { NextResponse } from 'next/server'

import { and, eq, lt } from 'drizzle-orm'

import { db } from '@/db/client'
import { ensureDbReady } from '@/db/init'
import { invites } from '@/db/schema'

export async function POST(req: Request) {
  await ensureDbReady()

  const body = (await req.json().catch(() => ({}))) as {
    restaurantId?: string
  }

  const restaurantId = body.restaurantId || 'rest_1001'
  const now = new Date()

  // Mark expired invites
  await db
    .update(invites)
    .set({ status: 'expired' })
    .where(and(eq(invites.restaurantId, restaurantId), lt(invites.expiresAt, now)))

  return NextResponse.json({ ok: true })
}
