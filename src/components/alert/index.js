import React from 'react'
import { PiInfoDuotone } from 'react-icons/pi'
import PrimaryButton from '../button/primarybutton'

const Alert = ({
    title = "Title", 
    subtitle = "Subtitle",
    enableButton = false,
    titleButton = "Button",
    onClickButton,
}) => {
  return (
    <div className='w-full flex p-3 bg-primary50 border border-primary500 rounded-md'>
        <div>
            <PiInfoDuotone
                size="24"
                variant="Bold"
                className="text-primary500 mr-2"
            />
        </div>
        <div className='w-full flex items-center justify-between'>
            <div>
                <p className='text-md font-semibold text-black'>{title}</p>
                <p className='text-sm font-normal text-black'>{subtitle}</p>
            </div>
            {
                enableButton &&
                <PrimaryButton title={titleButton} onClick={onClickButton} size='medium'/>
            }
        </div>
    </div>
  )
}

export default Alert