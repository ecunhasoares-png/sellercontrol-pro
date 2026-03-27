'use client'

export default function PricingPage(){

function handleBuy(plan:string){

fetch('/api/checkout', {
method:'POST',
headers:{ 'Content-Type':'application/json' },
body: JSON.stringify({ plan })
})
.then(res=>res.json())
.then(data=>{
window.location.href = data.url
})

}

return(

<div className="min-h-screen bg-gray-100 p-10">

<h1 className="text-4xl font-bold text-center mb-4">
Transforme suas vendas em lucro real
</h1>

<p className="text-center text-gray-600 mb-10">
Controle completo do seu negócio nos marketplaces
</p>

<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

{/* FREE */}
<div className="bg-white p-6 rounded shadow">

<h2 className="text-xl font-bold mb-4">Plano Free</h2>

<p className="text-3xl font-bold mb-4">R$ 0</p>

<ul className="mb-6 space-y-2">
<li>✔ Até 50 vendas</li>
<li>✔ Controle básico</li>
<li>❌ Sem gráficos avançados</li>
<li>❌ Sem relatórios</li>
</ul>

<button
className="w-full bg-gray-300 p-2 rounded cursor-not-allowed"
>
Plano atual
</button>

</div>

{/* PRO */}
<div className="bg-yellow-400 p-6 rounded shadow transform scale-105">

<h2 className="text-xl font-bold mb-4">Plano PRO 🚀</h2>

<p className="text-3xl font-bold mb-4">R$ 29,90/mês</p>

<ul className="mb-6 space-y-2">
<li>✔ Vendas ilimitadas</li>
<li>✔ Dashboard completo</li>
<li>✔ Gráficos avançados</li>
<li>✔ Controle total de lucro</li>
<li>✔ Melhor decisão de preço</li>
</ul>

<button
onClick={()=>handleBuy('pro')}
className="w-full bg-black text-white p-3 rounded font-bold"
>
Começar agora
</button>

</div>

{/* PREMIUM */}
<div className="bg-white p-6 rounded shadow">

<h2 className="text-xl font-bold mb-4">Plano Premium</h2>

<p className="text-3xl font-bold mb-4">R$ 59,90/mês</p>

<ul className="mb-6 space-y-2">
<li>✔ Tudo do PRO</li>
<li>✔ Multi lojas</li>
<li>✔ Relatórios avançados</li>
<li>✔ Prioridade suporte</li>
</ul>

<button
onClick={()=>handleBuy('premium')}
className="w-full bg-blue-600 text-white p-2 rounded"
>
Quero escalar
</button>

</div>

</div>

<p className="text-center text-green-600 font-semibold mt-10">
✝️ DEUS SEJA LOUVADO PARA TODO SEMPRE ✝️
</p>

</div>

)

}