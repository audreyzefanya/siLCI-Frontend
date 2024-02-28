import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PiImage } from 'react-icons/pi';

const DropzoneUploadPhoto = ({ 
    onFileChange, 
    currentImage,
    type = "circle" 
}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        maxFiles: 1,
        maxSize:5000000,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                onFileChange(acceptedFiles[0]);
                setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
            }
        },
    });

    return (
        <div className={`
        ${(type == "circle" ? 'w-52 h-52' : 'w-80 h-80 mr-7')}
        `}
        >
            <div
                className="cursor-pointer relative"
            >
                <div
                    {...getRootProps({ className: 'dropzone' })}
                    className={`
                        ${(type == "circle" ? 'bg-neutral20 h-52 w-52 rounded-full border-2 border-neutral50 border-dashed' : 'bg-neutral20 h-80 w-80 rounded-lg border-2 border-neutral50 border-dashed')}
                    `}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <input {...getInputProps()} />
                    {
                        currentImage && !selectedImage ?
                        <img
                            src={currentImage}
                            className={`
                                ${(type == "circle" ? 'w-full h-full rounded-full object-cover' : 'w-full h-full rounded-lg object-cover')}
                            `}
                        />
                        :
                        !currentImage && !selectedImage ?
                        <div className="flex w-full h-full justify-center items-center text-center">
                            <div>
                                <div className='flex justify-center'>
                                    <PiImage size={18} className='text-neutral300 h-6 w-8'/>
                                </div>
                                <p className="text-xs text-neutral300 mt-2">Foto</p>
                            </div>
                        </div>
                        :
                        <img
                            src={selectedImage}
                            className={`
                                ${(type == "circle" ? 'w-full h-full rounded-full object-cover' : 'w-full h-full rounded-lg object-cover')}
                            `}
                        />
                    }
                    {(selectedImage || currentImage) && isHovered && (
                        <div className={`
                        ${(type == "circle" ? 'absolute inset-0 bg-black bg-opacity-40 rounded-full items-center flex justify-center' : 'absolute inset-0 bg-black bg-opacity-40 rounded-lg items-center flex justify-center')}
                        `}
                        >
                            <div>
                                <div className='flex justify-center'>
                                    <PiImage size={18} className='text-white h-6 w-8'/>
                                </div>
                                <p className="text-xs text-white mt-2">Foto</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DropzoneUploadPhoto;