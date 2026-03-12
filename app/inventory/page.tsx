'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function InventoryPage(){

const [products,setProducts] = useState<any[]>([])
const [stock,setStock] = useState('')
const [product,setProduct] = useState('')

useEffect(()=>{

loadProducts()

},[])

async function loadProducts(){

const { data } = await supabase
.from('products')
.select('*')

if(data) setProducts(data)

}

async function addInventory(){

const { data: userData } = await supabase.auth.getUser()

await supabase
.from('inventory')
.insert([
{
product_id: product,
stock: stock,
user_id: userData.user?.id
}
])

alert('Estoque salvo')

}

return(

<div style={{padding:40}}>

<h1>Controle de Estoque</h1>

<select onChange={(e)=>setProduct(e.target.value)}>

<option>Escolha produto</option>

{products.map((p)=>(
<option key={p.id} value={p.id}>
{p.name}
</option>
))}

</select>

<br/>

<input
placeholder="Quantidade em estoque"
value={stock}
onChange={(e)=>setStock(e.target.value)}
/>

<br/>

<button onClick={addInventory}>
Salvar estoque
</button>

</div>

)

}