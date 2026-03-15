'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function NewSale(){

const [product,setProduct] = useState('')
const [price,setPrice] = useState('')
const [profit,setProfit] = useState('')
const [marketplace,setMarketplace] = useState('')

async function saveSale(){

const { data:{ user } } = await supabase.auth.getUser()

await supabase
.from('sales')
.insert({
product_name: product,
sale_price: price,
profit: profit,
marketplace: marketplace,
user_id: user?.id
})

alert("Venda salva")

}

return(

<div style={{padding:40}}>

<h1>Registrar venda</h1>

<input
placeholder="Produto"
onChange={(e)=>setProduct(e.target.value)}
/>

<br/><br/>

<input
placeholder="Preço"
onChange={(e)=>setPrice(e.target.value)}
/>

<br/><br/>

<input
placeholder="Lucro"
onChange={(e)=>setProfit(e.target.value)}
/>

<br/><br/>

<input
placeholder="Marketplace"
onChange={(e)=>setMarketplace(e.target.value)}
/>

<br/><br/>

<button onClick={saveSale}>
Salvar venda
</button>

</div>

)

}