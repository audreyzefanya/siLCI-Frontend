import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import ModalResult from '../../../components/modal/modalResult';
import Sidebar from '../../../components/sidebar/manajer';
import { PostAddBarang } from '../../../service/daftarbarang/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';

const AddBarang = (props) => {
    const [isModalOpenResult, setIsModalOpenResult] = useState(false);
    const [dataSubtitleModal, setDataSubtitleModal] = useState('');
    const [flagResult, setFlagResult] = useState('success');
    const [namaBarang, setNamaBarang] = useState('');
    const [deskripsiBarang, setDeskripsiBarang] = useState('');
    const [hargaBarang, setHargaBarang] = useState('');
    const [merkIdBarang, setMerkIdBarang] = useState('');
    const [fotoBarang, setFotoBarang] = useState(null);
    const navigate = useNavigate();

    const brandOptions = [
        { id: 1, name: 'STP' },
        { id: 2, name: 'Turtle Wax' },
        { id: 3, name: 'Penray' },
        { id: 4, name: 'Prestone' },
        { id: 5, name: 'Armor All' },
        { id: 6, name: 'SIP' },
        { id: 7, name: 'CHW' },
        { id: 8, name: 'AutoGard' },
        { id: 9, name: 'California Scents' },
    ];

    async function handleSubmitTambahBarang(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nama', namaBarang);
            formData.append('deskripsi', deskripsiBarang);
            formData.append('harga', hargaBarang);
            formData.append('merk_id', merkIdBarang);
            formData.append('foto', fotoBarang);

            const response = await PostAddBarang(formData);
            handleOpenModalResult('success', 'Barang berhasil ditambahkan');
        } catch (error) {
            console.error('Error adding warehouse:', error);
            handleOpenModalResult('failed', 'Gagal menambahkan barang');
        }
    }

    function handleOpenModalResult(type, subtitle) {
        setDataSubtitleModal(subtitle);
        setFlagResult(type);
        setIsModalOpenResult(true);
        
        const delay = type === 'success' ? 3000 : 2000; 

        setTimeout(() => {
            setIsModalOpenResult(false);
            if (type === 'success') {
                navigate('/manager-operasional/barang');
            }
        }, delay);
    }
    

    const handleCancel = () => {
        navigate('/manager-operasional/barang');
    };

    const handleUploadFoto = (e) => {
        if (e.target.files[0]) {
            setFotoBarang(e.target.files[0]);
        }
    };

    return (
        <div className='flex w-screen h-screen bg-gray-100'>
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar}/>
            <div className='flex flex-col flex-1 overflow-hidden'>
                <Header />
                <div className='flex-1 overflow-y-auto p-8'>
                    <h2 className="text-2xl font-bold text-center mb-6">Tambah Barang</h2>
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 flex">
                        <div className="flex-1">
                            <div className="mb-4">
                                <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">Unggah Gambar</label>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept="image/*"
                                    className="input-field rounded-lg p-2 w-full border border-gray-300"
                                    onChange={handleUploadFoto}
                                    required
                                />
                                {fotoBarang && (
                                    <img src={URL.createObjectURL(fotoBarang)} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
                                )}
                            </div>
                        </div>
                        <div className="flex-1 ml-4">
                            <form onSubmit={handleSubmitTambahBarang}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Nama Barang</label>
                                    <input
                                        type="text"
                                        value={namaBarang}
                                        onChange={(e) => setNamaBarang(e.target.value)}
                                        placeholder="Masukkan Nama Barang"
                                        className="input-field rounded-lg p-2 w-full border border-gray-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Deskripsi Barang</label>
                                    <textarea
                                        value={deskripsiBarang}
                                        onChange={(e) => setDeskripsiBarang(e.target.value)}
                                        placeholder="Masukkan Deskripsi Barang"
                                        className="input-field rounded-lg p-2 w-full border border-gray-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Harga Barang</label>
                                    <input
                                        type="number"
                                        value={hargaBarang}
                                        onChange={(e) => setHargaBarang(e.target.value)}
                                        placeholder="Masukkan Harga Barang"
                                        className="input-field rounded-lg p-2 w-full border border-gray-300"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700">Merek</label>
                                    <select
                                        value={merkIdBarang}
                                        onChange={(e) => setMerkIdBarang(e.target.value)}
                                        className="input-field rounded-lg p-2 w-full border border-gray-300"
                                    >
                                        <option value="">Pilih Merek</option>
                                        {brandOptions.map((brand) => (
                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        type="submit"
                                        className="btn-tambah-barang mr-4"
                                        style={{
                                            backgroundColor: '#2C358C',
                                            color: '#FFFFFF',
                                            border: 'none',
                                            padding: '10px 20px',
                                            borderRadius: '20px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s',
                                        }}
                                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                        Tambah Barang
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
            </div>
            <ModalResult
                subtitle={dataSubtitleModal}
                type={flagResult}
                isOpen={isModalOpenResult}
                onClose={() => setIsModalOpenResult(false)}
            />

        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBarang);