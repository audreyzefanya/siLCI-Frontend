import React from 'react'
import Chip from '../../../../chip'
import { PiClockDuotone, PiUser } from 'react-icons/pi'

const ReportList = ({
    statusTransaction = "Loading...",
    orderId = "Loading...",
    refId = "Loading...",
    companyName = "Loading...",
    divisionName = "Loading...",
    dateTransaction = "Loading...",
    productName = "Loading...",
    productCode = "Loading...",
    userNumber = "Loading...",
    denom = "Loading...",
    cogs = "Loading...",
    price = "Loading...",
    billerPicture = "https://picsum.photos/200",
    billerNumber = "Loading...",
    trxId = "Loading..."
}) => {
  return (
    <div className='py-1 px-2 bg-neutral20'>
        <div className='bg-white border border-neutral40'>
            <div className='flex justify-between px-4 py-2'>
                <div className='flex items-center'>
                    <div className='flex items-center'>
                        <p className='text-sm text-neutral500 text-normal mr-1'>Order ID</p>
                        <p className='text-sm text-primary500 font-semibold'>{orderId}</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='text-sm text-neutral500 text-normal mx-2'>/</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='text-sm text-neutral500 text-normal mr-1'>Ref ID</p>
                        <p className='text-sm text-primary500 font-semibold'>{refId}</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='text-sm text-neutral500 text-normal mx-2'>/</p>
                    </div>
                    <div className='flex items-center'>
                        <PiUser size={14} className='text-neutral500'/>
                        <p className='text-sm text-neutral500 text-normal ml-1'>{companyName} ({divisionName})</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='text-sm text-neutral500 text-normal mx-2'>/</p>
                    </div>
                    <div className='flex items-center'>
                        <PiClockDuotone size={14} className='text-neutral500'/>
                        <p className='text-sm text-neutral500 text-normal ml-1'>{dateTransaction}</p>
                    </div>
                </div>
                <div>
                    <Chip 
                        title={statusTransaction} 
                        type={
                            statusTransaction === "Success" ? "success" :
                            statusTransaction === "Pending" ? "warning" :
                            statusTransaction === "Failed" ? "danger" :
                            "success"
                        }
                    />
                </div>
            </div>
            <hr className='w-full text-neutral40'/>
            <div className='p-4'>
                <div class="grid grid-cols-4 gap-4">
                    <div className='w-full h-fit rounded-md border border-neutral40 p-2'>
                        <p className='text-black font-semibold text-sm'>{productName}</p>
                        <p className='text-neutral500 font-normal text-sm'>{productCode}</p>
                    </div>
                    <div className='w-full border-l border-neutral40'>
                        <div className='ml-4'>
                            <p className='text-black font-semibold text-sm'>Number</p>
                            <p className='text-neutral500 font-normal text-sm mt-1'>{userNumber}</p>
                            <p className='text-black font-semibold text-sm mt-1'>Denom</p>
                            <p className='text-neutral500 font-normal text-sm mt-1'>{denom}</p>
                        </div>
                    </div>
                    <div className='w-full border-l border-neutral40'>
                        <div className='ml-4'>
                            <p className='text-black font-semibold text-sm'>COGS</p>
                            <p className='text-neutral500 font-normal text-sm mt-1'>Rp{cogs}</p>
                            <p className='text-black font-semibold text-sm mt-1'>Price</p>
                            <p className='text-neutral500 font-normal text-sm mt-1'>Rp{price}</p>
                        </div>
                    </div>
                    <div className='w-full border-l border-neutral40'>
                        <div className='ml-4'>
                            <p className='text-black font-semibold text-sm'>Biller</p>
                            <div className='flex items-center mt-1'>
                                <img src={billerPicture} className='w-5 h-5 rounded-full mr-1' />
                                <p className='text-neutral500 font-normal text-sm'>{billerNumber}</p>
                            </div>
                            <p className='text-black font-semibold text-sm mt-1'>Trx ID</p>
                            <p className='text-sm text-primary500 font-semibold mt-1'>{trxId}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReportList