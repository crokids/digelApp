'use client'
import React from 'react'
import { Card, Col, Statistic, Typography } from 'antd'

const { Title } = Typography

export default function MainContent({data}) {
      const currentDate = new Date()
      const currentMonth = currentDate.getMonth()
      const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      const currentMonthName = monthNames[currentMonth]

  return (
    <>
    <Title level={3}>
    Quantidade de pedidos no mês de {currentMonthName}
    </Title>
    <div className='flex flex-row w-full gap-5'>
      <div className='flex w-[50%] justify-center'>
              <Col span={12}>
              <Card bordered={true}>
                <Statistic
                  title="Rota Interior"
                  value={data.aggs.vendedor1}
                  precision={2}
                  valueStyle={{
                    color: 'Blue',
                  }}
                />
              </Card>
            </Col>
      </div>
      <div className='flex justify-center w-[50%]'>
            <Col span={12}>
            <Card bordered={true}>
              <Statistic
                title="Rota Cidade"
                value={data.aggs.vendedor2}
                precision={2}
                valueStyle={{
                  color: 'Purple',
                }}
              />
            </Card>
          </Col>
      </div>
    </div>
    </>
  )
}
