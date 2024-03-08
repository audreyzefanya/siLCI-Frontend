import React from 'react'
import Chip from '../../../../chip'

const ClientList = ({
    onClick,
    clientName = "Loading...",
    industry = "Loading...",
    division = "Loading...",
    pic = "Loading...",
    email = "Loading...",
    phoneNumber = "Loading...",
    clientType = "Loading...",
    titleStatus = "Loading..."
}) => {
  return (
    <tr className='bg-white hover:bg-neutral20 cursor-pointer border-t border-neutral40' onClick={onClick}>
        <td>
            <div className='flex items-center py-3.5 px-4'>
                <div>
                    <p className='font-semibold text-black text-sm'>{clientName}</p>
                    <div className='flex items-center pt-1'>
                        <p className='font-normal text-neutral500 text-sm'>{industry}</p>
                    </div>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center'>
                <div className='py-3.5 px-4 flex items-center'>
                    <p className='font-semibold text-black text-sm'>{division}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center'>
                <div className='py-3.5 px-4 flex items-center'>
                    <p className='font-semibold text-black text-sm'>{pic}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center py-3.5 px-4'>
                <div>
                    <p className='font-semibold text-black text-sm'>{email}</p>
                    <div className='flex items-center pt-1'>
                        <p className='font-normal text-neutral500 text-sm'>{phoneNumber}</p>
                    </div>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center py-3.5 px-4'>
                <div>
                    <p className='font-semibold text-black text-sm'>{clientType}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center'>
                <div className='py-3.5 px-4 flex items-center'>
                    <Chip 
                        type={(titleStatus.toLowerCase() === "success" && "success") || (titleStatus.toLowerCase() === "waiting" && "primary") || (titleStatus.toLowerCase() === "failed" && "danger" )}
                        title={(titleStatus.toLowerCase() === "success" && "Success") || (titleStatus.toLowerCase() === "waiting" && "Waiting") || (titleStatus.toLowerCase() === "failed" && "Failed")}
                    />
                </div>
            </div>
        </td>
    </tr>
  )
}

export default ClientList