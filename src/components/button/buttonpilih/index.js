<<<<<<< HEAD
import React, { useState } from 'react';

=======

import React, { useState } from 'react';
>>>>>>> 6a45e82d93aa1fafb8c4a155c37d363f117dfe02
const PrimaryButton = ({
    title = "Lihat Detail",
    type = "wrap",
    isActive = true,
    size = "large",
    onClick = () => {}
}) => {
    const [isPressed, setIsPressed] = useState(false);
<<<<<<< HEAD

    const handleButtonPress = () => {
        setIsPressed(true);
    };

    const handleButtonRelease = () => {
        setIsPressed(false);
    };

    const handleClick = () => {
        onClick();
    };

=======
    const handleButtonPress = () => {
        setIsPressed(true);
    };
    const handleButtonRelease = () => {
        setIsPressed(false);
    };
    const handleClick = () => {
        onClick();
    };
>>>>>>> 6a45e82d93aa1fafb8c4a155c37d363f117dfe02
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
<<<<<<< HEAD

export default PrimaryButton;
=======
export default PrimaryButton;
>>>>>>> 6a45e82d93aa1fafb8c4a155c37d363f117dfe02
