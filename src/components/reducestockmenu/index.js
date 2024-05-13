import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const ReduceStockMenu = ({ onClose, onSubmit, id_barang, id_gudang }) => {
    const [amount, setAmount] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value >= 0) {
            setAmount(value);
        }
    };

    const handleSubmit = () => {
        if (amount > 0) {
            onSubmit({
                barang: id_barang,
                gudang: id_gudang,
                stok: parseInt(amount, 10)
            });
            onClose();
        }
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                <div className="max-w-lg w-full mx-auto p-4"> {/* Adjust width as necessary */}
                    <div className="bg-white rounded-lg shadow-lg p-8 relative">
                        <button onClick={onClose} className="absolute top-0 right-0 m-2 p-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h5 className="mb-4">Kurangi Stok</h5>
                        <Form.Group>
                            <Form.Control
                                type="number"
                                value={amount}
                                onChange={handleChange}
                                placeholder="Masukkan Jumlah"
                                className="mb-4"
                            />
                        </Form.Group>
                        <div className="flex justify-end space-x-2 mt-3">
                            <Button variant="secondary" onClick={onClose}>Batal</Button>
                            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReduceStockMenu;
