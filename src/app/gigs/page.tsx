import Link from 'next/link'

import { AppShell } from '@/components/trampoja/app-shell'
import { gigs } from '@/mocks/gigs'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatBRL, formatDateTime, estimateTotalPay } from '@/utils/format'

export default function GigsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Vagas em Curitiba
          </h1>
          <p className="text-muted-foreground mt-2">
            Turnos avulsos com pagamento combinado. (Por enquanto: dados mock —
            Supabase entra no próximo bloco.)
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {gigs.map((g) => {
            const total = estimateTotalPay({
              payPerHour: g.payPerHour,
              bonus: g.bonus,
              startsAt: g.startsAt,
              endsAt: g.endsAt,
            })

            return (
              <Link key={g.id} href={`/gigs/${g.id}`} className="group">
                <Card className="transition-shadow group-hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-base">{g.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {g.restaurantName} •{' '}
                          {g.neighborhood ? `${g.neighborhood} • ` : ''}
                          {g.city}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">
                        {formatBRL(g.payPerHour)}/h
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-muted-foreground text-sm">
                      {formatDateTime(g.startsAt)} → {formatDateTime(g.endsAt)}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">
                        Total estimado {formatBRL(total)}
                      </Badge>
                      {g.bonus ? (
                        <Badge variant="outline">
                          Bônus {formatBRL(g.bonus)}
                        </Badge>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {g.tags.slice(0, 3).map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="font-medium"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
