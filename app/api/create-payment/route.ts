import { NextResponse } from 'next/server'

export async function POST(req: Request){

  try {

    const { userId } = await req.json()

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        items: [
          {
            title: 'Plano PRO - SellerControl',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: 29.9
          }
        ],
        metadata: {
          user_id: userId
        },
        notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/create-payment/webhook`,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
        },
        auto_return: 'approved'
      })
    })

    const data = await response.json()

    return NextResponse.json(data)

  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar pagamento' }, { status: 500 })
  }

}