'use client'

import { useMemo, useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'

type Props = {
  restaurantId: string
  shiftId: string
  freelancerId: string
}

export function FavoriteInviteActions({
  restaurantId,
  shiftId,
  freelancerId,
}: Props) {
  const [pending, startTransition] = useTransition()
  const [favDone, setFavDone] = useState(false)
  const [invDone, setInvDone] = useState(false)

  const disabled = useMemo(
    () => pending || (favDone && invDone),
    [pending, favDone, invDone]
  )

  async function favorite() {
    startTransition(async () => {
      await fetch('/api/restaurant/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId, freelancerId }),
      })
      setFavDone(true)
    })
  }

  async function invite() {
    startTransition(async () => {
      await fetch('/api/restaurant/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId, shiftId, freelancerId }),
      })
      setInvDone(true)
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <Button size="sm" variant={favDone ? 'secondary' : 'outline'} disabled={disabled || favDone} onClick={favorite}>
        {favDone ? 'Favoritado' : 'Favoritar'}
      </Button>
      <Button size="sm" disabled={disabled || invDone} onClick={invite}>
        {invDone ? 'Convidado' : 'Convidar'}
      </Button>
    </div>
  )
}
