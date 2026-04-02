'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // 🔥 LOGIN DIRETO E RÁPIDO
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // 🔥 REDIRECIONAMENTO MAIS RÁPIDO POSSÍVEL
    if (data?.session) {
      window.location.href = '/dashboard'
      return
    }

    setLoading(false)
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-4">Login</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

      </form>

    </div>
  )
}