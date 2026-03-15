'use client'

import { useEffect,useState } from 'react'
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

async function saveProduct(e:any){

e.preventDefault()

const { data:userData } = await supabase.auth.getUser()

const { error } = await supabase
.from('products')
.insert([
{
name,
cost,
stock,
user_id:userData.user?.id
}
])

if(error){
alert(error.message)
}else{
alert('Produto cadastrado')
setName('')
setCost(0)
setStock(0)
loadProducts()
}

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Produtos
</h1>

<form
onSubmit={saveProduct}
className="grid gap-4 max-w-md mb-10"
>

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

<button className="bg-blue-600 text-white p-2 rounded">
Cadastrar produto
</button>

</form>

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

<span>
Estoque: {p.stock}
</span>

</div>
))}

</div>

</div>

)

}