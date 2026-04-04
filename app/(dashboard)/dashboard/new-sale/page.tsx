'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

export default function NewSalePage() {

  const { user, isPro } = useAuth()
  const router = useRouter()

  const [products, setProducts] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(user){
      loadProducts()
    }
  }, [user])

  async function loadProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', user?.id)

    if (data) setProducts(data)
  }

  function handleSelectProduct(id: string) {
    const product = products.find(p => p.id === id)
    setSelectedProduct(product)
  }

  async function handleCreateSale(e: any) {
    e.preventDefault()

    if (!amount) return alert('Informe o valor da venda')
    if (!selectedProduct) return alert('Selecione um produto')

    // 🔥 BLOQUEIO CORRETO
    if(!isPro){
      router.push('/pricing')
      return
    }

    const saleValue = Number(amount)
    const cost = Number(selectedProduct.cost)
    const feeValue = saleValue * Number(selectedProduct.fee)
    const profit = saleValue - cost - feeValue

    setLoading(true)

    const res = await fetch('/api/sales', {
      method: 'POST',
      body: JSON.stringify({
        userId: user?.id,
        sale: {
          amount: saleValue,
          cost_price: cost,
          fee: feeValue,
          profit: profit,
          platform: selectedProduct.platform,
          product_id: selectedProduct.id,
        }
      })
    })

    const data = await res.json()

    setLoading(false)

    if(data.error){
      alert(data.error)
      return
    }

    router.push('/dashboard/sales')
  }

  const calculatedFee =
    selectedProduct && amount
      ? Number(amount) * Number(selectedProduct.fee)
      : 0

  const calculatedProfit =
    selectedProduct && amount
      ? Number(amount) -
        Number(selectedProduct.cost) -
        calculatedFee
      : 0

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleCreateSale}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md"
      >

        <h1 className="text-2xl font-bold mb-6">
          Nova Venda
        </h1>

        <select
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => handleSelectProduct(e.target.value)}
        >
          <option value="">Selecione um produto</option>

          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.platform})
            </option>
          ))}

        </select>

        <input
          type="number"
          placeholder="Valor da venda"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        {selectedProduct && amount && (
          <div className="bg-gray-50 p-4 rounded mb-4 text-sm">

            <p>Produto: <strong>{selectedProduct.name}</strong></p>
            <p>Plataforma: {selectedProduct.platform}</p>
            <p>Custo: R$ {selectedProduct.cost}</p>

            <p>
              Taxa ({selectedProduct.fee * 100}%):
              {' '}R$ {calculatedFee.toFixed(2)}
            </p>

            <p className="mt-2 font-bold">
              Lucro:
              <span className={
                calculatedProfit >= 0
                  ? ' text-green-600'
                  : ' text-red-600'
              }>
                {' '}R$ {calculatedProfit.toFixed(2)}
              </span>
            </p>

            {calculatedProfit < 0 && (
              <p className="text-red-500 mt-2">
                ⚠️ Você está tendo prejuízo nessa venda!
              </p>
            )}

            {calculatedProfit > 20 && (
              <p className="text-green-600 mt-2">
                🔥 Excelente margem!
              </p>
            )}

          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          {loading ? 'Salvando...' : 'Salvar Venda'}
        </button>

      </form>

    </div>
  )
}