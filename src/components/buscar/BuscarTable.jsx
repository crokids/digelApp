'use client'

import React from 'react';
import { Space, Table } from 'antd';

const columns = [
  {
    title: 'Data',
    dataIndex: 'data',
    key: 'data',
  },
  {
    title: 'Cod_cli',
    dataIndex: 'cliente',
    key: 'cliente',
  },
  {
    title: 'Cod_rota',
    dataIndex: 'cod_rota',
    key: 'cod_rota',
  },
  {
    title: 'NF',
    dataIndex: 'nf',
    key: 'nf',
  },
  {
    title: 'Tipo_pgt',
    dataIndex: 'tipo_pgt',
    key: 'tipo_pgt',
  },
  {
    title: 'Produtos',
    dataIndex: 'produtos',
    key: 'produtos',
  },
  {
    title: 'OBS',
    dataIndex: 'obs',
    key: 'obs',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Editar</a>
        <a>Deletar</a>
      </Space>
    ),
  },
];

export default function BuscarTable({tableData}) {

  if(!tableData) {

    return 
    
  }


  const transformedData = tableData.map((item, index) => {
    const formattedDate = new Date(item.Data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const nf = item.nf ? 'sim' : 'não';
    const tipo_pgt = item.tipo_pgt ? 'à vista' : 'a prazo';
  
    const produtos = item.produtos.map((produto) => (
      <div key={produto.id}>
        {produto.produto}: {produto.quantidade}
      </div>
    ));
  
    return {
      key: item.id,
      data: formattedDate,
      cliente: item.link.COD,
      cod_rota: item.cod_vendedor,
      nf: nf,
      tipo_pgt: tipo_pgt,
      produtos: produtos,
      obs: item.obs
    };
  });
  

  return (
    <div className='flex w-full h-full justify-center'>
        <Table style={{width: '80%'}} columns={columns} dataSource={transformedData} />
    </div>
  )
}
