'use client'

import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

export default function UpgradeButton(){

  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  async function handleUpgrade(){

    setLoading(true)

    const res = await fetch('/api/create-payment', {
      method: 'POST',
      body: JSON.stringify({
        userId: user?.id
      })
    })

    const data = await res.json()

    setLoading(false)

    if(data.init_point){
      window.location.href = data.init_point
    } else {
      alert('Erro ao iniciar pagamento')
    }
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-bold"
    >
      {loading ? 'Carregando...' : '🚀 Virar PRO'}
    </button>
  )
}