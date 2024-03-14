'use client'

import React, { useState, useEffect } from 'react';
import { DatePicker, Button, Select } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons'
import locale from 'antd/es/date-picker/locale/pt_BR';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function DateComponent({searchPedidos, getData}) {
    const [dateRange, setDateRange] = useState([dayjs().startOf('day'), dayjs().endOf('day')]);
    const [data, setData] = useState([])
    
    const callBack = async (cod) => {

        const strigFy = JSON.stringify(dateRange)
        const res = await searchPedidos(strigFy, cod)

         const parsedRes = JSON.parse(res)
         getData(parsedRes)
         setData(parsedRes)

    }

    
    const handleSelectChange = (value) => {
            callBack(value)
    }

    const handleDateChange = async (dates) => {
        if (dates) {
            setDateRange(dates);
        }
    };

    function downloadCSV(data) {
        if (!data.length) {
            return;
        }
    
        const allProducts = [
            '01-30GR QUEIJO', '02-30GR CEBOLA', '04-30GR G.CAIPIRA',
            '05-30GR PRESUNTO', '07-30GR CHURRASCO', '11-60GR S.QUEIJAO',
            '12-60GR S.CEBOLA', '13-60GR S.GALINHA', '14-60GR S.PRESUNTO',
            '21-40GR QUEIJO', '22-40GR CEBOLA', '23-40GR GALINHA','24-40GR PRESUNTO',
            '31-50GR QUEIJO', '32-50GR CEBOLA', '33-50GR GALINHA', '34-50GR PRESUNTO',
            '35-50GR PALITAO'
        ];
    
        let csvContent = 'Data;Cod_cli;cod_vendedor;tipo_pgt;nf;obs;';
        allProducts.forEach((product, index) => {
            csvContent += `Produto${index + 1};Quantidade${index + 1};`;
        });
        csvContent += '\n';
    
        data.forEach(order => {
            const formattedDate = dayjs(order.Data).locale('pt-BR').format('DD/MM/YYYY');
            const tipo_pgt_value = order.tipo_pgt ? 'AV' : 'AP';
            csvContent += `${formattedDate};${order.link.COD};${order.cod_vendedor};${tipo_pgt_value};${order.nf};${order.obs};`;

            const productQuantities = new Map();
    
            order.produtos.forEach(product => {
    
                productQuantities.set(product.produto, product.quantidade);
            });
    
    
            allProducts.forEach(product => {
                const quantity = productQuantities.has(product) ? productQuantities.get(product) : 0;
                csvContent += `${product};${quantity};`;
            });
    
            csvContent += '\n';
        });
    
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Pedidos.csv');
        document.body.appendChild(link);
        link.click();
    
        document.body.removeChild(link);
    }
    
    
    
    

    return (
        <div className='flex flex-row w-full justify-center gap-10'>
            <div>
            <RangePicker format={'DD/MM/YYYY'} locale={locale} defaultValue={dateRange} onChange={handleDateChange} />
            </div>
                        <div>
                        <Select
                        defaultValue={"selecione..."}
                
                style={{
                    width: 120,
                }}
                onChange={handleSelectChange}
                options={[
                    {
                    value: '9',
                    label: 'RotaInterior',
                    },
                    {
                    value: '8',
                    label: 'RotaCidade',
                    },
                ]}
                />
            </div>
            {data.length > 0 && (
            <div>
            <Button 
            onClick={() => downloadCSV(data)} 
            icon={<FileExcelOutlined style={{fontSize: '18px'}} />}>download</Button>
            </div>
            )}     
        </div>
    );
}
