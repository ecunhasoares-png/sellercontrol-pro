import { NextResponse } from 'next/server'

export async function POST(req: Request){

  try {

    // 🔥 lê body UMA VEZ
    const { userId, plan } = await req.json()

    if(!userId){
      return NextResponse.json(
        { error: 'Usuário não informado' },
        { status: 400 }
      )
    }

    // 🔥 define plano
    const price = plan === 'annual' ? 297 : 29.9

    const title = plan === 'annual'
      ? 'Plano PRO Anual - SellerControl'
      : 'Plano PRO Mensal - SellerControl'

    // 🔥 cria pagamento
    const response = await fetch(
      'https://api.mercadopago.com/checkout/preferences',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          items: [
            {
              title,
              quantity: 1,
              currency_id: 'BRL',
              unit_price: price
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
      }
    )

    const data = await response.json()

    return NextResponse.json(data)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Erro ao criar pagamento' },
      { status: 500 }
    )
  }

}