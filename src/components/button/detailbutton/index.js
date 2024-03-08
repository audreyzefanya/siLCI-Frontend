import React from 'react';

const PrimaryButton = ({
    title = "Detail",
    type = "wrap",
    isActive = true,
    size = "large",
    onClick
}) => {
    // Simplified button that uses CSS for active state rather than JavaScript
    return (
        <button
            className={`
                ${isActive ? 'bg-primary500 hover:bg-primary600 active:bg-2C358C text-white cursor-pointer' : 'bg-neutral30 text-neutral80 cursor-default'}
                ${type === "full" && "w-full"}
                ${size === "small" && "text-sm h-7"}
                ${size === "medium" && "text-md h-8"}
                ${size === "large" && "text-lg h-10"}
                ${size === "very large" && "text-xl h-12"}
                ${size === "extra very large" && "text-2xl h-14"}
                rounded-lg drop-shadow-md text-center py-1.5 px-4 flex justify-center items-center`
            }
            disabled={!isActive}
            onClick={onClick} // Directly pass the onClick handler
        >
            {title}
        </button>
    );
};

export default PrimaryButton;
