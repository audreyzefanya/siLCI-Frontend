import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/header';
import Sidebar from '../../../../components/sidebar/stafgudang';
import { fetchDetailGudang, updateDetailGudang } from '../../../../service/gudangmanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';

const jenisGudangOptions = {
    1: "Bahan Baku",
    2: "Penyimpanan",
    3: "Cross-Docking",
    4: "Produksi",
    5: "Sortir",
    6: "Transhipment"
};

const GudangUpdate = (props) => {
    const { id_gudang } = useParams();
    const navigate = useNavigate();
    const [gudangData, setGudangData] = useState({
        nama: '',
        alamat: '',
        jenis: ''
    });

    useEffect(() => {
        const loadGudangDetails = async () => {
            try {
                const response = await fetchDetailGudang(id_gudang);
                if (response) {
                    const jenisGudang = getKeyByValue(jenisGudangOptions, response.jenis_gudang) || '';
                    setGudangData({
                        nama: response.nama_gudang || '',
                        alamat: response.alamat_gudang || '',
                        jenis: jenisGudang
                    });
                }
            } catch (error) {
                console.error('Error fetching gudang details:', error);
            }
        };
    
        loadGudangDetails();
    }, [id_gudang]);
    
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setGudangData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSend = {
            nama: gudangData.nama,
            alamat: gudangData.alamat,
            kapasitas: 0,
            jenis: `0${gudangData.jenis}`.slice(-2)
        };
    
        try {
            await updateDetailGudang(id_gudang, dataToSend);
            alert('Data gudang berhasil diperbarui');
            navigate(`/staf-gudang/daftar-gudang/${id_gudang}`);
        } catch (error) {
            console.error('Error updating gudang:', error);
            alert('Error updating gudang: ' + error.message);
        }
    };
    
    
    const handleCancel = () => {
        navigate(`/staf-gudang/daftar-gudang/${id_gudang}`);
    };

    return (
        <div className='flex w-screen h-screen bg-gray-100'>
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='flex flex-col flex-1 overflow-hidden'>
                <Header title="Update Gudang"/>
                <div className='flex-1 overflow-y-auto p-8'>
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-center mb-6">Update Gudang</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Nama Gudang</label>
                            <input
                                type="text"
                                name="nama"
                                value={gudangData.nama}
                                onChange={handleChange}
                                className="input-field rounded-lg p-2 w-full border border-gray-300"
                                placeholder="Masukkan Nama Gudang"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Alamat Gudang</label>
                            <input
                                type="text"
                                name="alamat"
                                value={gudangData.alamat}
                                onChange={handleChange}
                                className="input-field rounded-lg p-2 w-full border border-gray-300"
                                placeholder="Masukkan Alamat Gudang"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">Jenis Gudang</label>
                            <select
                                name="jenis"
                                value={gudangData.jenis}
                                onChange={handleChange}
                                className="input-field rounded-lg p-2 w-full border border-gray-300"
                            >
                                <option value="">Pilih Jenis Gudang</option>
                                {Object.entries(jenisGudangOptions).map(([key, value]) => (
                                    <option key={key} value={key}>{value}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button
                                type="submit"
                                className="btn-tambah-barang"
                                style={{
                                    backgroundColor: '#2C358C',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                }}
                            >
                                Update Gudang
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="btn-batal"
                                style={{
                                    backgroundColor: '#DA3732',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                }}
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(GudangUpdate);
