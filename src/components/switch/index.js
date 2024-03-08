import React from 'react';

const Switch = ({ onChange, checked, isEdit }) => {
  const handleClick = () => {
    if (isEdit) {
      onChange();
    }
  };

  return (
    <div
      className={`relative inline-block ${checked ? 'bg-primary500' : 'bg-neutral40'} rounded-full w-12 h-6 transition-all duration-300 ${isEdit ? "cursor-pointer" : "cursor-default"}`}
      onClick={handleClick}
    >
      <div
        className={`absolute flex items-center justify-center w-6 h-6 transition-all duration-300 ${
          checked ? 'translate-x-full' : 'translate-x-0'}`}
      >
        <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-all`}></div>
      </div>
    </div>
  );
};

export default Switch;