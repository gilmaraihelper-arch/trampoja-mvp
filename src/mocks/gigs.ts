export type Gig = {
  id: string
  title: string
  restaurantName: string
  city: string
  neighborhood?: string
  startsAt: string // ISO
  endsAt: string // ISO
  payPerHour: number
  bonus?: number
  tags: string[]
}

export const gigs: Gig[] = [
  {
    id: 's_1001',
    title: 'Garçom — Sexta (jantar)',
    restaurantName: 'Bistrô do Centro',
    city: 'Curitiba',
    neighborhood: 'Centro',
    startsAt: '2026-02-06T20:00:00.000Z',
    endsAt: '2026-02-07T02:00:00.000Z',
    payPerHour: 22,
    bonus: 25,
    tags: ['Salão', 'Uniforme preto', 'Pontualidade'],
  },
  {
    id: 's_2001',
    title: 'Caixa — Domingo (almoço)',
    restaurantName: 'Cantina Bella',
    city: 'Curitiba',
    neighborhood: 'Batel',
    startsAt: '2026-02-08T14:00:00.000Z',
    endsAt: '2026-02-08T19:00:00.000Z',
    payPerHour: 24,
    bonus: 10,
    tags: ['POS', 'Boa comunicação'],
  },
  {
    id: 's_1002',
    title: 'Bar — Sábado (noite)',
    restaurantName: 'Bistrô do Centro',
    city: 'Curitiba',
    neighborhood: 'Centro',
    startsAt: '2026-02-07T22:00:00.000Z',
    endsAt: '2026-02-08T04:00:00.000Z',
    payPerHour: 26,
    bonus: 0,
    tags: ['Coquetelaria básica', 'Agilidade'],
  },
]
