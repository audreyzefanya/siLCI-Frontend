import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../components/header';
import ModalResult from '../../../../components/modal/modalResult';
import Sidebar from '../../../../components/sidebar/adminkaryawan';
import { PostAddBarang } from '../../../../service/daftarbarang/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';

const AddBarang = (props) => {
    const [isModalOpenResult, setIsModalOpenResult] = useState(false);
    const [dataSubtitleModal, setDataSubtitleModal] = useState('');
    const [flagResult, setFlagResult] = useState('success');
    const [namaBarang, setNamaBarang] = useState('');
    const [deskripsiBarang, setDeskripsiBarang] = useState('');
    const [hargaBarang, setHargaBarang] = useState('');
    const [merkIdBarang, setMerkIdBarang] = useState('');
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);
    const navigateTo = useNavigate();
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

    async function handleSubmitTambahBarang() {
        try {
            setIsModalOpenLoading(true);
            const dataBarang = {
                nama: namaBarang,
                deskripsi: deskripsiBarang,
                harga: parseInt(hargaBarang),
                merk_id: parseInt(merkIdBarang)
            };
            const response = await PostAddBarang(dataBarang);
            setIsModalOpenLoading(false);
            handleOpenModalResult('success', 'Barang berhasil ditambahkan');
            navigateTo('/admin-karyawan/barang');
        } catch (error) {
            setIsModalOpenLoading(false);
            handleOpenModalResult('failed', 'Gagal menambahkan barang');
        }
    }

    function handleOpenModalResult(type, subtitle) {
        setTimeout(() => {
            setFlagResult(type);
            setDataSubtitleModal(subtitle);
            setIsModalOpenResult(true);
            setTimeout(() => {
                setIsModalOpenResult(false);
            }, 1000);
        }, 100);
    }

    const handleCancel = () => {
        navigateTo('/admin-karyawan/barang');
    };

    return (
        <div className='flex w-screen h-screen bg-gray-100'>
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='flex flex-col flex-1 overflow-hidden'>
            <Header title={<span style={{ fontWeight: 'bold' }}>Tambah Barang</span>}/>
                <div className='flex-1 overflow-y-auto p-8'>
                    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
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
                                placeholder="Pilih Merek"
                                className="input-field rounded-lg p-2 w-full border border-gray-300"
                            >
                                <option value="">Pilih Merek</option>
                                {brandOptions.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleSubmitTambahBarang}
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
                                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalResult
                subtitle={dataSubtitleModal}
                type={flagResult}
                isOpen={isModalOpenResult}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBarang);
