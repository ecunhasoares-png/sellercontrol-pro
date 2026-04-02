'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

// 🔥 TAXAS CENTRALIZADAS
const marketplaceFees: any = {
  shopee: { name: 'Shopee', fee: 0.14 },
  mercado_livre: { name: 'Mercado Livre', fee: 0.16 },
  amazon: { name: 'Amazon', fee: 0.15 }
}

export default function ProductsPage(){

  const [products,setProducts] = useState<any[]>([])
  const [name,setName] = useState('')
  const [cost,setCost] = useState(0)
  const [stock,setStock] = useState(0)
  const [platform,setPlatform] = useState('')

  useEffect(()=>{
    loadProducts()
  },[])

  async function loadProducts(){
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if(data){
      setProducts(data)
    }
  }

  async function createProduct(){

    if(!platform){
      alert('Escolha a plataforma')
      return
    }

    const fee = marketplaceFees[platform].fee

    await supabase
      .from('products')
      .insert({
        name,
        cost,
        stock,
        platform,
        fee
      })

    // limpar campos
    setName('')
    setCost(0)
    setStock(0)
    setPlatform('')

    loadProducts()
  }

  return(

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Produtos
      </h1>

      <div className="grid gap-3 max-w-md mb-8">

        <input
          placeholder="Nome do produto"
          className="border p-2"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Custo"
          className="border p-2"
          value={cost}
          onChange={(e)=>setCost(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Estoque"
          className="border p-2"
          value={stock}
          onChange={(e)=>setStock(Number(e.target.value))}
        />

        {/* 🔥 NOVO: PLATAFORMA */}
        <select
          className="border p-2"
          value={platform}
          onChange={(e)=>setPlatform(e.target.value)}
        >
          <option value="">Escolha a plataforma</option>
          <option value="shopee">Shopee</option>
          <option value="mercado_livre">Mercado Livre</option>
          <option value="amazon">Amazon</option>
        </select>

        {/* 🔥 MOSTRA TAXA AUTOMÁTICA */}
        {platform && (
          <p className="text-sm text-gray-500">
            Taxa: {(marketplaceFees[platform].fee * 100).toFixed(0)}%
          </p>
        )}

        <button
          onClick={createProduct}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Cadastrar produto
        </button>

      </div>

      <h2 className="text-xl font-bold mb-4">
        Lista de produtos
      </h2>

      <div className="grid gap-2">

        {products.map((p)=>(
          <div
            key={p.id}
            className="border p-3 rounded flex justify-between items-center"
          >

            <div>
              <p className="font-bold">{p.name}</p>
              <p className="text-sm text-gray-500">
                {p.platform} • Taxa {(p.fee * 100).toFixed(0)}%
              </p>
            </div>

            <span>Estoque: {p.stock}</span>

          </div>
        ))}

      </div>

    </div>
  )
}