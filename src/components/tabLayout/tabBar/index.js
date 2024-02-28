import React from 'react';
import Chip from '../../chip';


{/* EDIT DATA VALUE */}
const TabBar = ({ 
  currentTab = "all", 
  dataBar = ["All Voucher", "Digital Voucher", "PPOB Voucher", "Loyalty Voucher"],
  dataValue = ["All Voucher", "Digital Voucher", "PPOB Voucher", "Loyalty Voucher"],
  onChangeTabBar
}) => {

  return (
    <div className='w-full flex bg-white border-b border-neutral40 pt-1.5 px-8'>
        {dataBar.map((value, index) => (
            <div key={dataValue[index]} className={`${currentTab === dataValue[index] ? "text-primary500 border-b-2 border-primary500" : "text-neutral300 border-b-2 border-white"} cursor-pointer w-fit mx-1.5`} onClick={() => onChangeTabBar(dataValue[index])}>
                <p className={`${currentTab === dataValue[index] ? "font-medium" : "font-normal"} text-sm py-2.5 px-4 font-medium`}>{value}</p>
            </div>
        ))}
    </div>
  );
};

export default TabBar;