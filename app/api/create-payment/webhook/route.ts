import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request){

  try {

    const body = await req.json()

    // 🔥 Mercado Pago envia o tipo
    if(body.type === 'payment'){

      const paymentId = body.data.id

      // 🔥 BUSCAR PAGAMENTO
      const payment = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
        }
      })

      const paymentData = await payment.json()

      // 🔥 SE APROVADO
      if(paymentData.status === 'approved'){

        const userId = paymentData.metadata.user_id

        // 🔥 ATUALIZA USUÁRIO PARA PRO
        await supabase
          .from('profiles')
          .update({ is_pro: true })
          .eq('id', userId)

      }

    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    return NextResponse.json({ error: 'Erro webhook' }, { status: 500 })
  }

}