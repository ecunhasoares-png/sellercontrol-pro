'use client'

import { useEffect,useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage(){

const [users,setUsers] = useState<any[]>([])
const [subscriptions,setSubscriptions] = useState<any[]>([])

useEffect(()=>{

loadUsers()
loadSubscriptions()

},[])

async function loadUsers(){

const { data } = await supabase
.from('users')
.select('*')

if(data){

setUsers(data)

}

}

async function loadSubscriptions(){

const { data } = await supabase
.from('subscriptions')
.select('*')

if(data){

setSubscriptions(data)

}

}

return(

<div style={{padding:40}}>

<h1>Painel Admin</h1>

<h2>Usuários cadastrados</h2>

{users.map((u)=>(
<div key={u.id}>

<p>{u.email}</p>

</div>
))}

<h2>Assinaturas</h2>

{subscriptions.map((s)=>(
<div key={s.id}>

<p>Usuário: {s.user_id}</p>
<p>Plano: {s.plan}</p>
<p>Status: {s.status}</p>

<hr/>

</div>
))}

</div>

)

}