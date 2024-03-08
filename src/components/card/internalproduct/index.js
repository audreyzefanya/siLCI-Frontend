import React from 'react'

const CardInternalProduct = ({
    title = "Loading...",
    productCode = "Loading...",
    company = "Loading...",
    image = "https://picsum.photos/200",
    isCloseButton = false,
    mode = "detail",
    onClick
}) => {
  return (
    <div className='w-full'>
        <div
            className={`
                ${mode == "detail" && "border-neutral40 bg-white"} 
                ${mode == "add" && "border-black bg-neutral10"} 
                w-full py-2.5 px-4 my-0.5 rounded-md border`
            }
        >
            <div className='flex justify-between'>
                <div className='flex'>
                    <div>
                        <img src={image} className='w-8 h-8 rounded-full mr-2 mt-1'/>
                    </div>
                    <div>
                        <p className='text-sm text-black font-semibold'>{title}</p>
                        <p className='text-xs text-neutral80 font-normal'>{productCode}</p>
                        <p className='text-xs text-neutral80 font-normal'>{company}</p>
                    </div>
                </div>
                {
                    isCloseButton && 
                        <div className='-mt-2 cursor-pointer'>
                            <p className='text-neutral300' onClick={onClick}>x</p>
                        </div>
                }
            </div>
        </div>
    </div>
  )
}

export default CardInternalProduct