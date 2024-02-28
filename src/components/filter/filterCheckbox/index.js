import React, { useState, useEffect, useRef } from 'react';
import { PiFunnelDuotone } from 'react-icons/pi';

const FilterCheckbox = ({ options = ["Type", "Company"], onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
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

    const handleToggleFilterCheckbox = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        const updatedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter((selected) => selected !== option)
            : [...selectedOptions, option];

        setSelectedOptions(updatedOptions);

        if (onSelect) {
            onSelect(updatedOptions);
        }
    };

    const buttonText =
        selectedOptions.length > 0
            ? `${selectedOptions.length} selected filter`
            : 'Filter';

    return (
        <div className='relative inline-block text-left' ref={dropdownRef}>
            <div>
                <span className='rounded-md shadow-sm'>
                <button
                    type='button'
                    className="flex items-center w-60 py-2.5 text-left px-4 bg-neutral20 border-neutral50 font-normal text-sm text-neutral300 rounded-md border focus:outline-none"
                    onClick={handleToggleFilterCheckbox}
                >
                    <span className='flex-grow'>{buttonText}</span>
                    <span className='ml-2'>
                    <PiFunnelDuotone size={16} className='text-neutral300' />
                    </span>
                </button>
                </span>
            </div>

            {isOpen && (
                <div
                    className='z-10 origin-top-right absolute left-0 mt-2 w-60 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='options-menu'
                >
                    <div className='px-1 py-2'>
                        {options.map((option) => (
                            <div
                                key={option}
                                className={`hover:bg-neutral20 bg-white py-2.5 px-4 my-0.5 rounded-md flex items-center cursor-pointer ${
                                    selectedOptions.includes(option) ? 'bg-primary500' : ''
                                }`}
                                onClick={() => handleOptionClick(option)}
                            >
                                <input
                                    type='checkbox'
                                    className='mr-2'
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleOptionClick(option)}
                                />
                                <p className={`text-sm ${selectedOptions.includes(option) ? 'text-primary500' : 'text-black'}`}>
                                    {option}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterCheckbox;