import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

  const { priceId, userId } = await req.json()

  const session = await stripe.checkout.sessions.create({

    mode: "subscription",

    client_reference_id: userId,

    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],

    success_url: "http://localhost:3000/dashboard",
    cancel_url: "http://localhost:3000/pricing"

  })

  return NextResponse.json({ url: session.url })
}