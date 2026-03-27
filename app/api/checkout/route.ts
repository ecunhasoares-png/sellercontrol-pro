import { NextResponse } from 'next/server'

export async function POST(req:Request){

const { plan } = await req.json()

const priceMap:any = {
pro: 29.90,
premium: 59.90
}

const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
},
body: JSON.stringify({
items: [
{
title: `Plano ${plan.toUpperCase()}`,
quantity: 1,
unit_price: priceMap[plan]
}
],
back_urls: {
success: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
failure: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`
},
auto_return: 'approved'
})
})

const data = await response.json()

return NextResponse.json({
url: data.init_point
})

}