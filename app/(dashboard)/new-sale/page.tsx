'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function NewSale(){

const [product,setProduct] = useState('')
const [price,setPrice] = useState(0)
const [cost,setCost] = useState(0)
const [shipping,setShipping] = useState(0)
const [marketplace,setMarketplace] = useState('Shopee')
const [profitPreview,setProfitPreview] = useState(0)

async function saveSale(){

const { data:{ user } } = await supabase.auth.getUser()

// cálculo automático do lucro
const profit = price - cost - shipping

const { error } = await supabase
.from('sales')
.insert({
product_name: product,
sale_price: price,
cost: cost,
shipping: shipping,
profit: profit,
marketplace: marketplace,
user_id: user?.id
})

if(error){
alert(error.message)
}else{
alert("Venda salva com sucesso")
}

}

function calculatePreview(){
const result = price - cost - shipping
setProfitPreview(result)
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
type="number"
placeholder="Preço"
onChange={(e)=>{
setPrice(Number(e.target.value))
calculatePreview()
}}
/>

<br/><br/>

<input
type="number"
placeholder="Custo"
onChange={(e)=>{
setCost(Number(e.target.value))
calculatePreview()
}}
/>

<br/><br/>

<input
type="number"
placeholder="Frete"
onChange={(e)=>{
setShipping(Number(e.target.value))
calculatePreview()
}}
/>

<br/><br/>

<input
placeholder="Marketplace"
value={marketplace}
onChange={(e)=>setMarketplace(e.target.value)}
/>

<br/><br/>

<div>
<strong>Lucro estimado: R$ {profitPreview}</strong>
</div>

<br/>

<button onClick={saveSale}>
Salvar venda
</button>

</div>

)

}