import { db } from '@/db/client'
import { ensureDbReady } from '@/db/init'
import { favorites, freelancers } from '@/db/schema'
import { RestaurantShell } from '@/components/trampoja/restaurant-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function RestaurantFavoritesPage() {
  await ensureDbReady()

  // MVP: single restaurant
  const restaurantId = 'rest_1001'

  const favs = await db.select().from(favorites)
  const people = await db.select().from(freelancers)

  const favIds = new Set(
    favs.filter((f) => f.restaurantId === restaurantId).map((f) => f.freelancerId)
  )

  const list = people.filter((p) => favIds.has(p.id))

  return (
    <RestaurantShell>
      <h1 className="text-3xl font-semibold tracking-tight">Favoritos</h1>
      <p className="text-muted-foreground mt-2">
        Freelancers favoritos do restaurante (SQLite/Drizzle).
      </p>

      <div className="mt-8 grid gap-4">
        {list.length ? (
          list.map((p) => (
            <Card key={p.id}>
              <CardHeader>
                <CardTitle className="text-base">{p.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                ⭐ {(p.rating / 10).toFixed(1)} • Confiabilidade {p.reliability}%
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sem favoritos ainda</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Você pode favoritar um freelancer pela tela de detalhe do plantão.
            </CardContent>
          </Card>
        )}
      </div>
    </RestaurantShell>
  )
}
