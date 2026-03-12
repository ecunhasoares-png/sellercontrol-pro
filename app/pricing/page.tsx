'use client'

import { supabase } from '@/lib/supabase'

export default function PricingPage(){

async function selectPlan(priceId: string) {

  const { data } = await supabase.auth.getUser()

  const res = await fetch("/api/create-checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      priceId,
      userId: data.user?.id
    })
  })

  const result = await res.json()

  window.location.href = result.url
}

return(

<div style={{padding:40}}>

<h1>Escolha seu plano</h1>

<h2>Basic</h2>
<p>Até 50 produtos</p>
<button onClick={()=>selectPlan('price_basic')}>
Assinar Basic
</button>

<hr/>

<h2>Pro</h2>
<p>Até 500 produtos</p>
<button onClick={()=>selectPlan('price_pro')}>
Assinar Pro
</button>

<hr/>

<h2>Premium</h2>
<p>Produtos ilimitados</p>
<button onClick={()=>selectPlan('price_premium')}>
Assinar Premium
</button>

</div>

)

}