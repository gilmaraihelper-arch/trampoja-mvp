import Link from 'next/link'
import { notFound } from 'next/navigation'

import { AppShell } from '@/components/trampoja/app-shell'
import { ApplyButton } from '@/components/trampoja/apply-button'
import { gigs } from '@/mocks/gigs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatBRL, formatDateTime, estimateTotalPay } from '@/utils/format'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function GigDetailPage({ params }: PageProps) {
  const { id } = await params
  const gig = gigs.find((g) => g.id === id)
  if (!gig) return notFound()

  const total = estimateTotalPay({
    payPerHour: gig.payPerHour,
    bonus: gig.bonus,
    startsAt: gig.startsAt,
    endsAt: gig.endsAt,
  })

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="px-2">
            <Link href="/gigs">← Voltar</Link>
          </Button>
        </div>

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
              {gig.title}
            </h1>
            <p className="text-muted-foreground mt-2">
              {gig.restaurantName} •{' '}
              {gig.neighborhood ? `${gig.neighborhood} • ` : ''}
              {gig.city}
            </p>
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Detalhes</CardTitle>
              <CardDescription>
                O essencial para decidir rápido.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{formatBRL(gig.payPerHour)}/h</Badge>
                <Badge variant="outline">
                  Total estimado {formatBRL(total)}
                </Badge>
                {gig.bonus ? (
                  <Badge variant="outline">Bônus {formatBRL(gig.bonus)}</Badge>
                ) : null}
              </div>

              <div className="rounded-lg border p-4 text-sm">
                <div className="text-muted-foreground">Horário</div>
                <div className="mt-1 font-medium">
                  {formatDateTime(gig.startsAt)} → {formatDateTime(gig.endsAt)}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium">Requisitos / tags</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {gig.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="font-medium">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="text-muted-foreground text-sm">
                Pagamento fora do app (Pix/dinheiro). No MVP real: validação +
                histórico + política de no-show/cancelamento.
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Candidatura</CardTitle>
                <CardDescription>
                  Um clique. Depois evoluímos pra perfil, docs e mensagem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ApplyButton gigId={gig.id} />
                <p className="text-muted-foreground mt-3 text-xs">
                  *Neste preview: salva no navegador. Supabase entra no próximo
                  bloco.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Dica</CardTitle>
                <CardDescription>Quer ser chamado mais rápido?</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Chegue 10–15 min antes, confirme uniforme e deixe claro sua
                experiência.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
