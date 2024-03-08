import React, { useState, useEffect, useRef } from 'react';
import { PiCaretDown, PiCaretUp } from 'react-icons/pi';

const DropdownText = ({ 
    options = ["Loading..."],
    optionsValue = ["Loading..."],
    onSelect,
    title = "Title Dropdown",
    placeholder = "Placeholder",
    mode = "default",
    isRequired = true,
    currentOption,
}) => {
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

    const handleToggleDropdownText = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option, value) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onSelect) {
            onSelect(value);
        }
    };

  return (
    <div className='relative inline-block text-left w-full' ref={dropdownRef}>
        {title && 
            <div className='flex'>
                <p className="text-sm font-normal text-black mb-1">{title}</p>
                {
                    isRequired && <p className="text-sm font-normal text-danger500 ml-1">*</p>
                }
            </div>
        }
        <div>
            <span className='rounded-md shadow-sm'>
                <button
                    type='button'
                    className={`
                        ${mode == "disable" ? "bg-neutral30 cursor-default" : "bg-neutral20 cursor-pointer"} 
                        flex items-center w-full py-2.5 text-left px-4 border-neutral50 font-normal text-sm text-neutral300 rounded-md border focus:outline-none overflow-hidden`}
                    onClick={mode != "disable" ? handleToggleDropdownText : null}
                >
                    <span className='flex-grow overflow-hidden'>{selectedOption ? selectedOption : currentOption ? currentOption : placeholder}</span>
                    <span className='ml-2'>
                        {isOpen ? <PiCaretUp size={16} className='text-neutral300' /> : <PiCaretDown size={16} className='text-neutral300' />}
                    </span>
                </button>
            </span>
        </div>

        {isOpen && (
            <div
                className='z-10 origin-top-right absolute left-0 mt-2 w-full rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
            >
                <div className='px-1 py-2 max-h-40 overflow-y-auto'>
                    {options.length == 0 ? 
                        <div
                            className='hover:bg-neutral20 bg-white py-2.5 px-4 my-0.5 rounded-md'
                        >
                            <p className='text-sm text-black'>Loading...</p>
                        </div>
                        :
                        options.map((option, index) => (
                            <div
                                key={option}
                                className='hover:bg-neutral20 bg-white py-2.5 px-4 my-0.5 rounded-md'
                                onClick={() => {
                                    if (option !== "Loading...") {
                                        handleOptionClick(option, optionsValue[index])
                                    }
                                }}
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

export default DropdownText;