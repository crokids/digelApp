'use client'

import React, { useState, useEffect } from 'react';
import { Badge, Button, Popover } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';

export default function Cart({ style, items, onDeleteItem }) {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);


    useEffect(() => {
        const length = items.length
        setCount(length)
    }, [items])



    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
        console.log(items)
    };

    const handleDelete = (itemId) => {
        onDeleteItem(itemId)
    };



    return (
        <div style={style}>
            <Popover
                content={
                    <div className='min-w-[200px] md:min-w-[300px]'>
                            <div style={{width: '100%', display: 'flex', flexDirection: 'row', marginBottom: '10px'}}>
                                <div style={{width: '50%', fontWeight: 'bold', marginLeft: '15px'}}>Items</div>
                                <div style={{width: '50%', fontWeight: 'bold'}}>Quantidade</div>
                            </div>
                    {items.map((item) => (
                        <div key={item.id} className='flex flex-row justify-between' style={{width: '100%'}}>
                             <div style={{width: '80%', display: 'flex', flexDirection: 'row'}}>
                                <div style={{width: '80%'}}>{item.produto}</div>
                                <div style={{width: '20%'}}>{item.quantidade}</div>
                             </div>
                            <div style={{width: '20%', textAlign: 'right'}}>
                                <Button type="text" icon={<DeleteOutlined style={{color: 'red'}} />} onClick={() => handleDelete(item.id)} />
                            </div>
                        </div>
                    ))}
                    <a onClick={hide}>Fechar</a>
                </div>
                
                }
                title=""
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
            >
                <Button type='text'>
                    <Badge count={count} size='middle'>
                        <ShoppingCartOutlined style={{ fontSize: '26px', color: '#08c' }} />
                    </Badge>
                </Button>
            </Popover>
        </div>
    );
}
