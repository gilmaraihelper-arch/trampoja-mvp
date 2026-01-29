import { Bricolage_Grotesque } from 'next/font/google'

import { MarketingLanding } from '@/components/marketing/MarketingLanding'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
})

export default function HomePage() {
  return (
    <div className={bricolage.className}>
      <div className="marketing">
        <MarketingLanding />
      </div>
    </div>
  )
}
