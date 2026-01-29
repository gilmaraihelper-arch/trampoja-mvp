import { NextResponse } from 'next/server'

import { eq } from 'drizzle-orm'

import { db } from '@/db/client'
import { ensureDbReady } from '@/db/init'
import { favorites } from '@/db/schema'

export async function GET(req: Request) {
  await ensureDbReady()

  const { searchParams } = new URL(req.url)
  const restaurantId = searchParams.get('restaurantId') || 'rest_1001'

  const rows = await db
    .select()
    .from(favorites)
    .where(eq(favorites.restaurantId, restaurantId))

  return NextResponse.json({ ok: true, favorites: rows })
}
