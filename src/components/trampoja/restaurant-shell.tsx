import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/utils/tailwind'
import { Button } from '@/components/ui/button'
import { MobileTabBar } from '@/components/trampoja/mobile-tab-bar'

type RestaurantShellProps = {
  children: React.ReactNode
  className?: string
}

export function RestaurantShell({ children, className }: RestaurantShellProps) {
  return (
    <div className="bg-background text-foreground min-h-dvh">
      <header className="supports-[backdrop-filter]:bg-background/70 bg-background/85 sticky top-0 z-50 border-b backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/brand/trampoja-wordmark-v1-light.svg"
              alt="TrampoJá"
              width={160}
              height={32}
              priority
              className="h-7 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Button asChild variant="ghost">
              <Link href="/gigs">Freelancer</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/restaurant">Restaurante</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/restaurant/favorites">Favoritos</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main
        className={cn(
          'mx-auto w-full max-w-6xl px-4 py-6 pb-28 md:py-10 md:pb-10',
          className,
        )}
      >
        {children}
      </main>

      <footer className="hidden border-t py-10 md:block">
        <div className="text-muted-foreground mx-auto max-w-6xl px-4 text-sm">
          TrampoJá • MVP (Restaurante) — Curitiba
        </div>
      </footer>

      <MobileTabBar />
    </div>
  )
}
