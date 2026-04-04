'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useAuth(){

  const [user, setUser] = useState<any>(null)
  const [isPro, setIsPro] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    let mounted = true

    async function loadInitialSession(){
      const { data } = await supabase.auth.getSession()

      if(!mounted) return

      if(data.session?.user){
        setUser(data.session.user)
        await loadProfile(data.session.user.id)
      }

      setLoading(false)
    }

    async function loadProfile(userId: string){

      const { data, error } = await supabase
        .from('profiles')
        .select('is_pro, trial_ends_at') // 🔥 IMPORTANTE
        .eq('id', userId)
        .maybeSingle()

      if(error){
        console.error('Erro profile:', error.message)
        return
      }

      if(data){

        const now = new Date()
        const isTrialActive =
          data.trial_ends_at &&
          new Date(data.trial_ends_at) > now

        // 🔥 REGRA FINAL
        setIsPro(data.is_pro || isTrialActive)
      }
    }

    loadInitialSession()

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {

        if(!mounted) return

        if(session?.user){
          setUser(session.user)
          await loadProfile(session.user.id)
        } else {
          setUser(null)
          setIsPro(false)
        }

        setLoading(false)
      }
    )

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }

  }, [])

  return { user, isPro, loading }
}