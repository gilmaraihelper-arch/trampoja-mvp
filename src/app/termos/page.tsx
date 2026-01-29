import { MarketingShell } from '@/components/trampoja/marketing-shell'

export default function TermsPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Termos de uso</h1>
        <p className="text-muted-foreground mt-3">
          Esta é uma página de placeholder para o MVP do TrampoJá. Aqui entram
          as regras de uso, responsabilidades, pagamentos e política de
          cancelamento.
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-semibold">1. Objetivo</h2>
            <p className="text-muted-foreground mt-2">
              O TrampoJá conecta freelancers a restaurantes para turnos avulsos.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">2. Pagamentos</h2>
            <p className="text-muted-foreground mt-2">
              No MVP, pagamentos podem ocorrer fora da plataforma (ex.: Pix). No
              produto final, definiremos regras e confirmação de serviço.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">3. Responsabilidades</h2>
            <p className="text-muted-foreground mt-2">
              Cada parte é responsável por cumprir o combinado do turno.
            </p>
          </section>
        </div>
      </div>
    </MarketingShell>
  )
}
