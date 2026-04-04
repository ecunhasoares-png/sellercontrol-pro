'use client'

import UpgradeButton from '@/components/UpgradeButton'

export default function PricingPage(){

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">

        {/* MENSAL */}
        <div className="bg-white p-6 rounded-xl shadow text-center">

          <h2 className="text-xl font-bold mb-2">Mensal</h2>

          <p className="text-2xl font-bold mb-4">R$ 29,90</p>

          <ul className="text-sm mb-6 space-y-1">
            <li>✔ Vendas ilimitadas</li>
            <li>✔ IA financeira</li>
            <li>✔ Controle total</li>
          </ul>

          <UpgradeButton plan="monthly" />

        </div>

        {/* ANUAL (DESTAQUE FORTE) */}
        <div className="bg-yellow-100 p-6 rounded-xl shadow text-center border-2 border-yellow-500 scale-105">

          <p className="text-xs font-bold text-yellow-700 mb-1">
            🔥 MAIS ESCOLHIDO
          </p>

          <h2 className="text-xl font-bold mb-2">Anual</h2>

          <p className="text-2xl font-bold mb-1">R$ 297</p>

          <p className="text-sm text-gray-600 mb-1">
            Economize R$ 60
          </p>

          <p className="text-sm mb-4">
            Menos de R$ 1 por dia
          </p>

          <UpgradeButton plan="annual" />

        </div>

      </div>

      {/* 🔒 CONFIANÇA */}
      <p className="absolute bottom-6 text-xs text-gray-400">
        🔒 Pagamento seguro via Mercado Pago
      </p>

    </div>
  )
}