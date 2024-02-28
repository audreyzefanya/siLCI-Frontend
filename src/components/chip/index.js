import React from 'react'

const Chip = ({
    title = "Approve",
    type = "success",
    onClick
}) => {
  return (
    <div className='w-fit' onClick={onClick}>
        <div className={`
            ${type == "neutral" && "text-neutral80 border-neutral40 bg-white cursor-pointer"} 
            ${type == "success" && "text-success600 border-success600 bg-success50"} 
            ${type == "primary" && "text-primary500 border-primary500 bg-primary50"} 
            ${type == "dropdown" && "text-primary500 border-primary500 bg-primary50"} 
            ${type == "warning" && "text-warning800 border-warning800 bg-warning50"} 
            ${type == "danger" && "text-danger800 border-danger800 bg-danger50"} 
            ' rounded-full text-xs border-2 flex items-center px-3.5`}>

            <div className='flex items-center'>
                <p className='py-1'>{title}</p>
                {
                    type == "dropdown" && <p className='text-md pl-2 cursor-pointer' onClick={onClick}>x</p>
                }
            </div>
        </div>
    </div>
  )
}

export default Chip