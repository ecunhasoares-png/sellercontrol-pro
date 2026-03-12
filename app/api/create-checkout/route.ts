import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {

  const { plan } = await req.json()

  const priceMap = {
    basic: 'price_basic_id',
    pro: 'price_pro_id',
    premium: 'price_premium_id'
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceMap[plan],
        quantity: 1
      }
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`
  })

  return Response.json({ url: session.url })

}