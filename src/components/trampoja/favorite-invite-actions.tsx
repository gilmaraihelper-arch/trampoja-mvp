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
    | 'idle'
    | 'active'
    | 'expired'
    | 'canceled'
    | 'accepted'
    | 'declined'
    | 'error'
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
        `/api/restaurant/invites/list?restaurantId=${encodeURIComponent(restaurantId)}&shiftId=${encodeURIComponent(shiftId)}`,
      )
      if (!res.ok) return

      const data = (await res.json()) as {
        invites: Array<{
          freelancerId: string
          expiresAt: string
          status: string
        }>
      }

      const inv = (data.invites || []).find(
        (i) => i.freelancerId === freelancerId,
      )

      if (!inv) {
        if (!cancelled) {
          setExpiresAt(null)
          setInvStatus('idle')
        }
        return
      }

      const expMs = Date.parse(inv.expiresAt)
      const isActive =
        inv.status === 'sent' && Number.isFinite(expMs) && expMs > Date.now()

      if (!cancelled) {
        setExpiresAt(inv.expiresAt)

        if (inv.status === 'sent') setInvStatus(isActive ? 'active' : 'expired')
        else if (inv.status === 'canceled') setInvStatus('canceled')
        else if (inv.status === 'accepted') setInvStatus('accepted')
        else if (inv.status === 'declined') setInvStatus('declined')
        else if (inv.status === 'expired') setInvStatus('expired')
        else setInvStatus('idle')
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
    [pending, favDone, invStatus],
  )

  const canInvite =
    invStatus === 'idle' || invStatus === 'expired' || invStatus === 'canceled'
  const canRescind = invStatus === 'active'

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
        setExpiresAt(data.expiresAt)
        setInvStatus('active')
        window.dispatchEvent(new Event('trampoja:invites-updated'))
        return
      }

      setInvStatus(data.alreadyInvited ? 'active' : 'idle')
      window.dispatchEvent(new Event('trampoja:invites-updated'))
    })
  }

  async function rescind() {
    startTransition(async () => {
      const res = await fetch('/api/restaurant/invites/rescind', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId, shiftId, freelancerId }),
      })

      if (!res.ok) {
        setInvStatus('error')
        return
      }

      setInvStatus('canceled')
      setExpiresAt(null)
      window.dispatchEvent(new Event('trampoja:invites-updated'))
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
        <div className="flex gap-2">
          <Button size="sm" disabled={disabled || !canInvite} onClick={invite}>
            {invStatus === 'expired'
              ? 'Reenviar'
              : invStatus === 'canceled'
                ? 'Reenviar'
                : invStatus === 'idle'
                  ? 'Convidar'
                  : invStatus === 'active'
                    ? 'Já convidado'
                    : 'Convidar'}
          </Button>

          {canRescind ? (
            <Button
              size="sm"
              variant="outline"
              disabled={disabled}
              onClick={rescind}
            >
              Rescindir
            </Button>
          ) : null}
        </div>

        {invStatus === 'active' && expiresAt ? (
          <div className="text-muted-foreground text-[11px]">
            Já convidado • expira em {minutesToExpire(expiresAt)} min
          </div>
        ) : invStatus === 'expired' ? (
          <div className="text-muted-foreground text-[11px]">
            Convite expirado
          </div>
        ) : invStatus === 'canceled' ? (
          <div className="text-muted-foreground text-[11px]">
            Convite rescindido
          </div>
        ) : invStatus === 'accepted' ? (
          <div className="text-muted-foreground text-[11px]">
            Convite aceito
          </div>
        ) : invStatus === 'declined' ? (
          <div className="text-muted-foreground text-[11px]">
            Convite recusado
          </div>
        ) : null}
      </div>
    </div>
  )
}
