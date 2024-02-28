import React from 'react'
import BackGround from '@/components/BackGround'
import MainFormPedido from '@/components/form/MainFormPedido'
import { GetProducts } from '@/utils/GetClienteData'

export default async function OrderPage({params}) {

      const products = await GetProducts()
  
  return (
    <div className="flex w-full h-full">
      <BackGround MainFormPedido={<MainFormPedido id={params.id} products={products}/>} />
    </div>
  )
}
