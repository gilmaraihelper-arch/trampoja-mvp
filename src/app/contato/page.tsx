import Link from 'next/link'

import { MarketingShell } from '@/components/trampoja/marketing-shell'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Contato</h1>
        <p className="text-muted-foreground mt-3">
          Quer falar com a equipe do TrampoJá? No MVP, o canal mais rápido é
          WhatsApp.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="px-7">
            <Link
              href="https://wa.me/554188397967"
              target="_blank"
              rel="noreferrer"
            >
              Falar no WhatsApp
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="px-7">
            <Link href="mailto:contato@trampoja.com">Enviar e-mail</Link>
          </Button>
        </div>

        <div className="text-muted-foreground mt-10 text-sm">
          Horário: 09:00–18:00 (BRT)
        </div>
      </div>
    </MarketingShell>
  )
}
