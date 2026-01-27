export type RestaurantShiftStatus = 'open' | 'closed' | 'canceled'

export type RestaurantShift = {
  id: string
  title: string
  neighborhood?: string
  startsAt: string
  endsAt: string
  payPerHour: number
  bonus?: number
  headcount: number
  filled: number
  status: RestaurantShiftStatus
  tags: string[]
}

export type ApplicantStatus = 'applied' | 'approved' | 'rejected'

export type Applicant = {
  id: string
  name: string
  rating: number
  reliability: number
  skills: string[]
  note?: string
  status: ApplicantStatus
}

export const restaurant = {
  name: 'Bistrô do Centro',
  city: 'Curitiba',
}

export const restaurantShifts: RestaurantShift[] = [
  {
    id: 'rs_1001',
    title: 'Garçom — Sexta (jantar)',
    neighborhood: 'Centro',
    startsAt: '2026-02-06T20:00:00.000Z',
    endsAt: '2026-02-07T02:00:00.000Z',
    payPerHour: 22,
    bonus: 25,
    headcount: 3,
    filled: 1,
    status: 'open',
    tags: ['Salão', 'Uniforme preto', 'Pontualidade'],
  },
  {
    id: 'rs_1002',
    title: 'Bar — Sábado (noite)',
    neighborhood: 'Centro',
    startsAt: '2026-02-07T22:00:00.000Z',
    endsAt: '2026-02-08T04:00:00.000Z',
    payPerHour: 26,
    bonus: 0,
    headcount: 2,
    filled: 2,
    status: 'closed',
    tags: ['Coquetelaria básica', 'Agilidade'],
  },
]

export const applicantsByShift: Record<string, Applicant[]> = {
  rs_1001: [
    {
      id: 'f_001',
      name: 'Ana Souza',
      rating: 4.8,
      reliability: 95,
      skills: ['Garçom(ete)', 'Bar', 'Caixa'],
      note: 'Chego 15 min antes e tenho experiência em salão.',
      status: 'applied',
    },
    {
      id: 'f_044',
      name: 'Camila Rocha',
      rating: 4.9,
      reliability: 97,
      skills: ['Bar', 'Salão'],
      status: 'applied',
    },
  ],
  rs_1002: [
    {
      id: 'f_019',
      name: 'Bruno Lima',
      rating: 4.5,
      reliability: 93,
      skills: ['Garçom(ete)'],
      status: 'approved',
    },
  ],
}
