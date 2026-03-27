import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key: string) => cookieStore.get(key)?.value,
        set: (key: string, value: string, options: any) => {
          cookieStore.set({ name: key, value, ...options })
        },
        remove: (key: string, options: any) => {
          cookieStore.set({ name: key, value: '', ...options })
        },
      },
    }
  )

  // troca o code por sessão
  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  // redireciona após login
  return NextResponse.redirect(new URL('/dashboard', request.url))
}