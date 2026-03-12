'use client'

import { useEffect,useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ProductsPage(){

const [name,setName] = useState('')
const [sku,setSku] = useState('')
const [stock,setStock] = useState(0)
const [cost,setCost] = useState(0)
const [price,setPrice] = useState(0)

const [products,setProducts] = useState<any[]>([])

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

async function addProduct(){

const { data:userData } = await supabase.auth.getUser()

await supabase
.from('products')
.insert([
{
name,
sku,
stock,
cost,
price,
user_id:userData.user?.id
}
])

setName('')
setSku('')
setStock(0)
setCost(0)
setPrice(0)

loadProducts()

}

return(

<div style={{padding:40}}>

<h1>Produtos</h1>

<input
placeholder="Nome do produto"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/>

<input
placeholder="SKU"
value={sku}
onChange={(e)=>setSku(e.target.value)}
/>

<br/>

<input
type="number"
placeholder="Estoque"
value={stock}
onChange={(e)=>setStock(Number(e.target.value))}
/>

<br/>

<input
type="number"
placeholder="Custo"
value={cost}
onChange={(e)=>setCost(Number(e.target.value))}
/>

<br/>

<input
type="number"
placeholder="Preço"
value={price}
onChange={(e)=>setPrice(Number(e.target.value))}
/>

<br/>

<button onClick={addProduct}>
Salvar produto
</button>

<h2>Lista de produtos</h2>

{products.map((p)=>(
<div key={p.id}>

<p>{p.name}</p>
<p>SKU: {p.sku}</p>
<p>Estoque: {p.stock}</p>

<hr/>

</div>
))}

</div>

)

}