'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SalesPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [sales, setSales] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')
  const [costPrice, setCostPrice] = useState('')
  const [fee, setFee] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!user) return
    loadSales()
  }, [user])

  async function loadSales() {
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error.message)
      return
    }

    setSales(data || [])
    setLoading(false)
  }

  async function handleCreateSale() {
    if (!user) return

    const saleValue = Number(amount)
    const cost = Number(costPrice)
    const tax = Number(fee)

    const profit = saleValue - cost - tax

    const { error } = await supabase
      .from('sales')
      .insert({
        product,
        amount: saleValue,
        cost_price: cost,
        fee: tax,
        profit: profit,
        user_id: user.id
      })

    if (error) {
      setMessage('Erro: ' + error.message)
      return
    }

    setMessage('Venda criada com sucesso!')
    setProduct('')
    setAmount('')
    setCostPrice('')
    setFee('')

    loadSales()
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm('Deseja deletar esta venda?')
    if (!confirmDelete) return

    const { error } = await supabase
      .from('sales')
      .delete()
      .eq('id', id)

    if (error) {
      alert(error.message)
      return
    }

    setSales((prev) => prev.filter((sale) => sale.id !== id))
  }

  if (loading) return <p className="p-6">Carregando...</p>

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vendas</h1>
      </div>

      {/* FORMULÁRIO */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="text-lg font-bold mb-4">Nova Venda</h2>

        <input
          type="text"
          placeholder="Produto"
          className="border p-2 block mb-3 w-80"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          className="border p-2 block mb-3 w-80"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="number"
          placeholder="Custo do Produto"
          className="border p-2 block mb-3 w-80"
          value={costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Taxa (Shopee / ML / Amazon)"
          className="border p-2 block mb-3 w-80"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />

        <button
          onClick={handleCreateSale}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Salvar Venda
        </button>

        {message && <p className="mt-3">{message}</p>}

      </div>

      {/* TABELA */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Data</th>
              <th className="p-4">Produto</th>
              <th className="p-4">Valor</th>
              <th className="p-4">Lucro</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>

          <tbody>

            {sales.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  Nenhuma venda encontrada
                </td>
              </tr>
            )}

            {sales.map((sale) => (
              <tr key={sale.id} className="border-t hover:bg-gray-50">

                <td className="p-4">
                  {new Date(sale.created_at).toLocaleDateString()}
                </td>

                <td className="p-4">{sale.product}</td>

                <td className="p-4 font-semibold text-green-600">
                  R$ {sale.amount}
                </td>

                <td className="p-4">
                  <span className={sale.profit >= 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                    R$ {sale.profit}
                  </span>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleDelete(sale.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    🗑️
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}