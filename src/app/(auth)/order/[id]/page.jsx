import React from 'react'
import BackGround from '@/components/BackGround'
import MainFormPedido from '@/components/form/MainFormPedido'
import { GetProducts } from '@/utils/GetClienteData'
import { getXataClient } from '@/lib/xata'

const xata= getXataClient()

export default async function OrderPage({params}) {

      const products = await GetProducts()

      const sendOrder = async(data, cod, nf, pgt) => {
        'use server'

        const record = await xata.db.Pedidos.create({
          Data: new Date(),
          link: params.id,
          cod_vendedor: cod,
          tipo_pgt: pgt,
          nf: nf,
          produtos: data,
        })

          return 'ok'
      }  
  return (
    <div className="flex w-full h-full">
      <BackGround MainFormPedido={<MainFormPedido id={params.id} products={products} sendOrder={sendOrder} />} />
    </div>
  )
}
