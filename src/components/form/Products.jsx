'use client'

import React, {useState} from 'react'
import { Button, Input, Card, List, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';


export default function Products({onProductsChange, products}) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [quantidade, setQuantidade] = useState(0)
    const [produto, setProduto] = useState([])


    const showModal = (id, name) => {
      setProduto({
        id: id,
        produto: name
      })
      setIsModalOpen(true)
    }
    
    const handleOk = () => { 
      onProductsChange(produto, quantidade)
      setQuantidade(0)
      setIsModalOpen(false)
     
    
    }
    


    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const handleQuantityChange = (e) => {
        const event = parseInt(e.target.value, 10)
        setQuantidade(event)
    };
    

  return (
    <div> 
<List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }}
    dataSource={products}
    renderItem={(item) => (
      <List.Item>
        <Card title={item.name} id={item.id}>
          <div className='flex flex-row justify-between'>
          <Image alt='testeImg' width={50} height={50} src={item.img_url}/>
          <div className='flex flex-col justify-end'>
          <Button 
            type="primary" 
            shape="circle" 
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            icon={<PlusCircleOutlined style={{fontSize: '28px'}} />} 
            onClick={() => showModal(item.id, item.name)}
            />
          </div>
          </div>
          </Card>
      </List.Item>
    )}
  />
   <Modal title={produto.produto} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <label>Quantidade</label>
        <Input type='number' value={quantidade} onChange={handleQuantityChange} />
      </Modal>


  </div>
  )
}
