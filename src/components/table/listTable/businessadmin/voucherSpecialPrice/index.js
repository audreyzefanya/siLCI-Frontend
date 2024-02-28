import React from 'react'
import { PiNotePencilBold, PiTrashSimpleBold } from 'react-icons/pi'

const VoucherSpecialPrice = ({
    pageType,
    editAction,
    deleteAction,
    divisionName = "Loading...",
    divisionId = "Loading...",
    clientName = "Loading...",
    voucherType = "Loading...",
    specialPrice = "Loading...",
}) => {
    return (
        <tr className='bg-white border border-neutral40'>
            <td>
                <div className='flex items-center'>
                    <div className='py-3.5 px-4 flex-1 items-center'>
                        <p className='font-semibold text-black text-sm'>{divisionName}</p>
                        {
                            pageType == 'detail' &&
                            <p className='font-normal text-neutral500 text-sm'>{divisionId}</p>
                        }
                    </div>
                </div>
            </td>
            <td>
                <div className='flex items-center'>
                    <div className='py-3.5 px-4 flex items-center'>
                        <p className='font-semibold text-black text-sm'>{clientName}</p>
                    </div>
                </div>
            </td>
            {
                pageType == 'add' &&
                <td>
                    <div className='flex items-center'>
                        <div className='py-3.5 px-4 flex items-center'>
                            <p className='font-semibold text-black text-sm'>{voucherType}</p>
                        </div>
                    </div>
                </td>
            }
            <td>
                <div className='flex items-center py-3.5 px-4'>
                    <div>
                        <p className='font-semibold text-black text-sm'>Rp {specialPrice}</p>
                    </div>
                </div>
            </td>
            {
                pageType == 'add' &&
                <td>
                    <div className='flex items-center py-3.5 px-4 w-20 h-7'>
                        <div className='w-4 h-4 mr-4 text-primary500'>
                            <PiNotePencilBold className='cursor-pointer' onClick={editAction} />
                        </div>
                        <div className='w-4 h-4 text-primary500'>
                            <PiTrashSimpleBold className='cursor-pointer' onClick={deleteAction} />
                        </div>
                    </div>
                </td>
            }
        </tr>
    )
}

export default VoucherSpecialPrice