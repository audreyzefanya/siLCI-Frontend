import React from 'react';
import { PiMagnifyingGlassDuotone } from 'react-icons/pi';

const SearchInput = ({
    onChange = () => {},
    onEnterPress = () => {},
    placeholder = 'Search',
}) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onEnterPress();
        }
    };
  return (
    <div className="relative">
        <PiMagnifyingGlassDuotone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral50 w-4 h-4" />
        <input
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            className="w-72 py-2.5 pl-8 pr-4 bg-neutral20 border-neutral50 font-normal text-sm text-neutral300 rounded-md border focus:outline-none"
        />
    </div>
  );
};

export default SearchInput;