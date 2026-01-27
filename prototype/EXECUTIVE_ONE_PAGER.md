# TrampoJá (MVP) — One‑pager executivo (protótipo v1)

## Objetivo do MVP (o que este protótipo prova)
- **Marketplace de plantões** (restaurante publica / freelancer se candidata)
- **Match simples** (aprovar/rejeitar)
- **Execução do serviço** (check‑in/out)
- **Validação e pagamento** (restaurante valida → libera pagamento)

## Fluxos cobertos no protótipo

### 1) Freelancer (mobile/PWA)
- **Início** → CTAs para Plantões / Candidaturas / Carteira
- **Plantões disponíveis**
  - Lista com: horário, local, remuneração/hora, bônus, estimativa total, vagas
  - **Detalhe do plantão** → enviar candidatura com mensagem opcional
- **Minhas candidaturas**
  - Estados: `applied` (pendente), `approved`, `rejected`, `canceled`
  - Ação: cancelar (apenas quando `applied`, regra simplificada)
- **Meus plantões**
  - Aparece quando aprovado
  - Ações: `Check‑in` → `Check‑out`
  - Após check‑out: “aguardando validação do restaurante”
- **Carteira**
  - Saldo e histórico (fake)
  - Após validação do restaurante: saldo incrementa (simulado)

### 2) Restaurante (web/PWA)
- **Painel** com KPIs (abertos/fechados/pendências)
- **Plantões**
  - Criar plantão (form simples) e gerenciar status (`open|closed|canceled`)
- **Candidatos**
  - Selecionar plantão
  - Lista de candidatos (pool fake + Ana quando aplicável)
  - Ação: **Aprovar** → cria/atualiza “work” do freelancer (scheduled)
- **Pagamentos & validação**
  - Lista de execuções (`scheduled|checked_in|completed`) por plantão
  - Ação: **Validar & pagar** (quando `completed`) → marca `paid` e gera pagamento

## Modelo de estados (mínimo necessário)
- **Shift (Plantão)**: `open` | `closed` | `canceled`
- **Application (Candidatura)**: `applied` | `approved` | `rejected` | `canceled`
- **Work (Execução)**: `scheduled` | `checked_in` | `completed` | `no_show`
- **Payment (Pagamento)**: `pending` | `paid`

## Regras de negócio (simplificadas no protótipo)
- Aprovação incrementa `filled` e fecha o plantão ao atingir `headcount`
- Cancelamento pós‑aprovação não está implementado (depende de política)
- Validação só disponível após `completed` (check‑out)

## Próximos passos (produto + técnico)

### Produto
- Geofencing/QR para check‑in/out + janela de tolerância
- Políticas: cancelamento, no‑show, multa, lista de espera, rating/recorrência
- Experiência: chat, notificações, recontratação, “favoritos”

### Pagamentos / Compliance
- Split + PIX automático (ou D+0/D+1), conciliação e recibos
- KYC freelancer / KYB restaurante, antifraude e disputas

### Técnico (MVP real)
- Autenticação, perfis e permissões
- Backend com:
  - `shifts`, `applications`, `work_sessions`, `payments`
  - Webhooks/filas para eventos e notificações
- Observabilidade: logs, auditoria (quem aprovou/validou), métricas funil

## Entregável
- **Protótipo navegável local (PWA‑style)**: `deliverables/trampoja-prototype/index.html`
- Dados fake persistidos via `localStorage` para demonstração
