import Link from 'next/link'

import { AppShell } from '@/components/trampoja/app-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function MePage() {
  return (
    <AppShell>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Minha área</h1>
          <p className="text-muted-foreground mt-2">
            Mock do perfil do freelancer (histórico, candidaturas e pagamentos).
          </p>
        </div>
        <Button asChild variant="ghost" className="hidden md:inline-flex">
          <Link href="/gigs">← Voltar</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Confiabilidade</span>
              <span className="font-medium">95%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Avaliação</span>
              <span className="font-medium">4.8</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">Pontual</Badge>
              <Badge variant="secondary">Uniforme ok</Badge>
              <Badge variant="secondary">Salão</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Atalhos</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button asChild variant="secondary" className="justify-start">
              <Link href="/me/applications">Minhas candidaturas</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/me/shifts">Plantões confirmados (mock)</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/me/payments">Pagamentos (mock)</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
