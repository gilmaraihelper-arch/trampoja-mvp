import Link from 'next/link'

import { RestaurantShell } from '@/components/trampoja/restaurant-shell'
import { restaurantShifts } from '@/mocks/restaurant'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDateTime } from '@/utils/format'

function statusLabel(status: string) {
  if (status === 'open') return 'Aberto'
  if (status === 'closed') return 'Fechado'
  if (status === 'canceled') return 'Cancelado'
  return status
}

export default function RestaurantShiftsPage() {
  return (
    <RestaurantShell>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Plantões</h1>
          <p className="text-muted-foreground mt-2">
            Lista e status dos plantões publicados.
          </p>
        </div>
        <Button asChild>
          <Link href="/restaurant/shifts/new">Criar plantão</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {restaurantShifts.map((s) => (
          <Link
            key={s.id}
            href={`/restaurant/shifts/${s.id}`}
            className="group"
          >
            <Card className="transition-shadow group-hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">{s.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {s.neighborhood ?? 'Curitiba'}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{statusLabel(s.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-2 text-sm">
                <div>
                  {formatDateTime(s.startsAt)} → {formatDateTime(s.endsAt)}
                </div>
                <div>
                  Vagas:{' '}
                  <span className="text-foreground font-medium">
                    {s.filled}
                  </span>
                  /{s.headcount}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </RestaurantShell>
  )
}
