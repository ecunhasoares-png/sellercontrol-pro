'use client'

import { useEffect,useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function StoresPage(){

const [stores,setStores] = useState<any[]>([])
const [name,setName] = useState('')
const [marketplace,setMarketplace] = useState('Shopee')

useEffect(()=>{
loadStores()
},[])

async function loadStores(){

const { data } = await supabase
.from('stores')
.select('*')

if(data){
setStores(data)
}

}

async function saveStore(e:any){

e.preventDefault()

const { data:userData } = await supabase.auth.getUser()

const { error } = await supabase
.from('stores')
.insert([
{
name,
marketplace,
user_id:userData.user?.id
}
])

if(error){
alert(error.message)
}else{
alert('Loja cadastrada')
setName('')
loadStores()
}

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Lojas
</h1>

<form
onSubmit={saveStore}
className="grid gap-4 max-w-md mb-10"
>

<input
placeholder="Nome da loja"
className="border p-2"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<select
className="border p-2"
value={marketplace}
onChange={(e)=>setMarketplace(e.target.value)}
>

<option>Shopee</option>
<option>MercadoLivre</option>
<option>Amazon</option>

</select>

<button className="bg-blue-600 text-white p-2 rounded">
Cadastrar loja
</button>

</form>

<h2 className="text-xl font-bold mb-4">
Lista de lojas
</h2>

<div className="grid gap-2">

{stores.map((s)=>(
<div
key={s.id}
className="border p-3 rounded flex justify-between"
>

<span>{s.name}</span>

<span>{s.marketplace}</span>

</div>
))}

</div>

</div>

)

}