import React, { useState, useEffect, useRef } from 'react';
import Chip from '../../chip';

const DropdownChip = ({ 
    options = ["Type", "Company", "Category", "Location", "Product"],
    onSelect,
    selectedOptions,
    onRemoveOption,
    title = "Title Dropdown",
    isRequired = true
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
        onSelect([...selectedOptions, option]);
        setInputValue('');
        setIsOpen(false);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setIsOpen(true);
    };

  return (
    <div className='relative inline-block text-left w-full' ref={dropdownRef}>
        <div className='flex items-center'>
            {title && <p className="text-sm font-normal text-black mb-1">{title}</p>}
            {
                isRequired &&
                <p className='text-sm text-danger500 ml-1 font-normal'>*</p>
            }
        </div>
        <div className="relative">
            <div className='flex items-center bg-neutral20 border-neutral50 border rounded-md focus:outline-none'>
            {selectedOptions?.length > 0 &&
                selectedOptions.map((selectedOption) => (
                <div className='ml-4' key={selectedOption}>
                    <Chip title={selectedOption} type='dropdown' onClick={() => onRemoveOption(selectedOption)} />
                </div>
                ))
            }
            <input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                className="flex items-center w-full py-2.5 text-left px-2 bg-neutral20 rounded-md font-normal text-sm text-black focus:outline-none"
                placeholder="Filter"
            />
            </div>
        {isOpen && (
            <div
                className='z-10 origin-top-left absolute left-0 mt-2 w-full rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
            >
                <div className='px-1 py-2 max-h-40 overflow-y-auto'>
                {options?.length > 0 &&
                    options
                    .filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()) && !selectedOptions?.includes(option))
                    .map((option) => (
                        <div
                        key={option}
                        className='hover:bg-neutral20 bg-white py-2.5 px-4 my-0.5 rounded-md cursor-pointer'
                        onClick={() => handleOptionClick(option)}
                        >
                        <p className='text-sm text-black'>{option}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default DropdownChip;