'use client'

import { useState } from 'react'
import { calculateProfit } from '@/lib/profitCalculator'

export default function CalculatorPage() {

  const [price, setPrice] = useState(0)
  const [cost, setCost] = useState(0)
  const [marketplace, setMarketplace] = useState('Shopee')
  const [profit, setProfit] = useState(0)

  function handleCalculate() {

    const result = calculateProfit(marketplace, price, cost, 0)

    setProfit(result.profit)
  }
                                                   
  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Calculadora de Lucro
      </h1>

      <div className="flex flex-col gap-4 max-w-md">

        <input
          type="number"
          placeholder="Preço de venda"
          className="border p-2"
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Custo do produto"
          className="border p-2"
          onChange={(e) => setCost(Number(e.target.value))}
        />

        <select
          className="border p-2"
          onChange={(e) => setMarketplace(e.target.value)}
        >

          <option>Shopee</option>
          <option>Mercado Livre</option>
          <option>Amazon</option>

        </select>

        <button
          onClick={handleCalculate}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Calcular Lucro
        </button>

        <div className="text-xl font-bold">
          Lucro: R$ {profit}
        </div>

      </div>

    </div>
  )
}