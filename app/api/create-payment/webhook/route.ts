import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (body.type === 'payment') {

      const paymentId = body.data.id

      const payment = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
          }
        }
      )

      const paymentData = await payment.json()

      if (paymentData.status === 'approved') {

        const userId = paymentData.metadata.user_id

        await supabaseAdmin
          .from('profiles')
          .update({ is_pro: true })
          .eq('id', userId)

      }
    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erro webhook' },
      { status: 500 }
    )
  }
}