import React from 'react';

const Stepper = ({
    data = ["Basic Information", "Address Information", "Billing Information"],
    currentStep = 2,
}) => {
  return (
    <div className='flex w-full justify-center items-center'>
        {data.map((value, index) => (
            <div key={index} className='flex flex-col items-center w-48'>
                <div className='flex items-center justify-center w-full'>
                    <div className={`${index === 0 ? "opacity-0" : "opacity-100"} h-px bg-neutral40 flex-grow`}></div>
                    <div
                    className={`w-10 h-10 rounded-full bg-primary500 cursor-pointer flex items-center justify-center font-semibold ${
                        index === currentStep ? 'bg-primary500 text-white' : 'bg-white text-black'
                    }`}
                    >
                    <p className="text-center">{index + 1}</p>
                    </div>
                    <div className={`${index === data.length - 1 ? "opacity-0" : "opacity-100"} h-px bg-neutral40 flex-grow`}></div>
                </div>
                <div className='justify-center w-full flex'>
                    <div className='text-center mt-4'>
                    <p className='text-xs text-black font-semibold'>Step {index + 1}</p>
                    <p className='text-sm text-black font-normal mt-0.5'>{value}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
  );
};

export default Stepper;