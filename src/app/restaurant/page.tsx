import Link from 'next/link'

import { RestaurantShell } from '@/components/trampoja/restaurant-shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { restaurant, restaurantShifts } from '@/mocks/restaurant'

export default function RestaurantHomePage() {
  const open = restaurantShifts.filter((s) => s.status === 'open').length
  const pending = restaurantShifts.filter(
    (s) => s.filled < s.headcount && s.status === 'open',
  ).length

  return (
    <RestaurantShell>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
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
              Restaurante — {restaurant.name}
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Painel do MVP para publicar plantões, avaliar candidatos e validar
              pagamentos.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="px-7">
                <Link href="/restaurant/shifts">Plantões</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-7">
                <Link href="/restaurant/shifts/new">Criar plantão</Link>
              </Button>
            </div>
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Resumo</CardTitle>
            <CardDescription>
              Mock por enquanto (Supabase entra depois da manutenção).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Plantões abertos</span>
              <span className="font-medium">{open}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Vagas pendentes (abertas)</span>
              <span className="font-medium">{pending}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Cidade</span>
              <span className="font-medium">{restaurant.city}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </RestaurantShell>
  )
}
