'use client'

import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

export default function CalculatorPage(){

  const { isPro } = useAuth()

  const [cost, setCost] = useState('')
  const [margin, setMargin] = useState('30')

  // 🧠 TAXAS DOS MARKETPLACES
  const marketplaces: any = {
    Shopee: 14,
    'Mercado Livre': 16,
    Amazon: 15
  }

  const costValue = Number(cost)
  const marginPercent = Number(margin)

  // 🧠 IA CALCULANDO TODOS
  const results = Object.entries(marketplaces).map(([name, feePercent]: any) => {

    const breakEven = costValue / (1 - feePercent / 100)

    const idealPrice = breakEven * (1 + marginPercent / 100)

    const profit =
      idealPrice - costValue - (idealPrice * (feePercent / 100))

    return {
      name,
      fee: feePercent,
      idealPrice,
      profit
    }
  })

  // 🧠 MELHOR OPÇÃO
  const best = results.sort((a,b)=> b.profit - a.profit)[0]

  if(!isPro){
    return(
      <div className="p-10">
        <h1 className="text-2xl font-bold">
          🔒 IA Avançada disponível no PRO
        </h1>
      </div>
    )
  }

  return(

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        IA de Venda Inteligente 🤖💰
      </h1>

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md mb-6">

        <input
          type="number"
          placeholder="Custo do produto"
          className="border p-2 w-full mb-4"
          value={cost}
          onChange={(e)=>setCost(e.target.value)}
        />

        <input
          type="number"
          placeholder="Margem desejada (%)"
          className="border p-2 w-full"
          value={margin}
          onChange={(e)=>setMargin(e.target.value)}
        />

      </div>

      {/* RESULTADOS */}
      {cost && (
        <div className="grid gap-4 max-w-md">

          {results.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl shadow ${
                item.name === best.name
                  ? 'bg-green-100 border-2 border-green-500'
                  : 'bg-white'
              }`}
            >

              <p className="font-bold">{item.name}</p>

              <p className="text-sm text-gray-500">
                Taxa: {item.fee}%
              </p>

              <p className="mt-2">
                Preço ideal: <b>R$ {item.idealPrice.toFixed(2)}</b>
              </p>

              <p className={`font-bold ${
                item.profit >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                Lucro: R$ {item.profit.toFixed(2)}
              </p>

            </div>
          ))}

          {/* 🧠 RECOMENDAÇÃO FINAL */}
          <div className="bg-black text-white p-4 rounded-xl mt-4">

            <p className="text-lg font-bold">
              🧠 Melhor escolha:
            </p>

            <p className="text-2xl font-bold text-green-400">
              {best.name}
            </p>

            <p className="text-sm mt-2">
              Maior lucro estimado: R$ {best.profit.toFixed(2)}
            </p>

          </div>

        </div>
      )}

    </div>
  )
}