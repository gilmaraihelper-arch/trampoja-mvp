# TrampoJá — Protótipo Navegável (MVP)

Este protótipo é um **SPA (single-page app) com rotas via hash** + **manifest/service worker** (PWA-style) e **dados fake** persistidos em `localStorage`.

## Como abrir (rápido)

### Opção A) Abrir via servidor local (recomendado — PWA/offline funciona melhor)

No Windows (PowerShell) na pasta do workspace:

```powershell
cd C:\Users\Gilmar\clawd\deliverables\trampoja-prototype
npx serve -s . -l 5173
```

Depois abra:

- http://localhost:5173/

> Se `npx serve` não estiver disponível, use qualquer servidor estático (ex: `python -m http.server 5173`).

### Opção B) Abrir o arquivo direto (pode funcionar, mas SW/PWA pode falhar)

Abra:

- `C:\Users\Gilmar\clawd\deliverables\trampoja-prototype\index.html`

## Demo guiada (30–60s)

1. Vá em **Restaurante → Candidatos** e **Aprove** a Ana em um plantão.
2. Troque para **Freelancer** (botão “Perfil” no topo) e vá em **Meus plantões**.
3. Faça **Check-in** → **Check-out**.
4. Volte para **Restaurante → Pagamentos** e clique **Validar & pagar**.
5. Confira em **Freelancer → Carteira**.

## Onde estão os arquivos

- `index.html` — shell
- `styles.css` — UI
- `app.js` — rotas, fake data, ações
- `manifest.webmanifest` + `service-worker.js` — PWA

## Reset do protótipo

Em **Freelancer → Perfil** existe um botão **Resetar protótipo** (limpa `localStorage`).
