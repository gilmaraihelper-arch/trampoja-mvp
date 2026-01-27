'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

type ApplyButtonProps = {
  gigId: string
}

const LS_KEY = 'trampoja_mvp_applications_v1'

function readSet(): Set<string> {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return new Set()
    return new Set(arr.map(String))
  } catch {
    return new Set()
  }
}

function writeSet(set: Set<string>) {
  localStorage.setItem(LS_KEY, JSON.stringify(Array.from(set)))
}

export function ApplyButton({ gigId }: ApplyButtonProps) {
  const [applied, setApplied] = useState(false)

  useEffect(() => {
    setApplied(readSet().has(gigId))
  }, [gigId])

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={() => {
        const set = readSet()
        set.add(gigId)
        writeSet(set)
        setApplied(true)
      }}
      disabled={applied}
    >
      {applied ? 'Candidatura enviada' : 'Candidatar-se'}
    </Button>
  )
}
