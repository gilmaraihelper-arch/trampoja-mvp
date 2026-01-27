import { AppShell } from '@/components/trampoja/app-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const items = [
  {
    id: 'ap_1001',
    title: 'Garçom — Sexta (jantar)',
    neighborhood: 'Centro',
    status: 'applied',
  },
  {
    id: 'ap_1002',
    title: 'Bar — Sábado (noite)',
    neighborhood: 'Centro',
    status: 'approved',
  },
]

export default function MyApplicationsPage() {
  return (
    <AppShell>
      <h1 className="text-3xl font-semibold tracking-tight">
        Minhas candidaturas
      </h1>
      <p className="text-muted-foreground mt-2">Mock por enquanto.</p>

      <div className="mt-8 grid gap-4">
        {items.map((it) => (
          <Card key={it.id}>
            <CardHeader className="flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base">{it.title}</CardTitle>
                <div className="text-muted-foreground mt-1 text-sm">
                  {it.neighborhood}
                </div>
              </div>
              <Badge
                variant={it.status === 'approved' ? 'secondary' : 'outline'}
              >
                {it.status}
              </Badge>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Quando o Supabase voltar, aqui vai refletir status real +
              histórico.
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  )
}
