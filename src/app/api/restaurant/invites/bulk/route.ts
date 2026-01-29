import { NextResponse } from 'next/server'

import { and, eq, gt, inArray } from 'drizzle-orm'

import { db } from '@/db/client'
import { ensureDbReady } from '@/db/init'
import { invites } from '@/db/schema'

function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

export async function POST(req: Request) {
  await ensureDbReady()

  const body = (await req.json()) as {
    restaurantId: string
    shiftId: string
    freelancerIds: string[]
  }

  if (!body?.restaurantId || !body?.shiftId || !body?.freelancerIds?.length) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }

  const now = new Date()
  const expiresAt = new Date(now.getTime() + 60 * 60 * 1000)

  // Find already-invited (active) to avoid duplicates
  const existing = await db
    .select({ freelancerId: invites.freelancerId })
    .from(invites)
    .where(
      and(
        eq(invites.shiftId, body.shiftId),
        inArray(invites.freelancerId, body.freelancerIds),
        gt(invites.expiresAt, now)
      )
    )

  const already = new Set(existing.map((e) => e.freelancerId))
  const toCreate = body.freelancerIds.filter((id) => !already.has(id))

  if (!toCreate.length) {
    return NextResponse.json({ ok: true, created: 0, skipped: body.freelancerIds.length, expiresAt })
  }

  await db.insert(invites).values(
    toCreate.map((freelancerId) => ({
      id: makeId('inv'),
      restaurantId: body.restaurantId,
      shiftId: body.shiftId,
      freelancerId,
      status: 'sent',
      expiresAt,
      createdAt: now,
    }))
  )

  return NextResponse.json({
    ok: true,
    created: toCreate.length,
    skipped: body.freelancerIds.length - toCreate.length,
    expiresAt,
  })
}
