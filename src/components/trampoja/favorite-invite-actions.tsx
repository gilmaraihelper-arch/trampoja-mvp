'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'

type Props = {
  restaurantId: string
  shiftId: string
  freelancerId: string
}

export function FavoriteInviteActions({
  restaurantId,
  shiftId,
  freelancerId,
}: Props) {
  const [pending, startTransition] = useTransition()
  const [favDone, setFavDone] = useState(false)
  const [invStatus, setInvStatus] = useState<
    'idle' | 'sent' | 'alreadyInvited' | 'error'
  >('idle')
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [nowMs, setNowMs] = useState(() => Date.now())

  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 30_000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      const res = await fetch(
        `/api/restaurant/invites/list?restaurantId=${encodeURIComponent(restaurantId)}&shiftId=${encodeURIComponent(shiftId)}`
      )
      if (!res.ok) return

      const data = (await res.json()) as {
        invites: Array<{ freelancerId: string; expiresAt: string; status: string }>
      }

      const inv = (data.invites || []).find(
        (i) => i.freelancerId === freelancerId && i.status === 'sent'
      )

      if (!inv) {
        if (!cancelled) {
          setExpiresAt(null)
          setInvStatus('idle')
        }
        return
      }

      const expMs = Date.parse(inv.expiresAt)
      const active = Number.isFinite(expMs) && expMs > Date.now()

      if (!cancelled) {
        setExpiresAt(inv.expiresAt)
        setInvStatus(active ? 'alreadyInvited' : 'idle')
      }
    }

    load().catch(() => null)
    const interval = setInterval(() => load().catch(() => null), 30_000)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [restaurantId, shiftId, freelancerId])

  function minutesToExpire(expiresAtIso: string) {
    const ms = Date.parse(expiresAtIso) - nowMs
    return Math.max(0, Math.ceil(ms / 60000))
  }

  const disabled = useMemo(
    () => pending || (favDone && invStatus !== 'idle'),
    [pending, favDone, invStatus]
  )

  async function favorite() {
    startTransition(async () => {
      const res = await fetch('/api/restaurant/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId, freelancerId }),
      })

      if (res.ok) {
        setFavDone(true)
        window.dispatchEvent(new Event('trampoja:favorites-updated'))
      }
    })
  }

  async function invite() {
    startTransition(async () => {
      const res = await fetch('/api/restaurant/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId, shiftId, freelancerId }),
      })

      if (!res.ok) {
        setInvStatus('error')
        return
      }

      const data = (await res.json()) as {
        alreadyInvited?: boolean
        expiresAt?: string
      }

      if (data.expiresAt) {
        // If the API returns expiresAt, it is an active invite → show the same UI as "already invited"
        setExpiresAt(data.expiresAt)
        setInvStatus('alreadyInvited')
        return
      }

      setInvStatus(data.alreadyInvited ? 'alreadyInvited' : 'sent')
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        size="sm"
        variant={favDone ? 'secondary' : 'outline'}
        disabled={disabled || favDone}
        onClick={favorite}
      >
        {favDone ? 'Favoritado' : 'Favoritar'}
      </Button>

      <div className="space-y-1">
        <Button
          size="sm"
          disabled={
            disabled || invStatus === 'sent' || invStatus === 'alreadyInvited'
          }
          onClick={invite}
        >
          {invStatus === 'alreadyInvited'
            ? 'Já convidado'
            : invStatus === 'sent'
              ? 'Convidado'
              : 'Convidar'}
        </Button>

        {invStatus === 'alreadyInvited' && expiresAt ? (
          <div className="text-muted-foreground text-[11px]">
            Já convidado • expira em {minutesToExpire(expiresAt)} min
          </div>
        ) : null}
      </div>
    </div>
  )
}
