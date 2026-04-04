import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: Request){

  try {

    const body = await req.json()

    if(body.type !== 'payment'){
      return NextResponse.json({ ok: true })
    }

    const paymentId = body.data.id

    const payment = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
      }
    })

    const paymentData = await payment.json()

    if(paymentData.status === 'approved'){

      const userId = paymentData.metadata?.user_id

      if(!userId){
        console.error('user_id não encontrado')
        return NextResponse.json({ ok: true })
      }

      // 🔥 evita atualizar várias vezes
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('is_pro')
        .eq('id', userId)
        .single()

      if(profile?.is_pro){
        return NextResponse.json({ ok: true })
      }

      await supabaseAdmin
        .from('profiles')
        .update({ is_pro: true })
        .eq('id', userId)

      console.log('Usuário virou PRO:', userId)
    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro webhook' }, { status: 500 })
  }

}