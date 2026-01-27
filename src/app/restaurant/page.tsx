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
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Restaurante — {restaurant.name}
          </h1>
          <p className="text-muted-foreground mt-2">
            Painel do MVP para publicar plantões, avaliar candidatos e validar
            pagamentos.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/restaurant/shifts">Plantões</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/restaurant/shifts/new">Criar plantão</Link>
            </Button>
          </div>
        </div>

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
