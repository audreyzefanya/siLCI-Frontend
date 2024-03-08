import React from 'react'

const UserList = ({
    onClick,
    username = "Loading...",
    email = "Loading...",
    company = "Loading...",
    division = "Loading...",
    userRole = "Loading...",
    day = "Loading...",
    time = "Loading...",
}) => {
  return (
    <tr className='z-0 bg-white hover:bg-neutral20 cursor-pointer border-t border-neutral40' onClick={onClick}>
        <td>
            <div className='flex items-center py-3.5 px-4'>
                <div>
                    <p className='font-semibold text-black text-sm'>{username}</p>
                    <div className='flex items-center pt-1'>
                        <p className='font-normal text-neutral500 text-sm'>{email}</p>
                    </div>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center py-3.5 px-4'>
                <div>
                    <p className='font-semibold text-black text-sm'>{company}</p>
                    <div className='flex items-center pt-1'>
                        <p className='font-normal text-neutral500 text-sm'>{division}</p>
                    </div>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center py-3.5 px-4'>
                <div>
                    <p className='font-semibold text-black text-sm'>{userRole}</p>
                </div>
            </div>
        </td>
        <td>
            <div className='flex items-center py-3.5 px-4'>
                <div>
                    <p className='font-semibold text-black text-sm'>{day}</p>
                    <div className='flex items-center pt-1'>
                        <p className='font-normal text-neutral500 text-sm'>{time}</p>
                    </div>
                </div>
            </div>
        </td>
    </tr>
  )
}

export default UserList