import React from 'react';
import { useDropzone } from 'react-dropzone';
import { PiFileArrowUpDuotone } from 'react-icons/pi';

const DropzoneUploadFile = ({
    title = "Title Dropzone",
    subtitle = "Format File PDF, JPEG JPG, Maximal File 5 MB",
    isRequired = true,
}) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
        'image/jpeg': [],
        'image/png': []
        },
    });

  return (
    <div className='w-full'>
        <div className='flex items-center'>
            <p className='text-black text-sm mb-1'>{title}</p>
            {
                isRequired && 
                <p className='text-danger500 text-sm ml-1'>*</p>
            }
        </div>
        <div className="cursor-pointer">
            <div
                {...getRootProps({ className: 'dropzone' })}
                className="bg-neutral20 w-full h-28 rounded-lg border-2 border-neutral50 border-dashed"
            >
                <input {...getInputProps()} />
                <div className="flex w-full h-full justify-center items-center text-center">
                    <div>
                        <div className='flex justify-center'>
                            <PiFileArrowUpDuotone size={16} className='text-neutral300'/>
                        </div>
                        <p className="text-sm text-neutral300 mt-2">Drag & Drop File Here or Choose File</p>
                    </div>
                </div>
            </div>
        </div>
        <p className='text-xs text-neutral300 mt-1'>{subtitle}</p>
    </div>
  );
};

export default DropzoneUploadFile;