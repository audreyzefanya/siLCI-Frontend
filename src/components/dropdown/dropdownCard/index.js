import React, { useState, useEffect, useRef } from 'react';
import { PiPlus } from 'react-icons/pi';

const DropdownCard = ({
    options = [
        {
            picture: "https://picsum.photos/200",
            name: "Loading...",
            code: "Loading...",
            billerName: "Loading...",
        },
    ],
    placeholder = "Filter",
    onSelect,
    selectedOptions,
    title,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    const handleOptionClick = (option) => {
        if (onSelect) {
            onSelect(option);
            setInputValue('');
            setIsOpen(false);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setIsOpen(true);
    };

    const handleInputFocus = () => {
        setIsOpen(true);
    };

  return (
    <div className='relative inline-block text-left w-full' ref={dropdownRef}>
        {title && <p className="text-sm font-normal text-black mb-1">{title}</p>}
        <div className="relative">
            <div className='flex items-center bg-neutral20 border-neutral50 border rounded-md focus:outline-none'>
                <PiPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral50 w-4 h-4" />
                <input
                    type='text'
                    value={inputValue}
                    onFocus={handleInputFocus}
                    onChange={handleInputChange}
                    className="flex items-center w-full py-2.5 text-left pl-8 pr-4 bg-neutral20 rounded-md font-normal text-sm text-black focus:outline-none"
                    placeholder={placeholder}
                />
            </div>
            {isOpen && (
                <div
                    className='z-10 origin-top-left absolute left-0 mt-2 w-full rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='options-menu'
                >
                    <div className='px-1 py-2 max-h-56 overflow-y-auto'>
                    {options?.length > 0 &&
                        options
                        .filter((option) =>
                            option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                            option.code.toLowerCase().includes(inputValue.toLowerCase()) ||
                            option.billerName.toLowerCase().includes(inputValue.toLowerCase())
                        )
                        .map((option) => (
                            <div
                                key={option.name}
                                className='hover:bg-neutral20 bg-white py-2.5 px-4 my-0.5 rounded-md cursor-pointer'
                                onClick={() => handleOptionClick(option)}
                            >
                                <div className='flex justify-between'>
                                    <div className='flex'>
                                        <div>
                                            <img src={option.picture} className='w-8 h-8 rounded-full' />
                                        </div>
                                        <div className='pl-2'>
                                            <p className='text-sm text-black font-semibold'>{option.name}</p>
                                            <p className='text-xs text-neutral80 font-normal'>{option.code}</p>
                                            <p className='text-xs text-neutral80 font-normal'>{option.billerName}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default DropdownCard;