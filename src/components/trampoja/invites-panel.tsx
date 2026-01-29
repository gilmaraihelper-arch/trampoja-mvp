'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/tailwind'

type InviteRow = {
  id?: string
  freelancerId: string
  status: string
  expiresAt: string
  createdAt?: string
}

type Freelancer = {
  id: string
  name: string
  rating: number
  reliability: number
}

type Props = {
  restaurantId: string
  shiftId: string
  freelancers: Freelancer[]
}

function labelForStatus(status: string, isActive: boolean) {
  if (status === 'sent') return isActive ? 'Ativo' : 'Expirado'
  if (status === 'canceled') return 'Rescindido'
  if (status === 'accepted') return 'Aceito'
  if (status === 'declined') return 'Recusado'
  if (status === 'expired') return 'Expirado'
  return status
}

export function InvitesPanel({ restaurantId, shiftId, freelancers }: Props) {
  const [pending, startTransition] = useTransition()
  const [invites, setInvites] = useState<InviteRow[]>([])
  const [nowMs, setNowMs] = useState(() => Date.now())

  const freelancersById = useMemo(() => {
    const m = new Map<string, Freelancer>()
    freelancers.forEach((f) => m.set(f.id, f))
    return m
  }, [freelancers])

  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 30_000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function refresh() {
      const res = await fetch(
        `/api/restaurant/invites/list?restaurantId=${encodeURIComponent(restaurantId)}&shiftId=${encodeURIComponent(shiftId)}`,
      )
      if (!res.ok) return

      const data = (await res.json()) as { invites: InviteRow[] }
      if (!cancelled) setInvites(data.invites || [])
    }

    refresh().catch(() => null)
    const t = setInterval(() => refresh().catch(() => null), 30_000)

    const onInv = () => refresh().catch(() => null)
    window.addEventListener('trampoja:invites-updated', onInv)

    return () => {
      cancelled = true
      clearInterval(t)
      window.removeEventListener('trampoja:invites-updated', onInv)
    }
  }, [restaurantId, shiftId])

  function minutesToExpire(expiresAtIso: string) {
    const ms = Date.parse(expiresAtIso) - nowMs
    return Math.max(0, Math.ceil(ms / 60000))
  }

  const rows = useMemo(() => {
    return (invites || []).map((inv) => {
      const exp = Date.parse(inv.expiresAt)
      const isActive =
        inv.status === 'sent' && Number.isFinite(exp) && exp > nowMs
      return { ...inv, isActive }
    })
  }, [invites, nowMs])

  async function rescind(freelancerId: string) {
    startTransition(async () => {
      await fetch('/api/restaurant/invites/rescind', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId, shiftId, freelancerId }),
      })

      window.dispatchEvent(new Event('trampoja:invites-updated'))
    })
  }

  async function resend(freelancerId: string) {
    startTransition(async () => {
      await fetch('/api/restaurant/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId, shiftId, freelancerId }),
      })

      window.dispatchEvent(new Event('trampoja:invites-updated'))
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Convites</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows.length ? (
          rows.map((inv) => {
            const f = freelancersById.get(inv.freelancerId)
            const statusLabel = labelForStatus(inv.status, inv.isActive)
            const expMin = inv.isActive ? minutesToExpire(inv.expiresAt) : null

            const canRescind = inv.isActive
            const canResend =
              !inv.isActive &&
              ['sent', 'expired', 'canceled', 'declined'].includes(inv.status)

            return (
              <div
                key={`${inv.freelancerId}-${inv.expiresAt}-${inv.status}`}
                className="flex flex-col gap-3 rounded-xl border p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="font-medium">
                    {f?.name || inv.freelancerId}
                  </div>
                  {f ? (
                    <div className="text-muted-foreground text-xs">
                      ⭐ {(f.rating / 10).toFixed(1)} • Confiabilidade{' '}
                      {f.reliability}%
                    </div>
                  ) : null}

                  <div className="mt-1 text-xs">
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5',
                        inv.isActive
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {statusLabel}
                    </span>
                    {inv.isActive && expMin !== null ? (
                      <span className="text-muted-foreground ml-2">
                        expira em {expMin} min
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-2">
                  {canResend ? (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={pending}
                      onClick={() => resend(inv.freelancerId)}
                    >
                      Reenviar
                    </Button>
                  ) : null}
                  {canRescind ? (
                    <Button
                      size="sm"
                      disabled={pending}
                      onClick={() => rescind(inv.freelancerId)}
                    >
                      Rescindir
                    </Button>
                  ) : null}
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-muted-foreground text-sm">
            Nenhum convite ainda para este plantão.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
