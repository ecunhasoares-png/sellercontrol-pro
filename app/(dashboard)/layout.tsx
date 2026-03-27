export default function DashboardLayout({
children,
}:{
children: React.ReactNode
}){

return(

<div style={{display:'flex'}}>

<aside style={{
width:220,
background:'#111',
color:'#fff',
minHeight:'100vh',
padding:20
}}>

<h2>SellerControl</h2>

<nav style={{display:'grid',gap:10,marginTop:20}}>

<a href="/dashboard">Dashboard</a>
<a href="/sales">Vendas</a>
<a href="/products">Produtos</a>
<a href="/stores">Lojas</a>
<a href="/inventory">Estoque</a>

</nav>

</aside>

<main style={{flex:1,padding:30}}>
{children}
</main>

</div>

)

}