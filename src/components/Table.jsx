'use client'

import React, { useState, useEffect } from 'react';
import { Table, Input, Space } from 'antd';
import { useRouter, usePathname } from 'next/navigation';

const columns = [
  {
    title: 'CLIENTE',
    dataIndex: 'CLIENTE',
    key: '1',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'CÓDIGO',
    dataIndex: 'COD',
    key: '2',
  },
  {
    title: 'CIDADE',
    dataIndex: 'CIDADE',
    key: '3',
  }
];

export default function TableClient({ data }) {
  const [dataSource, setDataSource] = useState([]);
  const [value, setValue] = useState('');
  const router = useRouter();
  const  pathname  = usePathname();

  useEffect(() => {
    let parsedData = data;
    if (typeof data === 'string') {
      try {
        parsedData = JSON.parse(data);
      } catch (error) {
        console.error('Error parsing data:', error);
        parsedData = [];
      }
    }
    const filteredData = parsedData.filter(entry =>
      entry.CLIENTE.toLowerCase().includes(value.toLowerCase())
    );
    setDataSource(filteredData);
  }, [data, value]);

  const handleRowClick = (record) => {
    router.push(`/order/${record}`);
  };

  const rowProps = (record) => {
    return {
      onClick: () => handleRowClick(record.id)
    };
  };

  return (
    <div>
      {pathname !== '/order' && (
        <Space
          align="center"
          style={{
            marginBottom: 16,
          }}
        >
          <Input
            placeholder="Digite um Nome"
            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
          />
        </Space>
      )}
      <Table
        rowKey="id"
        style={{
          overflow: 'auto'
        }}
        size='small'
        columns={columns}
        onRow={rowProps}
        dataSource={dataSource}
      />
    </div>
  );
}
