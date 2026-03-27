'use client'

import {
LineChart, Line,
BarChart, Bar,
XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

export function RevenueChart({ data }: { data:any[] }){

return(
<div className="bg-white p-4 rounded shadow">

<h3 className="mb-2 font-bold">Lucro ao longo do tempo</h3>

<ResponsiveContainer width="100%" height={300}>
<LineChart data={data}>
<XAxis dataKey="created_at" tickFormatter={(v)=> new Date(v).toLocaleDateString('pt-BR')}/>
<YAxis/>
<Tooltip/>
<Line dataKey="profit" stroke="#22c55e" strokeWidth={3}/>
</LineChart>
</ResponsiveContainer>

</div>
)
}

export function MarketplaceChart({ data }: { data:any[] }){

return(
<div className="bg-white p-4 rounded shadow mt-6">

<h3 className="mb-2 font-bold">Vendas por Marketplace</h3>

<ResponsiveContainer width="100%" height={300}>
<BarChart data={data}>
<XAxis dataKey="marketplace"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="sale_price" fill="#3b82f6"/>
</BarChart>
</ResponsiveContainer>

</div>
)
}export function DailyProfitChart({ data }: { data:any[] }){

return(
<div className="bg-white p-4 rounded shadow mt-6">

<h3 className="mb-2 font-bold">Lucro por dia</h3>

<ResponsiveContainer width="100%" height={300}>
<LineChart data={data}>
<XAxis dataKey="date"/>
<YAxis/>
<Tooltip/>
<Line dataKey="profit" stroke="#16a34a" strokeWidth={3}/>
</LineChart>
</ResponsiveContainer>

</div>
)
}