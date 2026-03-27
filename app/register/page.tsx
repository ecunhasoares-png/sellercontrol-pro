'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function RegisterPage(){

  const router = useRouter()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState('')

  async function handleRegister(){
    if(loading) return

    setLoading(true)
    setMessage('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if(error){
      setMessage(error.message)
      setLoading(false)
      return
    }

    // 🔥 cria perfil no banco
    if(data.user){
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email,
          is_pro: false
        })

      if(profileError){
        console.log('Erro ao criar perfil:', profileError.message)
      }
    }

    // ✅ feedback visual
    setMessage('Conta criada! Verifique seu email...')

    // 🔥 REDIRECIONAMENTO GARANTIDO
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  }

  return(

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-80">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Criar Conta
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 w-full mb-4"
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-green-600 text-white p-2 w-full rounded"
        >
          {loading ? 'Criando...' : 'Criar Conta'}
        </button>

        {message && (
          <p className="text-sm text-center mt-4 text-gray-600">
            {message}
          </p>
        )}

        <p className="text-sm text-center mt-4">
          Já tem conta?{' '}
          <span
            onClick={()=>router.push('/login')}
            className="text-blue-600 cursor-pointer"
          >
            Entrar
          </span>
        </p>

      </div>

    </div>

  )

}