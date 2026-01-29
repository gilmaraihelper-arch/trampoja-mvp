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
        <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-orange-50 via-background to-emerald-50/60 px-6 py-8 md:px-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />
          <div className="relative">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Vagas em Curitiba
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Turnos avulsos com pagamento combinado (Pix/dinheiro). No MVP:
              dados mock — Supabase entra no próximo bloco.
            </p>
          </div>
        </section>

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
                <Card className="transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
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
