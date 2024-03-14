import React from 'react'
import BuscarMain from '@/components/buscar/BuscarMain'
import BackGround from '@/components/BackGround'
import { getXataClient } from '@/lib/xata'

const xata = getXataClient()

export default function Pedidos() {

  const searchPedidos = async(dateRange, cod) => {
    'use server'

   const parsedDate = JSON.parse(dateRange)

   

    const startDate = new Date(parsedDate[0]);
    const endDate = new Date(parsedDate[1]);

    startDate.setHours(startDate.getHours() - (startDate.getTimezoneOffset() / 60));
    endDate.setHours(endDate.getHours() - (endDate.getTimezoneOffset() / 60));


    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    endDate.setHours(44)
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    endDate.setMilliseconds(999);

    const res = await xata.db.Pedidos.filter({
        $all: [
            {
                'Data': { $ge: startDate }
            },
            {
                'Data': { $lt: endDate }
            }
        ],
        "cod_vendedor" : parseInt(cod)
    })
    .select(["*" , 'link.COD', 'link.CLIENTE'])
    .getAll();

    const stringfyRes = JSON.stringify(res);

    return stringfyRes;
}


  return (
    <div className='flex w-full h-full'>
      <BackGround buscar={<BuscarMain searchPedidos={searchPedidos} />} />
    </div>
  )
}
