'use client'

import { useEffect,useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function StoresPage(){

const [name,setName] = useState('')
const [marketplace,setMarketplace] = useState('')
const [stores,setStores] = useState<any[]>([])

useEffect(()=>{
loadStores()
},[])

async function loadStores(){

const { data } = await supabase
.from('stores')
.select('*')

if(data) setStores(data)

}

async function addStore(){

const { data:userData } = await supabase.auth.getUser()

await supabase
.from('stores')
.insert([
{
name,
marketplace,
user_id:userData.user?.id
}
])

setName('')
setMarketplace('')

loadStores()

}

return(

<div style={{padding:40}}>

<h1>Minhas Lojas</h1>

<input
placeholder="Nome da loja"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/>

<select
value={marketplace}
onChange={(e)=>setMarketplace(e.target.value)}
>

<option value="">Marketplace</option>
<option>Shopee</option>
<option>Mercado Livre</option>
<option>Amazon</option>

</select>

<br/>

<button onClick={addStore}>
Cadastrar loja
</button>

<h2>Lojas cadastradas</h2>

{stores.map((s)=>(
<div key={s.id}>

<p>{s.name}</p>
<p>{s.marketplace}</p>

<hr/>

</div>
))}

</div>

)

}