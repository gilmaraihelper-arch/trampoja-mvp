import Link from 'next/link'

import { AppShell } from '@/components/trampoja/app-shell'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function HomePage() {
  return (
    <AppShell>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Plantões avulsos. Rápido. Sem enrolação.
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-base">
            O TrampoJá conecta freelancers a restaurantes para turnos avulsos.
            Começando por Curitiba. Este é o bloco 1 do MVP (Freelancer): Home,
            feed e candidatura.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/gigs">Ver vagas</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/gigs">Como funciona</Link>
            </Button>
          </div>

          <div className="text-muted-foreground mt-6 text-sm">
            Pagamento fora do app no MVP (Pix/dinheiro). Supabase entra no
            próximo bloco.
          </div>
        </div>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-base">
              MVP Freelancer — Escopo (agora)
            </CardTitle>
            <CardDescription>
              Entrega com calma, bem feita, com visual premium.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>1) Tema (Tailwind + shadcn)</span>
              <span className="text-muted-foreground">em andamento</span>
            </div>
            <div className="flex items-center justify-between">
              <span>2) Home</span>
              <span className="text-muted-foreground">preview</span>
            </div>
            <div className="flex items-center justify-between">
              <span>3) Feed de vagas</span>
              <span className="text-muted-foreground">preview</span>
            </div>
            <div className="flex items-center justify-between">
              <span>4) Detalhe + Candidatar</span>
              <span className="text-muted-foreground">preview</span>
            </div>
            <div className="text-muted-foreground pt-2 text-xs">
              Próximo: login + candidaturas persistidas no Supabase (quando você
              criar o projeto).
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
