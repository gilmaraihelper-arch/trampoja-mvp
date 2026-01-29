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
import { formatDateTime } from '@/utils/format'

type PageProps = {
  params: { id: string }
}

export default async function RestaurantShiftDetailPage({ params }: PageProps) {
  const { id } = params
  const shift = restaurantShifts.find((s) => s.id === id)
  if (!shift) return notFound()

  const applicants = applicantsByShift[id] ?? []

  return (
    <RestaurantShell>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">{shift.title}</h1>
        <Button asChild variant="ghost">
          <Link href="/restaurant/shifts">← Voltar</Link>
        </Button>
      </div>

      <p className="text-muted-foreground mt-2">
        {shift.neighborhood ?? 'Curitiba'} • {formatDateTime(shift.startsAt)} →{' '}
        {formatDateTime(shift.endsAt)}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
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
                  className="flex items-start justify-between gap-4 rounded-lg border p-4"
                >
                  <div>
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
                  <div className="flex flex-col gap-2">
                    <Badge variant="outline">{a.status}</Badge>
                    <FavoriteInviteActions
                      restaurantId="rest_1001"
                      shiftId={id}
                      freelancerId={a.id}
                    />
                    <Button size="sm" disabled>
                      Aprovar
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      Rejeitar
                    </Button>
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
      </div>
    </RestaurantShell>
  )
}
