import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/header';
import ModalResult from '../../../components/modal/modalResult';
import Sidebar from '../../../components/sidebar/manajer';
import { GetAllBarang } from '../../../service/barang/endpoint';
import { fetchDataGudang } from '../../../service/gudangmanagement/endpoint';
import { GetAllPabrik } from '../../../service/pabrik/endpoint';

import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';

const AddPermintaanPengiriman = (props) => {
    const navigate = useNavigate();
    const { id_gudang } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenResult, setIsModalOpenResult] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('');
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);
    const [flagResult, setFlagResult] = useState('success');
    const [dataSubtitleModal, setDataSubtitleModal] = useState('');
    const [formData, setFormData] = useState({
        pabrik: '',
        gudang: '',
        barang: '',
        jumlah: '',
        status: 1,
        waktu_permintaan: '',
        tanggal_pengiriman: ''
    });
    const [pabriks, setPabriks] = useState([]);
    const [gudangs, setGudangs] = useState([]);
    const [barangs, setBarangs] = useState([]);
    const [statusPermintaanPengiriman, setStatusPermintaanPengiriman] = useState('');
    const navigateTo = useNavigate();


    useEffect(() => {
        fetchPabriks();
        fetchGudangs();
        fetchBarangs();
        if (statusPermintaanPengiriman === '') {
            setStatusPermintaanPengiriman(1);
        }
    }, []);

    const fetchPabriks = async () => {
        const data = await GetAllPabrik();
        setPabriks(data || []);
    };

    const fetchGudangs = async () => {
        const data = await fetchDataGudang();
        setGudangs(data || []);
    };

    const fetchBarangs = async () => {
        const data = await GetAllBarang();
        setBarangs(data || []);
    };

    const handleChange = (e) => {
        const value = e.target.name === "jumlah" ? parseInt(e.target.value) || 0 : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
        console.log(formData); 
    };
    
    

    const handleStatusChange = (e) => {
        setStatusPermintaanPengiriman(parseInt(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsModalOpenLoading(true);
        try {
            const response = await addPermintaanPengirimanAPI(formData, id_gudang);
            handleOpenModalResult('success', 'Permintaan pengiriman berhasil ditambahkan');
            navigateTo(`/manager-operasional/permintaanpengiriman/${id_gudang}`);
        } catch (error) {
            setIsModalOpenLoading(false);
            handleOpenModalResult('failed', error.message || 'Gagal menambahkan permintaan pengiriman');
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
        navigateTo(`/manager-operasional/permintaanpengiriman/${id_gudang}`);
    };

    return (
        <div className='flex w-screen h-screen bg-gray-100'>
            <Sidebar currentNavigation={2.2} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='flex flex-col flex-1 overflow-hidden'>
                <Header title=""/>
                <form className='flex-1 overflow-y-auto p-8' onSubmit={handleSubmit}>
                    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                    <div className="text-4xl font-bold mb-4 mt-8" style={{ color: '#000000', marginBottom: '20px' }}>Tambah Permintaan Pengiriman</div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Pabrik</label>
                            <select name="pabrik" value={formData.pabrik} onChange={handleChange} required className="input-field">
                                {pabriks.map(p => (<option key={p.id} value={p.id}>{p.nama}</option>))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Gudang</label>
                            <select name="gudang" value={formData.gudang} onChange={handleChange} required className="input-field">
                                {gudangs.map(g => (<option key={g.id} value={g.id}>{g.nama}</option>))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Barang</label>
                            <select name="barang" value={formData.barang} onChange={handleChange} required className="input-field">
                                {barangs.map(b => (<option key={b.id} value={b.id}>{b.nama}</option>))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Jumlah</label>
                            <input type="number" name="jumlah" value={formData.jumlah} onChange={handleChange} required className="input-field"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Status Batch</label>
                            <select
                                value={formData.statusPermintaanPengiriman}
                                onChange={handleStatusChange}
                                className="input-field rounded-lg p-2 w-full border border-gray-300"
                            >
                                <option value={1}>Menunggu Konfirmasi</option>
                                <option value={2} disabled>Sedang Diproses</option>
                                <option value={3} disabled>Telah Dikirim</option>
                                <option value={4}>Telah Diterima</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Waktu Permintaan</label>
                            <input
                                type="datetime-local"
                                name="waktu_permintaan"
                                value={formData.waktu_permintaan}
                                onChange={handleChange}
                                required
                                className="input-field rounded-lg p-2 w-full border border-gray-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Tanggal Pengiriman</label>
                            <input type="date" name="tanggal_pengiriman" value={formData.tanggal_pengiriman} onChange={handleChange} required className="input-field"/>
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
                            onClick={handleSubmit}
                            type="submit" 
                            className="btn-tambah"                            
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
                            Tambah Permintaan Pengiriman
                        </button>
                        </div>
                    </div>
                </form>
            </div>
            <ModalResult
                subtitle={modalMessage}
                type={modalType}
                isOpen={isModalOpen}
            />
        </div>
    );
};


async function addPermintaanPengirimanAPI(formData, id_gudang) {
    const url = `https://propensi-a08-be-production.up.railway.app/api/gudang/permintaanpengiriman/${id_gudang}`;
    console.log("Sending data to server:", JSON.stringify(formData));
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log("Received data from server:", data);
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}, Message: ${data.message || ''}`);
            throw new Error(`HTTP error! Status: ${response.status}, ${data.message || ''}`);
        }
        return data;
    } catch (error) {
        console.error("Fetch error:", error.message);
        throw error;  
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPermintaanPengiriman);