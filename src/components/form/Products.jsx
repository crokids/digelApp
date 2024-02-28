'use client'

import React, {useState} from 'react'
import { Button, Form, Input, Card, List, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';


export default function Products({onProductsChange, products}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState([])
    const [listaProdutos, setListaProdutos] = useState([])
    const [quantity, setQuantity] = useState(0);

    const showModal = (id, name) => {
      setIsModalOpen(true)
      setSelected([id, name])  
    }
    
    const handleOk = () => {
      setIsModalOpen(false);
    
      // Create a copy of the existing products in listaProdutos array
      const updatedProducts = [...listaProdutos];
    
      // Push the selected item's information into the updatedProducts array
      updatedProducts.push({
        id: selected[0],
        name: selected[1],
        qnt: quantity
      });
    
      // Set the state with the updated array
      setListaProdutos(updatedProducts);
    
      // Reset quantity and selected array
      setQuantity(0);
      setSelected([]);
    
      console.log(updatedProducts);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
      setQuantity(0)
    };

    const handleQuantityChange = (e) => {
      setQuantity(parseInt(e.target.value, 10));
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
        <Card title={item.name}>
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
   <Modal title={selected[1]} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <label>Quantidade</label>
        <Input type='number'value={quantity} onChange={handleQuantityChange} />
      </Modal>


  </div>
  )
}
