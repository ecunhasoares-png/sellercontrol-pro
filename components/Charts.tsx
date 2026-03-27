'use client'

import {
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

export function SalesBarChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Vendas por Marketplace</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="marketplace" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="price" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export function MonthlyRevenueChart({ data }: { data: any[] }) {

const monthly: any = {}

data.forEach((sale)=>{

const date = new Date(sale.created_at)

const month =
date.getFullYear() +
'-' +
String(date.getMonth()+1).padStart(2,'0')

if(!monthly[month]){

monthly[month] = 0

}

monthly[month] += Number(sale.price)

})

const chartData = Object.keys(monthly).map((m)=>({
month:m,
revenue:monthly[m]
}))

return(

<div className="bg-white p-4 rounded shadow mt-6">

<h3 className="text-lg font-semibold mb-2">
Faturamento Mensal
</h3>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={chartData}>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="revenue" fill="#6366f1"/>

</BarChart>

</ResponsiveContainer>

</div>

)

}
export function ProfitLineChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-2">Lucro por Venda</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="marketplace" />
          <YAxis />
          <Tooltip />
          <Line dataKey="profit" stroke="#22c55e" strokeWidth={3}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}