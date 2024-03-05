'use client'
import React, {useState} from 'react'
import { List, Button, message } from 'antd'
import { useUser } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'

export default function CheckOutForm({cart, tipo_pgt, nf, fazpedido, obs}) {
        const router = useRouter()
        const [messageApi, contextHolder] = message.useMessage();
        const [loading, setLoading] = useState(false)
        const { user } = useUser();
        const vendedorId = user.publicMetadata.cod
        const vendedorNome = user.lastName

        const success = () => {
            messageApi.open({
              type: 'success',
              content: 'Pedido enviado com sucesso!',
            });
          };

      const data2 = cart.map(item => `${item.produto} : ${item.quantidade}`);

    
      const data1 = [
        `Rota: ${vendedorNome}`,
        `Código da rota: ${vendedorId}`,
        `Nota fiscal: ${nf ? 'sim' : 'não'}`,
        `Tipo de pagamento: ${tipo_pgt ? 'à vista' : 'a prazo'}`,
        `Observação: ${obs ? obs : 'sem observações'}`
    ];

        const onButtonClick = async () => {
            setLoading(true)
            const res = await fazpedido(cart, vendedorId, nf, tipo_pgt, obs )
            if (res === 'ok') {
                setLoading(false)
                success()
                router.push('/')
                await new Promise(resolve => setTimeout(resolve, 2000));
                router.refresh()
            }else return 
        }



  return (
    <>
     {contextHolder}
    <div className='flex flex-col w-full h-full'>     
    <div className='flex flex-col md:flex-row w-full md:m-5 justify-center gap-2'>
        <div className='w-full md:w-[45%]'>
    <List
      size="small"
      header={<div>Informações</div>}   
      bordered
      dataSource={data1}
      renderItem={(item) =><List.Item>{item}</List.Item>}
    />
    </div>
    <div className='w-full md:w-[45%]'>
    <List
      size="small"
      header={<div>Items</div>}
      bordered
      dataSource={data2}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
    </div>
    </div>
    <div className='flex items-center justify-center m-5 pl-5'>
      <Button loading={loading} type='primary' onClick={onButtonClick}>Enviar</Button>
    </div>
    </div>
    </>
  )
}
