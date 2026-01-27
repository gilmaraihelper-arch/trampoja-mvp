import Link from 'next/link'

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

export default function RestaurantApplicantsPage() {
  const shift = restaurantShifts[0]
  const applicants = applicantsByShift[shift.id] ?? []

  return (
    <RestaurantShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Candidatos</h1>
          <p className="text-muted-foreground mt-2">
            Visão geral (mock) por plantão.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/restaurant/shifts/${shift.id}`}>Ver plantão</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{shift.title}</CardTitle>
            <CardDescription>Mock por enquanto.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {applicants.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between gap-4 rounded-lg border p-4"
              >
                <div>
                  <div className="font-medium">{a.name}</div>
                  <div className="text-muted-foreground text-sm">
                    ⭐ {a.rating} • Confiabilidade {a.reliability}%
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{a.status}</Badge>
                  <Button size="sm" disabled>
                    Aprovar
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </RestaurantShell>
  )
}
