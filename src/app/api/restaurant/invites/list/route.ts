import { NextResponse } from 'next/server'

import { and, eq } from 'drizzle-orm'

import { db } from '@/db/client'
import { ensureDbReady } from '@/db/init'
import { invites } from '@/db/schema'

export async function GET(req: Request) {
  await ensureDbReady()

  const { searchParams } = new URL(req.url)
  const restaurantId = searchParams.get('restaurantId') || 'rest_1001'
  const shiftId = searchParams.get('shiftId')

  const rows = shiftId
    ? await db
        .select()
        .from(invites)
        .where(and(eq(invites.restaurantId, restaurantId), eq(invites.shiftId, shiftId)))
    : await db.select().from(invites).where(eq(invites.restaurantId, restaurantId))

  return NextResponse.json({ ok: true, invites: rows })
}
