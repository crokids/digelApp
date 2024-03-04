'use client'

import React, { useState } from 'react'
import DateComponent from './DateComponent'
import BuscarTable from './BuscarTable'

export default function BuscarMain({searchPedidos}) {
  const [tableData, setTableData] = useState([])


  const getData = (data) => {
    setTableData(data)
  }



  return (
    <div className='flex flex-col w-full h-full gap-10'>
        <di className='flex items-center justify-center'>
        <DateComponent searchPedidos={searchPedidos} getData={getData} />
        </di>
        <div className='flex items-center justify-center overflow-auto'>
         <BuscarTable tableData={tableData} />
        </div>
    </div>
  )
}
