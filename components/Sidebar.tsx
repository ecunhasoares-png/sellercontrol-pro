'use client'

import { useRouter } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
export default function Sidebar() {
  const router = useRouter()

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
      
      <nav className="p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Meu SaaS</h2>

        <button
          onClick={()=>router.push('/dashboard')}
          className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
        >
          Dashboard
        </button>

        <button
          onClick={()=>router.push('/products')}
          className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
        >
          Produtos
        </button>

        <button
          onClick={()=>router.push('/sales')}
          className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
        >
          Vendas
        </button>

        <button
          onClick={()=>router.push('/stores')}
          className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
        >
          Lojas
        </button>
      </nav>

      <div className="p-6">
        <LogoutButton />
      </div>
    </aside>
  )
}