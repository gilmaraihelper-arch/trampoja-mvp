'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'

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

  const freelancersById = useMemo(() => {
    const m = new Map<string, Freelancer>()
    freelancers.forEach((f) => m.set(f.id, f))
    return m
  }, [freelancers])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const res = await fetch(
        `/api/restaurant/favorites/list?restaurantId=${encodeURIComponent(restaurantId)}`
      )
      const data = (await res.json()) as { favorites: FavoriteRow[] }
      if (!cancelled) setFavorites(data.favorites || [])
    })()
    return () => {
      cancelled = true
    }
  }, [restaurantId])

  const favoriteIds = useMemo(
    () => favorites.map((f) => f.freelancerId),
    [favorites]
  )

  const selectedIds = useMemo(
    () => favoriteIds.filter((id) => selected[id]),
    [favoriteIds, selected]
  )

  function toggleAll(on: boolean) {
    const next: Record<string, boolean> = {}
    favoriteIds.forEach((id) => {
      next[id] = on
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
      <CardContent className="space-y-4">
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
                    </span>

                    <Checkbox
                      checked={!!selected[fid]}
                      onCheckedChange={(v) =>
                        setSelected((s) => ({ ...s, [fid]: !!v }))
                      }
                    />
                  </label>
                )
              })}
            </div>

            <Button
              type="button"
              className="w-full"
              disabled={pending || selectedIds.length === 0}
              onClick={sendInvites}
            >
              Enviar convites ({selectedIds.length})
            </Button>

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
