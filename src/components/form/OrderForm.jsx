'use client'

import React, { useState } from 'react';
import { Input, Space, message } from 'antd';
import debounce from 'lodash.debounce';
import TableClient from '../Table';

export default function OrderForm({ getClient }) {
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const handleInput = debounce(async (event) => {
    const inputValue = parseInt(event.target.value, 10);

    try {
      if (!inputValue) {
        setData([])
        throw new Error('Digite um valor');
      }

      const res = await getClient(inputValue);

      if (res && res.length > 0) {
        setData(res);
        messageApi.open({
          type: 'success',
          content: 'Cliente encontrado',
        });
      } else {
        setData([])
        throw new Error('Cliente não encontrado');
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error.message,
      });
    }
  }, 1000);

  return (
    <div className='flex flex-col m-10 gap-5'>
      {contextHolder}
      <div>
        <h1>Informe o código do cliente</h1>
      </div>
      <div>
        <Space direction="vertical" size="large">
          <Input onChange={handleInput} type='number' placeholder='Código do cliente' />
        </Space>
      </div>
      <div>
        <TableClient data={data} />
      </div>
    </div>
  );
}
