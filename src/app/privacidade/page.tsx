import { MarketingShell } from '@/components/trampoja/marketing-shell'

export default function PrivacyPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">
          Política de privacidade
        </h1>
        <p className="text-muted-foreground mt-3">
          Placeholder do MVP. Aqui entra como coletamos, usamos e protegemos
          dados de freelancers e restaurantes.
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-semibold">Dados coletados</h2>
            <p className="text-muted-foreground mt-2">
              Ex.: nome, contato, cidade, preferências e histórico de convites.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">Uso</h2>
            <p className="text-muted-foreground mt-2">
              Usamos dados para operação do serviço, suporte e melhoria do
              produto.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">Contato</h2>
            <p className="text-muted-foreground mt-2">
              Em caso de dúvidas, fale conosco na página de contato.
            </p>
          </section>
        </div>
      </div>
    </MarketingShell>
  )
}
