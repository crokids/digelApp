'use client'

import React, { useState } from 'react';
import { Divider, Steps, theme } from 'antd';
import FormPedido from '@/components/form/FormPedido';
import Products from '@/components/form/Products';
import Cart from '../Cart';
import CheckOut  from './CheckOut';

const MainFormPedido = ({ id, products, sendOrder }) => {
  const [current, setCurrent] = useState(0);
  const { token } = theme.useToken();
  const [nf, setNf] = useState(false);
  const [tipo_pgt, setTipo_pgt] = useState(false);
  const [cart, setCart] = useState([]);

  const onChange = (value) => {
    setCurrent(value);
  };

  const onFormChange = (data) => {
    setNf(data.nf);
    setTipo_pgt(data.tipo_pag);
  };

  const onProductsChange = (item, quantidade) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantidade += quantidade;
    } else {
      updatedCart.push({
        id: item.id,
        produto: item.produto,
        quantidade: quantidade,
      });
    }
    setCart(updatedCart);
  };

  const handleDeleteItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const steps = [
    {
      title: 'First',
      content: <FormPedido onChangee={onFormChange} nf={nf} tipo_pgt={tipo_pgt} />,
    },
    {
      title: 'Second',
      content: <Products onProductsChange={onProductsChange} products={products} />,
    },
    {
      title: 'Last',
      content: <CheckOut fazpedido={sendOrder} cart={cart} tipo_pgt={tipo_pgt} nf={nf} />,
    },
  ];

  const contentStyle = {
    lineHeight: '480px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div className="grid w-full h-full gap-5">
      <div className="flex justify-center md:justify-end pr-5 pb-3">
        <Cart items={cart} onDeleteItem={handleDeleteItem} />
      </div>
      <Steps
        current={current}
        onChange={onChange}
        items={[
          {
            title: 'Passo 1',
            description: 'Informações cliente',
          },
          {
            title: 'Passo 2',
            description: 'Produtos',
          },
          {
            title: 'passo 3',
            description: 'confirmação',
          },
        ]}
      />
      <div style={contentStyle}>{steps[current].content}</div>
      <Divider />
    </div>
  );
};

export default MainFormPedido;
