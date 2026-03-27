'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function ProductsPage(){

const [products,setProducts] = useState<any[]>([])
const [name,setName] = useState('')
const [cost,setCost] = useState(0)
const [stock,setStock] = useState(0)

useEffect(()=>{
loadProducts()
},[])

async function loadProducts(){

const { data } = await supabase
.from('products')
.select('*')

if(data){
setProducts(data)
}

}

async function createProduct(){

await supabase
.from('products')
.insert({
name,
cost,
stock
})

setName('')
setCost(0)
setStock(0)

loadProducts()

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Produtos
</h1>

<div className="grid gap-3 max-w-md mb-8">

<input
placeholder="Nome do produto"
className="border p-2"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
type="number"
placeholder="Custo"
className="border p-2"
value={cost}
onChange={(e)=>setCost(Number(e.target.value))}
/>

<input
type="number"
placeholder="Estoque"
className="border p-2"
value={stock}
onChange={(e)=>setStock(Number(e.target.value))}
/>

<button
onClick={createProduct}
className="bg-blue-600 text-white p-2 rounded"
>
Cadastrar produto
</button>

</div>

<h2 className="text-xl font-bold mb-4">
Lista de produtos
</h2>

<div className="grid gap-2">

{products.map((p)=>(
<div
key={p.id}
className="border p-3 rounded flex justify-between"
>

<span>{p.name}</span>

<span>Estoque: {p.stock}</span>

</div>
))}

</div>

</div>

)

}