import React from 'react'
import Voucher from '../../../../../assets/images/voucher.png';
import Chip from '../../../../chip'

const VoucherList = ({
    onClick,
    voucherName = "Loading...",
    productCode = "Loading...",
    voucherType = "Loading...",
    category = "Loading...",
    denom = "Loading...",
    price = "Loading...",
    stock = "Loading...",
    startDate = "Loading...",
    startTime = "Loading...",
    endDate = "Loading...",
    endTime = "Loading..."
}) => {
  return (
    <tr className='bg-white hover:bg-neutral20 cursor-pointer border-t border-neutral40' onClick={onClick}>
        <td>
            <div className='flex items-center py-3.5 px-4'>
                <img src={Voucher} className='w-10 h-10 mr-2' />
                <div className='flex-1'>
                    <p className='font-semibold text-black text-sm'>{voucherName}</p>
                    <p className='font-normal text-neutral500 text-sm'>{productCode}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center'>
                <div className='py-3.5 px-4 flex items-center'>
                    <p className='font-semibold text-black text-sm'>{voucherType}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center'>
                <div className='py-3.5 px-4 flex items-center'>
                    <p className='font-semibold text-black text-sm'>{category}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center'>
                <div className='py-3.5 px-4 flex items-center'>
                    <p className='font-semibold text-black text-sm'>{denom}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center py-3.5 px-4'>
                <div>
                    <p className='font-semibold text-black text-sm'>{price}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center py-3.5 px-4'>
                <div>
                    <p className={`font-semibold ${stock < 50 ? 'text-danger500' : 'text-success500'} text-sm`}>
                        {stock}
                    </p>
                </div>

            </div>
        </td>
        <td>
            <div className='flex items-center py-3.5 px-4'>
                <div>
                    <p className='font-semibold text-black text-sm'>{startDate}</p>
                    <p className='font-normal text-neutral500 text-sm'>{startTime}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center py-3.5 px-4'>
                <div>
                    <p className='font-semibold text-black text-sm'>{endDate}</p>
                    <p className='font-normal text-neutral500 text-sm'>{endTime}</p>
                </div>
            </div>
        </td>
    </tr>
  )
}

export default VoucherList