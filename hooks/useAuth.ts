'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useAuth(){

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {

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

    supabase.auth.getSession().then(({ data }) => {
      if(data.session?.user){
        setUser(data.session.user)
      }
      setLoading(false)
    })

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