'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useAuth(){

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {

    async function loadUser(){

      const { data: { session } } = await supabase.auth.getSession()

      if(session?.user){
        setUser(session.user)

        // 🔥 busca perfil com tratamento de erro
        const { data, error } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', session.user.id)
          .maybeSingle()

        if(error){
          console.error('Erro ao buscar profile:', error.message)
        }

        if(data){
          setIsPro(data.is_pro)
        }
      }

      setLoading(false)
    }

    loadUser()

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {

        if(session?.user){
          setUser(session.user)

          const { data, error } = await supabase
            .from('profiles')
            .select('is_pro')
            .eq('id', session.user.id)
            .maybeSingle()

          if(error){
            console.error('Erro ao buscar profile:', error.message)
          }

          if(data){
            setIsPro(data.is_pro)
          }

        } else {
          setUser(null)
          setIsPro(false)
        }

        setLoading(false)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }

  }, [])

  return {
    user,
    loading,
    isPro
  }

}