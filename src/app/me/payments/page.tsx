import { AppShell } from '@/components/trampoja/app-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MyPaymentsPage() {
  return (
    <AppShell>
      <h1 className="text-3xl font-semibold tracking-tight">Pagamentos</h1>
      <p className="text-muted-foreground mt-2">Mock por enquanto.</p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-base">Histórico</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Aqui entram pagamentos concluídos e pendentes (PIX). Quando o Supabase
          voltar, conectamos com os registros reais.
        </CardContent>
      </Card>
    </AppShell>
  )
}
