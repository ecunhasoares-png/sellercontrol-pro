'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function ProtectedRoute({ children }: any){

  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if(!loading && !user){
      router.replace('/login')
    }
  }, [user, loading])

  if(loading){
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando seu dashboard...</p>
      </div>
    )
  }

  if(!user) return null

  return children
}