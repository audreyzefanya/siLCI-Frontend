import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/header';
import ModalResult from '../../../components/modal/modalResult';
import Sidebar from '../../../components/sidebar/manajer';
import { postBatchProduksi } from '../../../service/pabrik/endpoint';
import { GetAllBarang } from '../../../service/barang/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';

const AddBatch = (props) => {
    const { nama_pabrik } = useParams();
    const [isModalOpenResult, setIsModalOpenResult] = useState(false);
    const [dataSubtitleModal, setDataSubtitleModal] = useState('');
    const [flagResult, setFlagResult] = useState('success');
    const [daftarBarang, setDaftarBarang] = useState([]);
    const [kodeBarang, setKodeBarang] = useState('');
    const [jumlahBarang, setJumlahBarang] = useState('');
    const [statusBatch, setStatusBatch] = useState('');
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);
    const navigateTo = useNavigate();

    useEffect(() => {
        fetchDataBarang();
        if (statusBatch === '') {
            setStatusBatch(1);
        }
    }, []);

    async function fetchDataBarang() {
        try {
            const dataBarang = await GetAllBarang();
            setDaftarBarang(dataBarang);
        } catch (error) {
            console.error('Error fetching data barang:', error);
        }
    }

    async function handleSubmitTambahBatch() {
        try {
            setIsModalOpenLoading(true);
            const dataBatch = {
                barang_id: kodeBarang,
                jumlah: jumlahBarang,
                status: statusBatch
            };
            const response = await postBatchProduksi(dataBatch, nama_pabrik);
            setIsModalOpenLoading(false);
            handleOpenModalResult('success', 'Batch berhasil ditambahkan');
            navigateTo(`/manager-operasional/pabrik/detail/${nama_pabrik}/batch`);
        } catch (error) {
            setIsModalOpenLoading(false);
            handleOpenModalResult('failed', 'Gagal menambahkan batch');
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
        navigateTo(`/manager-operasional/pabrik/detail/${nama_pabrik}/batch`);
    };

    const handleStatusChange = (e) => {
        setStatusBatch(parseInt(e.target.value));
    };

    return (
        <div className='flex w-screen h-screen bg-gray-100'>
            <Sidebar currentNavigation={2.2} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='flex flex-col flex-1 overflow-hidden'>
            <Header title={<span style={{ fontWeight: 'bold' }}></span>}/>
                <div className='flex-1 overflow-y-auto p-8'>
                    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                    <div className="text-4xl font-bold mb-4 mt-8" style={{ color: '#000000', marginBottom: '20px' }}>Tambah Batch Produksi</div>
                        <div className="mb-4">
                            <select
                                value={kodeBarang}
                                onChange={(e) => setKodeBarang(e.target.value)}
                                className="input-field rounded-lg p-2 w-full border border-gray-300"
                                >
                                <option value="">Pilih Barang</option>
                                {daftarBarang.map(barang => (
                                <option key={barang.id} value={barang.id}>{barang.nama}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Jumlah Stok Barang</label>
                            <textarea
                                value={jumlahBarang}
                                onChange={(e) => setJumlahBarang(e.target.value)}
                                placeholder="Masukkan Jumlah Barang"
                                className="input-field rounded-lg p-2 w-full border border-gray-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Status Batch</label>
                            <select
                                value={statusBatch}
                                onChange={handleStatusChange}
                                className="input-field rounded-lg p-2 w-full border border-gray-300"
                            >
                                <option value={1}>Sedang Diproses</option>
                                <option value={2}>Menunggu QC</option>
                                <option value={3}>Selesai dan menunggu dikirim</option>
                                <option value={4}>Terkirim</option>
                                <option value={5}>Gagal</option>
                            </select>
                        </div>
                        <div className="flex justify-center">
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
                        <button
                            onClick={handleSubmitTambahBatch}
                            className="btn-tambah-batch mr-4"
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
                            Tambah Batch Produksi
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

export default connect(mapStateToProps, mapDispatchToProps)(AddBatch);
