import React from 'react'

const VoucherHistory = ({
    campaignName = "Loading...",
    campaignId = "Loading...",
    clientName = "Loading...",
    clientId = "Loading...",
    division = "Loading...",
    startDate = "Loading...",
    startTime = "Loading...",
    dueDate = "Loading...",
    endTime = "Loading..."
}) => {
    return (
        <tr className='bg-white border border-neutral40'>
            <td>
                <div className='flex items-center py-3.5 px-4'>
                    <div className='flex-1'>
                        <p className='font-semibold text-black text-sm'>{campaignName}</p>
                        <p className='font-normal text-neutral500 text-sm'>{campaignId}</p>
                    </div>
                </div>
            </td>
            <td>
                <div className='flex items-center'>
                    <div className='py-3.5 px-4 flex-1 items-center'>
                        <p className='font-semibold text-black text-sm'>{clientName}</p>
                        <p className='font-normal text-neutral500 text-sm'>{clientId}</p>
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
                        <p className='font-semibold text-black text-sm'>{dueDate}</p>
                        <p className='font-normal text-neutral500 text-sm'>{endTime}</p>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default VoucherHistory