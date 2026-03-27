import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // só processa eventos de pagamento
    if (body.type !== 'payment') {
      return NextResponse.json({ ignored: true })
    }

    const paymentId = body.data.id

    // buscar pagamento no Mercado Pago
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
        }
      }
    )

    const payment = await response.json()

    // valida pagamento aprovado
    if (payment.status !== 'approved') {
      return NextResponse.json({ status: 'not approved' })
    }

    // pegar user_id enviado no pagamento
    const userId = payment.metadata?.user_id

    if (!userId) {
      console.log('❌ user_id não encontrado no metadata')
      return NextResponse.json({ error: 'sem user_id' })
    }

    // 🔥 liberar PRO
    const { error } = await supabase
      .from('profiles')
      .update({ is_pro: true })
      .eq('id', userId)

    if (error) {
      console.log('❌ erro ao atualizar:', error.message)
      return NextResponse.json({ error: 'erro banco' })
    }

    console.log('✅ usuário virou PRO:', userId)

    return NextResponse.json({ success: true })

  } catch (err) {
    console.log('🔥 erro webhook:', err)
    return NextResponse.json({ error: 'erro interno' }, { status: 500 })
  }
}