'use client'

import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons'
import locale from 'antd/es/date-picker/locale/pt_BR';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function DateComponent({searchPedidos, getData}) {
    const [dateRange, setDateRange] = useState([dayjs().startOf('day'), dayjs().endOf('day')]);
    const [data, setData] = useState([])

    const handleDateChange = async (dates) => {
        if (dates) {
            setDateRange(dates);
            const strigFy = JSON.stringify(dates)
           const res = await searchPedidos(strigFy)

            const parsedRes = JSON.parse(res)
            getData(parsedRes)
            setData(parsedRes)
        }
    };

    function downloadCSV(data) {
        if (!data.length) {
            return;
        }
    
        let csvContent = 'Data;Cod_cli;cod_vendedor;tipo_pgt;nf;obs;'; 
        let allProducts = [];
    
        data.forEach(order => {
            order.produtos.forEach(product => {
                if (!allProducts.includes(product.produto)) {
                    allProducts.push(product.produto);
                    csvContent += `Produto;Quantidade;`; 
                }
            });
        });
    
        csvContent += '\n';
    
        data.forEach(order => {
            const formattedDate = dayjs(order.Data).locale('pt-BR').format('DD/MM/YYYY')
            const tipo_pgt_value = order.tipo_pgt ? 'AV' : 'AP';
            csvContent += `${formattedDate};${order.link.COD};${order.cod_vendedor};${tipo_pgt_value};${order.nf};${order.obs};`;
    
            allProducts.forEach(productName => {
                const product = order.produtos.find(p => p.produto === productName);
                if (product) {
                    csvContent += `${product.produto};${product.quantidade};`;
                } else {
                    csvContent += ';;';
                }
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
