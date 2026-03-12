import Link from "next/link"
import "./globals.css"
<Link href="/admin">Admin</Link>

export default function RootLayout({
children,
}:{
children: React.ReactNode
}){

return(

<html lang="pt-BR">

<body>

<div style={{display:'flex',minHeight:'100vh'}}>

<aside style={{
width:'220px',
background:'#111',
color:'#fff',
padding:'20px'
}}>

<h2>SellerControll</h2>

<nav style={{display:'grid',gap:'10px',marginTop:'20px'}}>

<Link href="/dashboard">Dashboard</Link>

<Link href="/sales">Vendas</Link>

<Link href="/products">Produtos</Link>

<Link href="/stores">Lojas</Link>

<Link href="/inventory">Estoque</Link>

</nav>

</aside>

<main style={{
flex:1,
padding:'30px',
background:'#f5f5f5'
}}>

{children}

</main>

</div>

</body>

</html>

)

}