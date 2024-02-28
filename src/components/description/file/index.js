import React from 'react';
import { PiFileArrowDown } from 'react-icons/pi';

const Description = ({
    title = "Title",
    link = "https://sprintasia.atlassian.net/browse/NP-165"
}) => {
  return (
    <div className='w-full'>
        {title && <p className="text-sm font-normal text-black mb-1">{title}</p>}
        <div className='py-1 flex items-center cursor-pointer'>
            <div>
                <PiFileArrowDown className='text-black' size={16}/>
            </div>
            <a className='text-black font-medium text-base ml-1' href={link} target="_blank">{title}.pdf</a>
        </div>
    </div>
  );
};

export default Description;