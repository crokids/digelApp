'use client'

import React, { useState } from 'react';
import { Divider, Steps, theme } from 'antd';
import FormPedido  from '@/components/form/FormPedido'
import Products  from '@/components/form/Products'


const MainFormPedido = ({id, products}) => {
  const [current, setCurrent] = useState(0);
  const { token } = theme.useToken();
  const [nf, setNf] = useState(false)
  const [tipo_pgt, setTipo_pgt] = useState(false)
  const [produtos, setProdutos] = useState([])


  const onChange = (value) => {
    setCurrent(value);
  };

  const onFormChange = (data) => {
    setNf(data.nf)
    setTipo_pgt(data.tipo_pag)
  }

  const onProductsChange = (data) => {
    console.log(data)
  }


  const steps = [
    {
      title: 'First',
      content: <FormPedido onChangee={onFormChange} nf={nf} tipo_pgt={tipo_pgt}/>,
    },
    {
      title: 'Second',
      content: <Products onProductsChange={onProductsChange} products={products}  />,
    },
    {
      title: 'Last',
      content: 'Last-content',
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
    <>
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

    </>
  );
};
export default MainFormPedido;