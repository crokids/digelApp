import React from 'react'
import BackGround from '@/components/BackGround'
import OrderForm from '@/components/form/OrderForm'
import { getXataClient } from '@/lib/xata'

const xata = getXataClient()

export default function Order() {

    const getClient = async (cod) => {
        'use server'
        try {
          if (!cod) {
            throw new Error('Invalid client code');
          }
      
          const res = await xata.db.db_clientes.filter({
            COD: cod
          }).getMany();
      
          const clientsWithoutXata = res.map(client => {
            const { xata, ...clientWithoutXata } = client;
            return clientWithoutXata;
          });
      
          return clientsWithoutXata;
        } catch (error) {
          console.error('Error fetching client:', error.message);
          return null;
        }
      };
      
      


  return (
    <div className='flex w-full h-full'>
        <BackGround Order={<OrderForm getClient={getClient} />}/>
    </div>
  )
}
