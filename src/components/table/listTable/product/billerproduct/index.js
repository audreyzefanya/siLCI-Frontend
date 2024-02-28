import React from 'react'
import Chip from '../../../../chip'

const BillerProductList = ({
    titleProductName = "",
    subtitleProductName = "",
    provider = "",
    denom = "",
    activePeriod = "",
    price = "",
    billerImage = "",
    billerName = "",
    onClick
}) => {
  return (
    <tr className='bg-white hover:bg-neutral20 cursor-pointer border-t border-neutral40' onClick={onClick}>
        <td>
            <div className='flex items-center py-3.5 px-4'>
                <div>
                    <p className='font-semibold text-black text-sm'>{titleProductName}</p>
                    <div className='flex items-center pt-1'>
                        <p className='font-normal text-neutral500 text-sm'>{subtitleProductName}</p>
                    </div>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center'>
                <div className='py-3.5 px-4 flex items-center'>
                    <p className='font-normal text-neutral500 text-sm'>{provider}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center'>
                <div className='py-3.5 px-4 flex items-center'>
                    <p className='font-normal text-neutral500 text-sm'>{denom}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center'>
                <div className='py-3.5 px-4 flex items-center'>
                    <p className='font-normal text-neutral500 text-sm'>{activePeriod}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center'>
                <div className='py-3.5 px-4 flex items-center'>
                    <p className='font-normal text-neutral500 text-sm'>{price}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center'>
                <div className='py-3.5 px-4 flex items-center'>
                    <img src={billerImage} className='rounded-full w-5 h-5 mr-2' />
                    <p className='font-normal text-neutral500 text-sm'>{billerName}</p>
                </div>
            </div>
        </td>
    </tr>
  )
}

export default BillerProductList