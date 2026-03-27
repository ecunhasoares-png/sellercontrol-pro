'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  // Redireciona automaticamente para a página de registro
  useEffect(() => {
    router.push('/register')
  }, [router])

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">
        SellerControl Pro
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Gerencie suas vendas, acompanhe lucros e tenha controle total do seu negócio em um só lugar.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/login')}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Entrar
        </button>
        <button
          onClick={() => router.push('/register')}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Criar conta
        </button>
      </div>
    </div>
  )
}