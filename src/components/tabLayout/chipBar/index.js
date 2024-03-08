import React from 'react';
import Chip from '../../chip';

const ChipBar = ({ 
    currentTab = "pulsa", 
    dataBar = ["All Client", "Waiting for approval", "Approved", "Declined"],
    dataValue = ["All Client", "Waiting for approval", "Approved", "Declined"],
    onChangeChipBar
}) => {

  return (
    <div className='w-full flex bg-white border-b border-neutral40 py-2 px-8'>
        {dataBar.map((value, index) => (
            <div className='mr-2'>
                <Chip 
                  title={value} 
                  type={currentTab === dataValue[index] ? "primary" : "neutral"} 
                  onClick={() => onChangeChipBar(dataValue[index])}
                />
            </div>
        ))}
    </div>
  );
};

export default ChipBar;