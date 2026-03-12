import { headers } from "next/headers"
import Stripe from "stripe"
import { supabase } from "@/lib/supabase"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {

const body = await req.text()

const headersList = await headers()
const sig = headersList.get("stripe-signature")

let event

try {

event = stripe.webhooks.constructEvent(
body,
sig!,
process.env.STRIPE_WEBHOOK_SECRET!
)

} catch (err) {

return new Response("Webhook Error", { status: 400 })

}

if(event.type === "checkout.session.completed"){

const session:any = event.data.object

await supabase
.from("subscriptions")
.insert([
{
user_id: session.client_reference_id,
plan: "pro",
status: "active",
stripe_customer_id: session.customer,
stripe_subscription_id: session.subscription
}
])

}

return new Response("ok")

}