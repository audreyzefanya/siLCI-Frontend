import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { PiCalendarDuotone } from "react-icons/pi";

const CustomDatePicker = ({
    title,
    startDate,
    onChangeStartDate,
    endDate,
    onChangeEndDate,
    isRequired = true,
}) => {
    const onChange = (dates) => {
        const [start, end] = dates
        onChangeStartDate(start)
        onChangeEndDate(end)
    };

    return (
        <div className="w-full">
            {title &&
                <div className='flex'>
                    <p className="text-sm font-normal text-black mb-1">{title}</p>
                    {
                        isRequired && <p className="text-sm font-normal text-danger500 ml-1">*</p>
                    }
                </div>
            }

            <div className="cursor-pointer border h-11 border-neutral40 bg-neutral20 rounded-md w-full flex items-center">
                <div className="p-2">
                    <PiCalendarDuotone size={16} className="text-neutral300" />
                </div>
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    className="cursor-pointer bg-neutral20 text-neutral300 rounded-md pr-2 focus:outline-none text-sm"
                />
            </div>
        </div>
    )
}

export default CustomDatePicker;