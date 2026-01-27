import { AppShell } from '@/components/trampoja/app-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MyShiftsPage() {
  return (
    <AppShell>
      <h1 className="text-3xl font-semibold tracking-tight">
        Plantões confirmados
      </h1>
      <p className="text-muted-foreground mt-2">Mock por enquanto.</p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-base">Em breve</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Lista de plantões aprovados + check-in/checkout + avaliação.
        </CardContent>
      </Card>
    </AppShell>
  )
}
