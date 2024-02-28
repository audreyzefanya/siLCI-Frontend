import React from 'react'
import Chip from '../../../chip'

const BillerList = ({
    onClick,
    titlePartnerName = "",
    subtitlePartnerName = "",
    imagePartnerName = "https://picsum.photos/200",
    email = "",
    phoneNumber = "",
    titleStatus = ""
}) => {
  return (
    <tr className='bg-white hover:bg-neutral20 cursor-pointer border-t border-neutral40' onClick={onClick}>
        <td>
            <div className='flex items-center py-3.5 px-4'>
                <img src={imagePartnerName} className='w-10 h-10 rounded-full mr-2'/>
                <div>
                    <p className='font-semibold text-black text-sm'>{titlePartnerName}</p>
                    <div className='flex items-center pt-1'>
                        <p className='font-normal text-neutral500 text-sm'>ID : {subtitlePartnerName}</p>
                    </div>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center'>
                <div className='py-3.5 px-4 flex items-center'>
                    <p className='font-normal text-neutral500 text-sm'>{email}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center'>
                <div className='py-3.5 px-4 flex items-center'>
                    <p className='font-normal text-neutral500 text-sm'>{phoneNumber}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center'>
                <div className='py-3.5 px-4 flex items-center'>
                    <Chip type={titleStatus == "prepaid" ? "warning" : "success"} title={titleStatus == "prepaid" ? "Prepaid" : "Postpaid"}/>
                </div>
            </div>
        </td>
    </tr>
  )
}

export default BillerList