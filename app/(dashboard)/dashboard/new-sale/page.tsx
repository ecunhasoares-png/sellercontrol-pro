'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

export default function NewSalePage() {

  const { user } = useAuth()
  const router = useRouter()

  const [products, setProducts] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  // 🔥 carregar produtos SOMENTE do usuário
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

    if (data) {
      setProducts(data)
    }
  }

  // 🔥 selecionar produto
  function handleSelectProduct(id: string) {
    const product = products.find(p => p.id === id)
    setSelectedProduct(product)
  }

  // 🔥 criar venda com IA financeira
  async function handleCreateSale(e: any) {
    e.preventDefault()

    if (!amount) return alert('Informe o valor da venda')
    if (!selectedProduct) return alert('Selecione um produto')

    const saleValue = Number(amount)
    const cost = Number(selectedProduct.cost)

    // ⚠️ taxa vem em % (ex: 0.14 = 14%)
    const feeValue = saleValue * Number(selectedProduct.fee)

    const profit = saleValue - cost - feeValue

    // 🔥 BLOQUEIO FREE (máx 3 vendas)
    const { count } = await supabase
      .from('sales')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user?.id)

    if (count && count >= 3) {
      alert('🚀 Você atingiu o limite FREE. Faça upgrade para continuar.')
      router.push('/pricing')
      return
    }

    setLoading(true)

    const { error } = await supabase.from('sales').insert([
      {
        amount: saleValue,
        cost_price: cost,
        fee: feeValue,
        profit: profit,
        platform: selectedProduct.platform,
        product_id: selectedProduct.id,
        user_id: user?.id,
      },
    ])

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard/sales')
  }

  // 🧠 cálculo inteligente (preview)
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

        {/* 🔥 selecionar produto */}
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

        {/* valor da venda */}
        <input
          type="number"
          placeholder="Valor da venda"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        {/* 🔥 IA PREVIEW */}
        {selectedProduct && amount && (
          <div className="bg-gray-50 p-4 rounded mb-4 text-sm">

            <p>
              Produto: <strong>{selectedProduct.name}</strong>
            </p>

            <p>Plataforma: {selectedProduct.platform}</p>

            <p>Custo: R$ {selectedProduct.cost}</p>

            <p>
              Taxa ({selectedProduct.fee * 100}%):
              {' '}
              R$ {calculatedFee.toFixed(2)}
            </p>

            <p className="mt-2 font-bold">
              Lucro:
              <span
                className={
                  calculatedProfit >= 0
                    ? ' text-green-600'
                    : ' text-red-600'
                }
              >
                {' '}
                R$ {calculatedProfit.toFixed(2)}
              </span>
            </p>

            {/* 🧠 IA ALERTA */}
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