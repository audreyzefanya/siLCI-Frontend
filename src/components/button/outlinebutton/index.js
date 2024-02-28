import React, { useState } from 'react';
import { PiDownloadSimpleDuotone } from 'react-icons/pi';

const OutlineButton = ({
    title = "Button",
    type = "wrap",
    isActive = true,
    size = "large",
    isIconVisible = false,
    onClick = () => {}
}) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleButtonPress = () => {
        setIsPressed(true);
    };

    const handleButtonRelease = () => {
        setIsPressed(false);
    };

    const handleClick = () => {
        onClick();
    };

  return (
    <button
        className={`
            ${(isPressed && isActive) ? 'bg-white text-primary500 border-2 border-primary500 text-primary500' : (isActive ? 'bg-white border-2 border-primary500 text-primary500' : 'bg-neutral30 text-neutral80 cursor-default')}
            ${type === "full" && "w-full"}
            ${size === "small" && "text-sm h-7"}
            ${size === "medium" && "text-md h-8"}
            ${size === "large" && "text-lg h-10"}
            ${size === "very large" && "text-xl h-12"}
            ${size === "extra very large" && "text-2xl h-14"}
            rounded-lg drop-shadow-md text-center py-1.5 px-4 flex justify-center items-center`
        }
        disabled={!isActive}
        onClick={handleClick}
        onMouseDown={handleButtonPress}
        onMouseUp={handleButtonRelease}
        onTouchStart={handleButtonPress}
        onTouchEnd={handleButtonRelease}
    >
        <div className='flex items-center'>
            {
                isIconVisible && <PiDownloadSimpleDuotone size={16} className='mr-1'/>
            }
            <p>{title}</p>
        </div>
    </button>
  );
};

export default OutlineButton;