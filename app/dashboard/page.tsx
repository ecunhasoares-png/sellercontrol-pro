'use client'

import { useEffect,useState } from 'react'
import { supabase } from '@/lib/supabase'

import {
BarChart,
Bar,
LineChart,
Line,
PieChart,
Pie,
Cell,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from 'recharts'

export default function DashboardPage(){

const [sales,setSales] = useState<any[]>([])
const [total,setTotal] = useState(0)
const [profit,setProfit] = useState(0)

useEffect(()=>{

loadSales()

},[])

async function loadSales(){

const { data } = await supabase
.from('sales')
.select('*')

if(data){

setSales(data)

let totalValue = 0
let profitValue = 0

data.forEach((s:any)=>{

totalValue += Number(s.price)
profitValue += Number(s.profit)

})

setTotal(totalValue)
setProfit(profitValue)

}

}

return(

<div style={{padding:40}}>

<h1>Dashboard</h1>

<h2>Faturamento total: R$ {total}</h2>
<h2>Lucro total: R$ {profit}</h2>

<h3>Vendas por marketplace</h3>

<div style={{width:'100%',height:300}}>

<ResponsiveContainer width="100%" height="100%">

<BarChart data={sales}>

<XAxis dataKey="marketplace"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="price"/>

</BarChart>

</ResponsiveContainer>

</div>

<h3>Lucro por venda</h3>

<div style={{width:'100%',height:300}}>

<ResponsiveContainer width="100%" height="100%">

<LineChart data={sales}>

<XAxis dataKey="product"/>

<YAxis/>

<Tooltip/>

<Line dataKey="profit"/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

)

}