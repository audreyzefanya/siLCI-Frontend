import React, { useState } from 'react';
import DropdownText from '../dropdown/dropdownText';

const FloatingMenu = ({ daftarBarang, setChoosenBarang, handlePostBarang, setShowFloatingMenu, warningMessage }) => {

    const handleClose = () => {
        setShowFloatingMenu(false);
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                <div className="max-w-lg w-96 mx-auto"> {/* Adjust the width here */}
                    <div className="bg-white rounded-md drop-shadow-md p-8 mb-4">
                        <button onClick={handleClose} className="absolute top-0 right-0 m-2 p-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="p-4">
                            {warningMessage && (
                                <div style={{ color: 'red' }} className="text-xs mt-2">
                                    {warningMessage}
                                </div>
                            )}
                            <DropdownText
                                title="Select Barang"
                                options={daftarBarang.map(barang => barang.nama)}
                                optionsValue={daftarBarang.map(barang => barang.id)}
                                placeholder="Pilih Barang Yang Ingin Ditambahkan"
                                onSelect={setChoosenBarang}
                            />
                            <br></br><br></br>
                            <button onClick={handlePostBarang} className="bg-primary500 text-white py-2 px-4 rounded-md">Tambah</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FloatingMenu;