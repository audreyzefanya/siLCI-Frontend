import React from 'react';
import { PiCalendarBlankBold } from 'react-icons/pi';

const Description = ({
    title = "Title",
    value = "Description"
}) => {
  return (
    <div className='w-full'>
        {title && <p className="text-sm font-normal text-black mb-1">{title}</p>}
        <div className='py-1 flex items-center'>
            <PiCalendarBlankBold className='mr-2'/>
            <p className='text-black font-medium text-base'>{value}</p>
        </div>
    </div>
  );
};

export default Description;