'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleRegister() {

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (!error) {
      alert('Conta criada com sucesso')
    } else {
      alert('Erro ao criar conta')
    }
  }

  return (

    <div className="flex items-center justify-center h-screen">

      <div className="bg-white p-8 rounded shadow w-96">

        <h1 className="text-2xl font-bold mb-6">
          Criar Conta
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 w-full mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-green-600 text-white p-2 w-full rounded"
        >
          Criar Conta
        </button>

      </div>

    </div>

  )
}