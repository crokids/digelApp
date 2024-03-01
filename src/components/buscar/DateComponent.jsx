'use client'

import React, { useState } from 'react';
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function DateComponent({searchPedidos}) {
    const [dateRange, setDateRange] = useState([dayjs().startOf('day'), dayjs().endOf('day')]);

    const handleDateChange = async (dates) => {
        if (dates) {
            setDateRange(dates);
            const strigFy = JSON.stringify(dates)
           const res = await searchPedidos(strigFy)

            const parsedRes = JSON.parse(res)
            console.log(parsedRes)
        }
    };

    return (
        <div>
            <RangePicker format={'DD/MM/YYYY'} locale={locale} defaultValue={dateRange} onChange={handleDateChange} />
        </div>
    );
}
