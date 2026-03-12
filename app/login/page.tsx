'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {

  const router = useRouter()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  async function handleLogin(e:any){

    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      alert(error.message)
    }else{
      router.push('/dashboard')
    }

  }

  return(

    <div className="flex items-center justify-center h-screen">

      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-80">

        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-4"
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="password"
        placeholder="Senha"
        className="border p-2 w-full mb-4"
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white p-2 w-full rounded">
        Entrar
        </button>

      </form>

    </div>

  )
}