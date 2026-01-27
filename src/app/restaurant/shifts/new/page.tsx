import Link from 'next/link'

import { RestaurantShell } from '@/components/trampoja/restaurant-shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function RestaurantShiftNewPage() {
  return (
    <RestaurantShell>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Criar plantão</h1>
        <Button asChild variant="ghost">
          <Link href="/restaurant/shifts">← Voltar</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Dados do plantão</CardTitle>
            <CardDescription>
              Mock por enquanto. Quando o Supabase voltar, este form vai gravar
              no banco.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Título</Label>
              <Input placeholder="Ex: Garçom — Terça (almoço)" />
            </div>
            <div className="grid gap-2">
              <Label>Bairro</Label>
              <Input placeholder="Centro" />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>Início</Label>
                <Input placeholder="2026-02-10 11:00" />
              </div>
              <div className="grid gap-2">
                <Label>Fim</Label>
                <Input placeholder="2026-02-10 16:00" />
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="grid gap-2">
                <Label>R$/hora</Label>
                <Input placeholder="24" />
              </div>
              <div className="grid gap-2">
                <Label>Bônus</Label>
                <Input placeholder="10" />
              </div>
              <div className="grid gap-2">
                <Label>Vagas</Label>
                <Input placeholder="2" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Tags (separe por vírgula)</Label>
              <Input placeholder="Uniforme, Pontualidade" />
            </div>
            <Button disabled>Salvar (mock)</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Próximo</CardTitle>
            <CardDescription>Depois de criar:</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Ver candidatos e aprovar/rejeitar. Depois validamos pagamento.
          </CardContent>
        </Card>
      </div>
    </RestaurantShell>
  )
}
