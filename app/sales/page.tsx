'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { calculateProfit } from '@/lib/profitCalculator'

export default function SalesPage(){

const [products,setProducts] = useState<any[]>([])
const [productId,setProductId] = useState('')

const [marketplace,setMarketplace] = useState('Shopee')
const [price,setPrice] = useState(0)
const [cost,setCost] = useState(0)
const [shipping,setShipping] = useState(0)

const [stores,setStores] = useState<any[]>([])
const [store,setStore] = useState('')

const [profitPreview,setProfitPreview] = useState(0)

useEffect(()=>{
loadProducts()
loadStores()
},[])

useEffect(()=>{

if(price || cost || shipping){

const result = calculateProfit(
marketplace,
Number(price),
Number(cost),
Number(shipping)
)

setProfitPreview(result.profit)

}

},[price,cost,shipping,marketplace])

async function loadProducts(){

const { data } = await supabase
.from('products')
.select('*')

if(data){
setProducts(data)
}

}

async function loadStores(){

const { data } = await supabase
.from('stores')
.select('*')

if(data){
setStores(data)
}

}

function handleProductChange(id:string){

setProductId(id)

const selected = products.find((p)=>p.id === id)

if(selected){
setCost(Number(selected.cost))
}

}

async function handleSale(e:any){

e.preventDefault()

const result = calculateProfit(
marketplace,
price,
cost,
shipping
)

const { data:userData } = await supabase.auth.getUser()

const { error } = await supabase
.from('sales')
.insert([
{
product_id:productId,
marketplace,
price,
cost,
shipping,
profit: result.profit,
store_id:store,
user_id:userData.user?.id
}
])

if(error){

alert(error.message)

}else{

if(productId){

const { data:product } = await supabase
.from('products')
.select('stock')
.eq('id',productId)
.single()

if(product){

await supabase
.from('products')
.update({
stock: product.stock - 1
})
.eq('id',productId)

}

}

alert('Venda registrada com sucesso')

setProductId('')
setPrice(0)
setCost(0)
setShipping(0)
setProfitPreview(0)

}

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Registrar Venda
</h1>

<form
onSubmit={handleSale}
className="grid gap-4 max-w-md"
>

<select
className="border p-2"
value={productId}
onChange={(e)=>handleProductChange(e.target.value)}
>

<option value="">Escolher produto</option>

{products.map((p)=>(
<option key={p.id} value={p.id}>
{p.name}
</option>
))}

</select>

<select
className="border p-2"
value={marketplace}
onChange={(e)=>setMarketplace(e.target.value)}
>

<option>Shopee</option>
<option>MercadoLivre</option>
<option>Amazon</option>

</select>

<select
className="border p-2"
value={store}
onChange={(e)=>setStore(e.target.value)}
>

<option value="">Escolher loja</option>

{stores.map((s)=>(
<option key={s.id} value={s.id}>
{s.name} - {s.marketplace}
</option>
))}

</select>

<input
type="number"
placeholder="Preço de venda"
className="border p-2"
value={price}
onChange={(e)=>setPrice(Number(e.target.value))}
/>

<input
type="number"
placeholder="Custo do produto"
className="border p-2"
value={cost}
onChange={(e)=>setCost(Number(e.target.value))}
/>

<input
type="number"
placeholder="Frete"
className="border p-2"
value={shipping}
onChange={(e)=>setShipping(Number(e.target.value))}
/>

<div className="bg-gray-100 p-3 rounded">
Lucro estimado:
<strong> R$ {profitPreview.toFixed(2)}</strong>
</div>

<button
className="bg-green-600 text-white p-2 rounded"
>
Salvar venda
</button>

</form>

</div>

)

}