'use client'

import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { track } from '@/lib/analytics'

export default function UpgradeButton({ plan = 'monthly' }: any){

  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  async function handleUpgrade(){

    if(!user){
      alert('Você precisa estar logado')
      return
    }

    track('clicked_upgrade', { plan })

    setLoading(true)

    try {

      track('payment_started', { plan })

      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          plan
        })
      })

      // 🔥 valida resposta HTTP
      if(!res.ok){
        throw new Error('Erro na API')
      }

      const data = await res.json()

      if(data?.init_point){
        window.location.href = data.init_point
        return
      }

      throw new Error('Link de pagamento inválido')

    } catch (error) {
      console.error(error)
      alert('Erro ao iniciar pagamento. Tente novamente.')
    } finally {
      // 🔥 SEMPRE executa
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="bg-yellow-500 text-white px-4 py-2 rounded font-bold hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Carregando...' : '🚀 Virar PRO'}
    </button>
  )
}