'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import UpgradeButton from '@/components/UpgradeButton'

export default function DashboardPage(){

  const { user, loading, isPro } = useAuth()
  const router = useRouter()

  const [sales, setSales] = useState<any[]>([])
  const [chartData, setChartData] = useState<any[]>([])
  const [insight, setInsight] = useState('')
  const [currentVerse, setCurrentVerse] = useState('')

  const FREE_LIMIT = 10
  const remaining = FREE_LIMIT - sales.length

  const [cost, setCost] = useState('')
  const [margin, setMargin] = useState('30')
  const [bestMarketplace, setBestMarketplace] = useState<any>(null)

  const userName = user?.email?.split('@')[0] || 'Usuário'

  const verses = [
    "Buscai ao Senhor enquanto se pode achar — Isaías 55:6",
    "O Senhor é meu pastor — Salmos 23:1",
    "Tudo posso naquele que me fortalece — Filipenses 4:13",
    "Entrega o teu caminho ao Senhor — Salmos 37:5",
    "Deus é nosso refúgio — Salmos 46:1",
    "Confia no Senhor — Provérbios 3:5",
    "Se Deus é por nós — Romanos 8:31"
  ]

  const marketplaces: any = {
    Shopee: 14,
    'Mercado Livre': 16,
    Amazon: 15
  }

  useEffect(() => {
    const hour = new Date().getHours()
    const index = hour % verses.length
    setCurrentVerse(verses[index])
  }, [])

  useEffect(() => {
    if(user){
      loadData()
    }
  }, [user])

  async function loadData(){

    const { data } = await supabase
      .from('sales')
      .select('amount, profit, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if(data){
      setSales(data)

      const formatted = data.map((item) => ({
        date: new Date(item.created_at).toLocaleDateString(),
        valor: Number(item.amount)
      }))

      setChartData(formatted)
      generateInsight(data)
    }
  }

  function generateInsight(data: any[]){

    if(data.length === 0){
      setInsight('Sem dados ainda.')
      return
    }

    const totalProfit = data.reduce((acc, i) => acc + (i.profit || 0), 0)
    const avgProfit = totalProfit / data.length
    const negative = data.filter(i => i.profit < 0).length

    if(negative > data.length * 0.4){
      setInsight('🚨 Muitos prejuízos! Ajuste urgente.')
    }
    else if(avgProfit < 5){
      setInsight('⚠️ Lucro baixo. Aumente o preço.')
    }
    else if(avgProfit > 20){
      setInsight('🔥 Você pode aumentar mais o preço.')
    }
    else{
      setInsight('✅ Operação saudável.')
    }
  }

  const costValue = Number(cost)
  const marginPercent = Number(margin)

  const results = Object.entries(marketplaces).map(([name, fee]: any) => {

    const breakEven = costValue / (1 - fee / 100)
    const idealPrice = breakEven * (1 + marginPercent / 100)

    const profit =
      idealPrice - costValue - (idealPrice * (fee / 100))

    return { name, fee, idealPrice, profit }
  })

  useEffect(() => {
    if(results.length > 0){
      const best = [...results].sort((a,b)=>b.profit - a.profit)[0]
      setBestMarketplace(best)
    }
  }, [cost, margin])

  async function handleLogout(){
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return <p className="p-10">Carregando seu dashboard...</p>
  }

  return(
    <ProtectedRoute>

      <div className="p-10 bg-gray-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-2">
          Olá {userName}, seja bem-vindo 👋
        </h1>

        {/* 🚀 BANNER PRINCIPAL (CONVERSÃO) */}
        {!isPro && (
          <div className="bg-yellow-100 p-4 rounded mb-2">

            <p className="font-bold">
              🚀 {remaining > 0 
                ? `Você ainda pode criar ${remaining} vendas`
                : 'Você atingiu o limite do plano FREE'}
            </p>

            <p className="text-sm mb-2">
              {remaining > 0
                ? 'Aproveite antes que acabe...'
                : 'Desbloqueie vendas ilimitadas agora'}
            </p>

            <UpgradeButton />

          </div>
        )}

        {/* 🔥 PROVA SOCIAL */}
        {!isPro && (
          <p className="text-xs text-gray-500 mb-6">
            🔥 Mais de 1.000 vendedores já aumentaram seus lucros com o PRO
          </p>
        )}

        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <p className="text-sm opacity-80 mb-1">
            Palavra do momento ✨
          </p>
          <p className="italic">{currentVerse}</p>
        </div>

        {/* 🚫 BLOQUEIO FINAL */}
        {!isPro && sales.length >= FREE_LIMIT && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center">

            <p className="font-bold mb-2">
              🚫 Seu crescimento parou aqui
            </p>

            <p className="mb-3">
              Faça upgrade agora para continuar vendendo
            </p>

            <UpgradeButton />

          </div>
        )}

        <div className="bg-black text-white p-6 rounded-xl mb-6">
          <h2 className="font-bold mb-2">IA de Análise</h2>
          <p>{insight}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="date"/>
              <YAxis/>
              <Tooltip/>
              <Line type="monotone" dataKey="valor" stroke="#16a34a"/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mt-6 max-w-md">

          <h2 className="font-bold mb-4">IA de Preço</h2>

          <input
            type="number"
            placeholder="Custo do produto"
            className="border p-2 w-full mb-3"
            value={cost}
            onChange={(e)=>setCost(e.target.value)}
          />

          <input
            type="number"
            placeholder="Margem (%)"
            className="border p-2 w-full mb-3"
            value={margin}
            onChange={(e)=>setMargin(e.target.value)}
          />

          {cost && bestMarketplace && (
            <div className="mt-4 bg-green-100 p-3 rounded">

              <p className="font-bold">Melhor plataforma:</p>

              <p className="text-green-700 text-lg font-bold">
                {bestMarketplace.name}
              </p>

              <p>Preço ideal: R$ {bestMarketplace.idealPrice.toFixed(2)}</p>
              <p>Lucro: R$ {bestMarketplace.profit.toFixed(2)}</p>

            </div>
          )}

        </div>

        <div className="mt-10 flex gap-4">

          <button
            onClick={()=>router.push('/dashboard/sales')}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Vendas
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Sair
          </button>

        </div>

      </div>

    </ProtectedRoute>
  )
}