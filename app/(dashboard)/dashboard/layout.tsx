'use client'

import { useRouter } from 'next/navigation'

export default function DashboardLayout({ children }: any){

  const router = useRouter()

  return(

    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white p-6">

        <h2 className="text-xl font-bold mb-6">
          SellerControl
        </h2>

        <nav className="flex flex-col gap-3">

          <button onClick={()=>router.push('/dashboard')}>
            Dashboard
          </button>

          <button onClick={()=>router.push('/dashboard/sales')}>
            Vendas
          </button>

          <button onClick={()=>router.push('/dashboard/products')}>
            Produtos
          </button>

          <button onClick={()=>router.push('/dashboard/calculator')}>
            IA de Preço
          </button>

        </nav>

      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 bg-gray-100">
        {children}
      </main>

    </div>

  )
}