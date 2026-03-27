'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function ProtectedRoute({ children }: any){

  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(()=>{

    if(!loading && !user){
      router.push('/login')
    }

  },[user, loading])

  if(loading) return <p>Carregando...</p>

  if(!user) return null

  return children
}