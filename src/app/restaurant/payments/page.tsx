import { RestaurantShell } from '@/components/trampoja/restaurant-shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function RestaurantPaymentsPage() {
  return (
    <RestaurantShell>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Validação & Pagamentos
        </h1>
        <p className="text-muted-foreground mt-2">
          Nesta fase: lista mock. No Supabase vamos registrar execução,
          validação e pagamento.
        </p>
      </div>

      <div className="mt-8 grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pendências</CardTitle>
            <CardDescription>Exemplo de como vai ficar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <div className="font-medium">Garçom — Sexta (jantar)</div>
                <div className="text-muted-foreground text-sm">
                  Ana Souza • Check-out enviado
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Aguardando validação</Badge>
                <Badge variant="secondary">PIX</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </RestaurantShell>
  )
}
