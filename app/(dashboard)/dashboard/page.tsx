'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [total, setTotal] = useState(0)

  async function handleLogout() {
    await supabase.auth.signOut()
    router.replace('/login') // 🔥 correto
    router.refresh() // 🔥 essencial
  }

  useEffect(() => {
    if (!user) return

    async function loadTotal() {
      const { data, error } = await supabase
        .from('sales')
        .select('amount')
        .eq('user_id', user.id)

      if (error) {
        console.log(error.message)
        return
      }

      if (data) {
        const sum = data.reduce((acc, item) => acc + Number(item.amount), 0)
        setTotal(sum)
      }
    }

    loadTotal()
  }, [user])

  if (loading) {
    return <p className="p-10">Carregando...</p>
  }

  if (!user) return null // 🔥 evita crash

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-4">
        Dashboard
      </h1>

      <p className="mb-4">
        Bem-vindo: {user.email}
      </p>

      <div className="bg-green-100 p-4 rounded mt-4 w-80 text-center">
        <p className="text-lg">Total de Vendas</p>
        <p className="text-2xl font-bold text-green-700">
          R$ {total}
        </p>
      </div>

      <button
        onClick={() => router.push('/dashboard/sales')}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-6"
      >
        Ir para Vendas
      </button>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded mt-4"
      >
        Sair
      </button>

    </div>
  )
}