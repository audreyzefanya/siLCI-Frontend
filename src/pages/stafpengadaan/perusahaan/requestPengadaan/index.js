import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/header';
import ModalResult from '../../../../components/modal/modalResult';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';
import { fetchAllGudang } from '../../../../service/gudangmanagement/endpoint';
import { GetDetailPerusahaan, PostCreatePengadaan } from '../../../../service/perusahaanimpor/endpoint';
import ModalLoading from '../../../../components/modal/modalLoading';
import { GetDetailBarang } from '../../../../service/daftarbarang/endpoint';
import Sidebar from '../../../../components/sidebar/stafpengadaan';

const RequestPengadaan = (props) => {
    const { id_perusahaan, id_barang } = useParams();
    const [isModalOpenResult, setIsModalOpenResult] = useState(false);
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);
    const [dataSubtitleModal, setDataSubtitleModal] = useState('');
    const [flagResult, setFlagResult] = useState('success');
    const [gudangTujuan, setGudangTujuan] = useState('');
    const [jumlah, setJumlah] = useState();
    const [perusahaan, setPerusahaan] = useState([]);
    const [barang, setBarang] = useState([]);
    const [daftarGudang, setDaftarGudang] = useState([]);
    const navigateTo = useNavigate();

    useEffect(() => {
        getAllGudang()
        getDetailBarang()
        getDetailPerusahaan()
    }, [id_perusahaan, id_barang])

    async function getAllGudang() {
        try {
            const daftarGudangData = await fetchAllGudang(); 
            setDaftarGudang(daftarGudangData)
        } catch (error) {
            console.error('Error fetching gudang data:', error);
        }
    }

    async function getDetailPerusahaan() {
        try {
            const perusahaanData = await GetDetailPerusahaan(id_perusahaan); 
            setPerusahaan(perusahaanData)
        } catch (error) {
            console.error('Error fetching perusahaan data:', error);
        }
    }

    async function getDetailBarang () {
        try {
            const response = await GetDetailBarang(id_barang);
            setBarang(response);
        } catch (error) {
            console.error('Error fetching barang detail:', error);
        }
    };

    async function handleSubmitTambahPengadaan(event) {
        event.preventDefault();
        if (barang && perusahaan) {
            try {
                setIsModalOpenLoading(true);
                const dataPengadaan = {
                    perusahaan: id_perusahaan,
                    barang: id_barang,
                    gudangTujuan: gudangTujuan,
                    jumlahBarang: jumlah,
                    totalHarga: (jumlah * barang.harga)
                };
                const response = await PostCreatePengadaan(dataPengadaan);
                setIsModalOpenLoading(false);
                handleOpenModalResult('success', 'Permintaan Pengadaan berhasil dibuat');
                navigateTo(`/staf-pengadaan/perusahaan/${id_perusahaan}`);
            } catch (error) {
                setIsModalOpenLoading(false);
                handleOpenModalResult('failed', 'Galat Pada Server, coba beberapa saat lagi atau refresh laman');
            }
        } else {
            handleOpenModalResult('failed', 'Galat Pada Server, coba beberapa saat lagi atau refresh laman');
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
        navigateTo(`/staf-pengadaan/perusahaan/${id_perusahaan}`);
    };

    return (
        <div className='flex w-screen h-screen bg-gray-100'>
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='flex flex-col flex-1 overflow-hidden'>
                <Header title={<span style={{ fontWeight: 'bold' }}></span>}/>
                <div className='flex-1 overflow-y-auto p-8'>
                    <form onSubmit={handleSubmitTambahPengadaan}>
                        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div className="text-4xl font-bold mb-4 mt-8" style={{ color: '#000000' }}>Request Pengadaan</div>
                                <div className="text-sm mb-4" style={{ color: '#666666', marginBottom: '20px' }}>
                                    {perusahaan.nama} - {barang.nama}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Jumlah</label>
                                <input
                                    type="text"
                                    value={jumlah}
                                    onChange={(e) => setJumlah(e.target.value)}
                                    placeholder="Masukkan Jumlah Barang Yang Ingin Dipesan"
                                    className="input-field rounded-lg p-2 w-full border border-gray-300"
                                    required 
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700">Gudang Tujuan</label>
                                <select
                                    value={gudangTujuan}
                                    onChange={(e) => setGudangTujuan(e.target.value)}
                                    menuPlacement="bottom"
                                    className="input-field rounded-lg p-2 w-full border border-gray-300"
                                    required  
                                >
                                    <option value="" disabled hidden>Pilih Gudang Tujuan</option>
                                    {daftarGudang.map((gudang) => (
                                        <option key={gudang.id} value={gudang.id}>{gudang.nama}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-center">
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
                                    Request
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
                    </form>
                </div>
            </div>
            <ModalLoading
                title="Loading..."
                subtitle="Please wait a moment"
                isOpen={isModalOpenLoading}
            />

            <ModalResult
                subtitle={dataSubtitleModal}
                type={flagResult}
                isOpen={isModalOpenResult}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestPengadaan);
