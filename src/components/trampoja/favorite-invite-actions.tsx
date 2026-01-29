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
  const [invStatus, setInvStatus] = useState<
    'idle' | 'sent' | 'alreadyInvited' | 'error'
  >('idle')

  const disabled = useMemo(
    () => pending || (favDone && invStatus !== 'idle'),
    [pending, favDone, invStatus]
  )

  async function favorite() {
    startTransition(async () => {
      const res = await fetch('/api/restaurant/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId, freelancerId }),
      })

      if (res.ok) setFavDone(true)
    })
  }

  async function invite() {
    startTransition(async () => {
      const res = await fetch('/api/restaurant/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId, shiftId, freelancerId }),
      })

      if (!res.ok) {
        setInvStatus('error')
        return
      }

      const data = (await res.json()) as { alreadyInvited?: boolean }
      setInvStatus(data.alreadyInvited ? 'alreadyInvited' : 'sent')
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        size="sm"
        variant={favDone ? 'secondary' : 'outline'}
        disabled={disabled || favDone}
        onClick={favorite}
      >
        {favDone ? 'Favoritado' : 'Favoritar'}
      </Button>

      <Button
        size="sm"
        disabled={disabled || invStatus === 'sent' || invStatus === 'alreadyInvited'}
        onClick={invite}
      >
        {invStatus === 'alreadyInvited'
          ? 'Já convidado'
          : invStatus === 'sent'
            ? 'Convidado'
            : 'Convidar'}
      </Button>
    </div>
  )
}
