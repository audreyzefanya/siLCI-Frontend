import React, { useState, useEffect, useRef } from 'react';
import { PiFunnelDuotone } from 'react-icons/pi';

const FilterText = ({ options = ["Type", "Company"], onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
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

    const handleToggleFilterText = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onSelect) {
            onSelect(option);
        }
    };

  return (
    <div className='relative inline-block text-left' ref={dropdownRef}>
        <div>
            <span className='rounded-md shadow-sm'>
            <button
                type='button'
                className="flex items-center w-60 py-2.5 text-left px-4 bg-neutral20 border-neutral50 font-normal text-sm text-neutral300 rounded-md border focus:outline-none"
                onClick={handleToggleFilterText}
            >
                <span className='flex-grow'>{selectedOption ? selectedOption : 'Filter'}</span>
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
                            className='hover:bg-neutral20 bg-white py-2.5 px-4 my-0.5 rounded-md'
                            onClick={() => handleOptionClick(option)}
                        >
                            <p className='text-sm text-black'>{option}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};

export default FilterText;