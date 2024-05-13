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
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h5>Reduce Stock</h5>
                <Form.Group>
                    <Form.Control
                        type="number"
                        value={amount}
                        onChange={handleChange}
                        placeholder="Enter reduction amount"
                    />
                </Form.Group>
                <div className="flex justify-end space-x-2 mt-3">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    );
};

export default ReduceStockMenu;
