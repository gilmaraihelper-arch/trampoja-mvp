'use client'

import { useCallback, useEffect, useMemo, useState, useTransition } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

type FavoriteRow = {
  id: string
  restaurantId: string
  freelancerId: string
  createdAt: string
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
  // provide a list so we can render names without another API
  freelancers: Freelancer[]
}

export function InviteFavoritesPanel({
  restaurantId,
  shiftId,
  freelancers,
}: Props) {
  const [pending, startTransition] = useTransition()
  const [favorites, setFavorites] = useState<FavoriteRow[]>([])
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [result, setResult] = useState<string>('')
  const [activeInvites, setActiveInvites] = useState<
    Record<string, { expiresAt: string }>
  >({})

  const freelancersById = useMemo(() => {
    const m = new Map<string, Freelancer>()
    freelancers.forEach((f) => m.set(f.id, f))
    return m
  }, [freelancers])

  const refreshFavorites = useCallback(async () => {
    const res = await fetch(
      `/api/restaurant/favorites/list?restaurantId=${encodeURIComponent(restaurantId)}`
    )
    const data = (await res.json()) as { favorites: FavoriteRow[] }
    setFavorites(data.favorites || [])
  }, [restaurantId])

  const refreshInvites = useCallback(async () => {
    const res = await fetch(
      `/api/restaurant/invites/list?restaurantId=${encodeURIComponent(restaurantId)}&shiftId=${encodeURIComponent(shiftId)}`
    )
    const data = (await res.json()) as {
      invites: Array<{ freelancerId: string; expiresAt: string; status: string }>
    }

    const now = Date.now()
    const active: Record<string, { expiresAt: string }> = {}
    for (const inv of data.invites || []) {
      if (inv.status !== 'sent') continue
      const exp = Date.parse(inv.expiresAt)
      if (!Number.isFinite(exp)) continue
      if (exp > now) active[inv.freelancerId] = { expiresAt: inv.expiresAt }
    }
    setActiveInvites(active)
  }, [restaurantId, shiftId])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      await Promise.all([refreshFavorites(), refreshInvites()])
      if (cancelled) return
    })()

    const t = setInterval(() => {
      refreshInvites().catch(() => null)
    }, 30_000)

    const onFav = () => {
      refreshFavorites().catch(() => null)
    }
    const onInv = () => {
      refreshInvites().catch(() => null)
    }

    window.addEventListener('trampoja:favorites-updated', onFav)
    window.addEventListener('trampoja:invites-updated', onInv)

    return () => {
      cancelled = true
      clearInterval(t)
      window.removeEventListener('trampoja:favorites-updated', onFav)
      window.removeEventListener('trampoja:invites-updated', onInv)
    }
  }, [refreshFavorites, refreshInvites])

  const favoriteIds = useMemo(
    () => favorites.map((f) => f.freelancerId),
    [favorites]
  )

  const selectedIds = useMemo(
    () => favoriteIds.filter((id) => selected[id] && !activeInvites[id]),
    [favoriteIds, selected, activeInvites]
  )

  const [nowMs, setNowMs] = useState(() => Date.now())

  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 30_000)
    return () => clearInterval(t)
  }, [])

  function minutesToExpire(expiresAtIso: string) {
    const ms = Date.parse(expiresAtIso) - nowMs
    return Math.max(0, Math.ceil(ms / 60000))
  }

  function toggleAll(on: boolean) {
    const next: Record<string, boolean> = {}
    favoriteIds.forEach((id) => {
      next[id] = on && !activeInvites[id]
    })
    setSelected(next)
  }

  async function sendInvites() {
    startTransition(async () => {
      setResult('')

      const res = await fetch('/api/restaurant/invites/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId,
          shiftId,
          freelancerIds: selectedIds,
        }),
      })

      if (!res.ok) {
        setResult('Erro ao enviar convites')
        return
      }

      const data = (await res.json()) as {
        created: number
        skipped: number
        expiresAt: string
      }

      await refreshInvites()
      window.dispatchEvent(new Event('trampoja:invites-updated'))
      setSelected({})

      setResult(
        `Convites: ${data.created} enviados · ${data.skipped} já convidados. Expira em 60 min.`
      )
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Convidar favoritos</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {favorites.length ? (
          <>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => toggleAll(true)}
                disabled={pending}
              >
                Convidar todos
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => toggleAll(false)}
                disabled={pending}
              >
                Limpar
              </Button>
            </div>

            <div className="space-y-2">
              {favoriteIds.map((fid) => {
                const f = freelancersById.get(fid)
                const active = activeInvites[fid]
                const minutes = active ? minutesToExpire(active.expiresAt) : null

                return (
                  <label
                    key={fid}
                    className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        {f?.name || fid}
                      </span>
                      {f ? (
                        <span className="text-muted-foreground block text-xs">
                          ⭐ {(f.rating / 10).toFixed(1)} • Confiabilidade {f.reliability}%
                        </span>
                      ) : null}
                      {active ? (
                        <span className="text-muted-foreground mt-1 block text-xs">
                          Já convidado • expira em {minutes} min
                        </span>
                      ) : null}
                    </span>

                    <Checkbox
                      checked={!!selected[fid]}
                      disabled={pending || !!active}
                      onCheckedChange={(v) =>
                        setSelected((s) => ({ ...s, [fid]: !!v }))
                      }
                    />
                  </label>
                )
              })}
            </div>

            <div className="sticky bottom-24 md:bottom-0 -mx-6 mt-2 border-t bg-background px-6 py-3">
              <Button
                type="button"
                className="w-full"
                disabled={pending || selectedIds.length === 0}
                onClick={sendInvites}
              >
                Enviar convites ({selectedIds.length})
              </Button>

              <div className="text-muted-foreground mt-2 text-center text-xs">
                Convites expiram automaticamente em 60 minutos.
              </div>
            </div>

            {result ? (
              <div className="text-muted-foreground text-sm">{result}</div>
            ) : null}
          </>
        ) : (
          <div className="text-muted-foreground text-sm">
            Sem favoritos ainda. Favorite freelancers para convidar em lote.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
