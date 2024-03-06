import React, { useState } from 'react';

const PrimaryButton = ({
    title = "Lihat Detail",
    type = "wrap",
    isActive = true,
    size = "large",
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
                ${(isPressed && isActive) ? 'bg-DA3732 text-white' : (isActive ? 'bg-primary500 hover:bg-primary600 text-white cursor-pointer' : 'bg-neutral30 text-neutral80 cursor-default')}
                ${type === "full" && "w-full"}
                ${size === "small" && "text-sm h-7"}
                ${size === "medium" && "text-md h-8"}
                ${size === "large" && "text-lg h-10"}
                ${size === "very large" && "text-xl h-12"}
                ${size === "extra very large" && "text-2xl h-14"}
                rounded-lg drop-shadow-md text-center py-1.5 px-4 flex justify-center items-center`}
            style={{ backgroundColor: '#DA3732' }}
            disabled={!isActive}
            onClick={handleClick}
            onMouseDown={handleButtonPress}
            onMouseUp={handleButtonRelease}
            onTouchStart={handleButtonPress}
            onTouchEnd={handleButtonRelease}
        >
            {title}
        </button>
    );
};

export default PrimaryButton;
