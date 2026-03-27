'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

export default function SalesPage() {
  const [isPro, setIsPro] = useState(false)
  const { user } = useAuth()

  const [sales, setSales] = useState<any[]>([])
  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const chartData = sales.map((sale, index) => ({
    name: sale.product || `Venda ${index + 1}`,
    valor: Number(sale.amount || 0)
  }))

  async function loadSales() {
    if (!user) return

    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .eq('user_id', user.id)

    if (data) setSales(data)
    if (error) console.log(error.message)
  }

  useEffect(() => {
    if (!user) return

    async function loadProfile() {
      const { data } = await supabase
        .from('profiles')
        .select('is_pro')
        .eq('id', user.id)
        .single()

      if (data) {
        setIsPro(data.is_pro)
      }
    }

    loadProfile()
  }, [user])

  useEffect(() => {
    if (user) {
      loadSales()
    }
  }, [user])

  async function handleCreateSale() {
    if (!user) return

    if (!isPro && sales.length >= 3) {
      setMessage('Plano FREE permite apenas 3 vendas')
      return
    }

    setLoading(true)
    setMessage('')

    const { error } = await supabase
      .from('sales')
      .insert({
        product,
        amount: Number(amount),
        user_id: user.id
      })

    if (error) {
      setMessage('Erro: ' + error.message)
      setLoading(false)
      return
    }

    setMessage('Venda salva com sucesso!')
    setProduct('')
    setAmount('')
    setLoading(false)

    loadSales()
  }

  async function handleUpgrade() {
    if (!user) return

    await supabase
      .from('profiles')
      .update({ is_pro: true })
      .eq('id', user.id)

    setIsPro(true)
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Nova Venda
      </h1>

      {/* 🔥 BLOCO FREE / PRO */}
      {!isPro && (
        <>
          <p className="text-red-500 mb-4">
            Plano FREE: limite de 3 vendas
          </p>

          <button
            className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
            onClick={handleUpgrade}
          >
            Virar PRO 🚀
          </button>
        </>
      )}

      <input
        type="text"
        placeholder="Produto"
        className="border p-2 block mb-4 w-80"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />

      <input
        type="number"
        placeholder="Valor"
        className="border p-2 block mb-4 w-80"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={handleCreateSale}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Salvando...' : 'Salvar Venda'}
      </button>

      {message && <p className="mt-4">{message}</p>}

      {/* 🔥 GRÁFICO */}
      <div className="mt-10 w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">
          Gráfico de Vendas
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="valor" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 LISTA */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">
          Minhas Vendas
        </h2>

        {sales.length === 0 && (
          <p>Nenhuma venda encontrada</p>
        )}

        {sales.map((sale) => (
          <div
            key={sale.id}
            className="border p-3 mb-2 rounded w-80"
          >
            <p><strong>Produto:</strong> {sale.product}</p>
            <p><strong>Valor:</strong> {sale.amount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}