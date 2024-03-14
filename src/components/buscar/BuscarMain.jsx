'use client'

import React, { useState } from 'react'
import DateComponent from './DateComponent'
import BuscarTable from './BuscarTable'

export default function BuscarMain({searchPedidos, deletePedido}) {
  const [tableData, setTableData] = useState([])


  const getData = (data) => {
    setTableData(data)
  }

  const removeObjectByKey = (key) => {
    setTableData(prevData => prevData.filter(item => item.id !== key))
  }


  return (
    <div className='flex flex-col w-full h-full gap-10'>
        <di className='flex items-center justify-center'>
        <DateComponent searchPedidos={searchPedidos} getData={getData} />
        </di>
        <div className='flex items-center justify-center overflow-auto'>
         <BuscarTable tableData={tableData} removeObjectByKey={removeObjectByKey} deletePedido={deletePedido} />
        </div>
    </div>
  )
}
