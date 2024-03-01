import React from 'react'
import DateComponent from './DateComponent'
import BuscarTable from './BuscarTable'

export default function BuscarMain({searchPedidos}) {
  return (
    <div className='flex flex-col w-full h-full'>
        <di className='flex items-center justify-center h-[20%]'>
        <DateComponent searchPedidos={searchPedidos} />
        </di>
        <div className='flex items-center justify-center h-[80%]'>
        <BuscarTable />
        </div>
    </div>
  )
}
