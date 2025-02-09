import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tambahGudang } from '../../../../service/gudangmanagement/endpoint';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';
import Sidebar from '../../../../components/sidebar/stafgudang';
import Header from '../../../../components/header';
import { fetchDataGudang } from '../../../../service/gudangmanagement/endpoint';
import DropdownText from '../../../../components/dropdown/dropdownText';
import ModalResult from '../../../../components/modal/modalResult';

const AddGudang = (props) => {
    const { id_gudang } = useParams();
    const [daftarGudang, setDaftarGudang] = useState([]);
    const [namaGudang, setNamaGudang] = useState('');
    const [alamatGudang, setAlamatGudang] = useState('');
    const [jenisGudang, setJenisGudang] = useState('');
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);
    const [isModalOpenResult, setIsModalOpenResult] = useState(false);
    const [dataSubtitleModal, setDataSubtitleModal] = useState('');
    const [flagResult, setFlagResult] = useState('success');
    const navigateTo = useNavigate();
    const brandOptions = [
        { id: 1, name: 'Bahan Baku' },
        { id: 2, name: 'Penyimpanan' },
        { id: 3, name: 'Cross-Docking' },
        { id: 4, name: 'Produksi' },
        { id: 5, name: 'Sortir' },
        { id: 6, name: 'Transhipment' },
    ];

    const kapasitasGudang = 0; // Atur kapasitas ke nilai 0 secara default

    useEffect(() => {
        fetchDataGudang();
    }, []);

    async function fetchDataGudang() {
        try {
            const gudangData = await fetchDataGudang();
            setDaftarGudang(gudangData);
        } catch (error) {
            console.error('Error fetching barang data:', error);
        }
    }

    function handleToDaftarGudang() {
        navigateTo('/staf-gudang/daftar-gudang');
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

    async function handleSubmitTambahGudang() {
        try {
            setIsModalOpenLoading(true);
            const dataGudang = {
                nama: namaGudang,
                alamat: alamatGudang,
                kapasitas: kapasitasGudang, // Menggunakan nilai kapasitas yang telah ditentukan
                jenis: jenisGudang
            };
            const response = await tambahGudang(dataGudang);
            setIsModalOpenLoading(false);
            handleOpenModalResult('success', 'Gudang berhasil ditambahkan');
            setTimeout(() => {
                handleToDaftarGudang();
            }, 1000);
        } catch (error) {
            setIsModalOpenLoading(false);
            handleOpenModalResult('failed', 'Gagal menambahkan gudang');
        }
    }

    const handleNamaGudangChange = (e) => {
        setNamaGudang(e.target.value);
    };

    const handleAlamatGudangChange = (e) => {
        setAlamatGudang(e.target.value);
    };

    const handleJenisGudangChange = (e) => {
        setJenisGudang(e.target.value);
    };

    const handleCancel = () => {
        navigateTo('/staf-gudang/daftar-gudang');
    };

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title=''/>
                <div className='flex-1 bg-neutral20 p-8 overflow-y-auto'>
                    <div className="max-w-md mx-auto my-auto">
                        <div className="bg-white rounded-md drop-shadow-md p-8">
                            <div className="text-3xl font-bold mb-8 ">Tambah Gudang</div>
                            <div className="mb-4">
                                <label htmlFor="namaGudang" className="block font-semibold mb-2">Nama Gudang</label>
                                <input
                                    type="text"
                                    id="namaGudang"
                                    value={namaGudang}
                                    onChange={handleNamaGudangChange}
                                    placeholder="Nama Gudang"
                                    className="bg-gray-100 w-full py-2 px-4 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="alamatGudang" className="block font-semibold mb-2">Alamat Gudang</label>
                                <input
                                    type="text"
                                    id="alamatGudang"
                                    value={alamatGudang}
                                    onChange={handleAlamatGudangChange}
                                    placeholder="Alamat Gudang"
                                    className="bg-gray-100 w-full py-2 px-4 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="jenisGudang" className="block font-semibold mb-2">Jenis Gudang</label>
                                <select
                                    id="jenisGudang"
                                    value={jenisGudang}
                                    onChange={handleJenisGudangChange}
                                    className="w-full border bg-gray-100 rounded px-3 py-2 outline-none"
                                >
                                    <option value="">Pilih Jenis Gudang</option>
                                    {brandOptions.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={handleCancel}
                                    style={{ backgroundColor: '#DA3732', color: 'white' }}
                                    className="py-2 px-4 rounded-md w-1/2 mr-2"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleSubmitTambahGudang}
                                    className="bg-primary500 text-white py-2 px-4 rounded-md w-1/2"
                                >
                                    Tambah
                                </button>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddGudang);
