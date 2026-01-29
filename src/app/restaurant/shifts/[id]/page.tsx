import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RestaurantShell } from '@/components/trampoja/restaurant-shell'
import { applicantsByShift, restaurantShifts } from '@/mocks/restaurant'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FavoriteInviteActions } from '@/components/trampoja/favorite-invite-actions'
import { InviteFavoritesPanel } from '@/components/trampoja/invite-favorites-panel'
import { InvitesPanel } from '@/components/trampoja/invites-panel'
import { formatDateTime } from '@/utils/format'

type PageProps = {
  params: Promise<{ id: string }> | { id: string }
}

export default async function RestaurantShiftDetailPage({ params }: PageProps) {
  const resolved = await Promise.resolve(params)
  const { id } = resolved
  const shift = restaurantShifts.find((s) => s.id === id)
  if (!shift) return notFound()

  const applicants = applicantsByShift[id] ?? []
  const freelancers = applicants.map((a) => ({
    id: a.id,
    name: a.name,
    rating: Math.round(a.rating * 10),
    reliability: a.reliability,
  }))

  return (
    <RestaurantShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {shift.title}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:mt-2 sm:text-base">
            {shift.neighborhood ?? 'Curitiba'} •{' '}
            {formatDateTime(shift.startsAt)} → {formatDateTime(shift.endsAt)}
          </p>
        </div>

        <Button asChild variant="ghost" className="self-start sm:self-auto">
          <Link href="/restaurant/shifts">← Voltar</Link>
        </Button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Candidatos</CardTitle>
            <CardDescription>Mock por enquanto.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {applicants.length ? (
              applicants.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="font-medium">{a.name}</div>
                    <div className="text-muted-foreground text-sm">
                      ⭐ {a.rating} • Confiabilidade {a.reliability}%
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {a.skills.slice(0, 3).map((s) => (
                        <Badge
                          key={s}
                          variant="secondary"
                          className="font-medium"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                    {a.note ? (
                      <div className="text-muted-foreground mt-2 text-sm">
                        “{a.note}”
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2 sm:min-w-[180px]">
                    <div className="flex items-center justify-between sm:justify-end">
                      <Badge variant="outline">{a.status}</Badge>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1">
                        <FavoriteInviteActions
                          restaurantId="rest_1001"
                          shiftId={id}
                          freelancerId={a.id}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" disabled>
                        Aprovar
                      </Button>
                      <Button size="sm" variant="outline" disabled>
                        Rejeitar
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground text-sm">
                Sem candidatos ainda.
              </div>
            )}
          </CardContent>
        </Card>

        <div className="order-first space-y-6 lg:order-none">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resumo</CardTitle>
              <CardDescription>Status e vagas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Status</span>
                <Badge variant="secondary">{shift.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Vagas</span>
                <span className="font-medium">
                  {shift.filled}/{shift.headcount}
                </span>
              </div>
            </CardContent>
          </Card>

          <InviteFavoritesPanel
            restaurantId="rest_1001"
            shiftId={id}
            freelancers={freelancers}
          />

          <InvitesPanel
            restaurantId="rest_1001"
            shiftId={id}
            freelancers={freelancers}
          />
        </div>
      </div>
    </RestaurantShell>
  )
}
