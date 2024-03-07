import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tambahGudang } from '../../../service/gudangmanagement/endpoint';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import { fetchDataGudang } from '../../../service/gudangmanagement/endpoint';
import DropdownText from '../../../components/dropdown/dropdownText';
import ModalResult from '../../../components/modal/modalResult';

const AddBarangPerusahaan = (props) => {
    const { id_perusahaan } = useParams();
    const [daftarGudang, setDaftarGudang] = useState([]);
    const [namaGudang, setNamaGudang] = useState('');
    const [alamatGudang, setAlamatGudang] = useState('');
    const [kapasitasGudang, setKapasitasGudang] = useState('');
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
        setTimeout(() => {
            navigateTo('/gudang/all');
        }, 500);
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
                kapasitas: kapasitasGudang,
                jenis: jenisGudang
            };
            const response = await tambahGudang(dataGudang);
            setIsModalOpenLoading(false);
            handleOpenModalResult('success', 'Gudang berhasil ditambahkan');
            // Tambahkan logika lain yang diperlukan setelah berhasil menambahkan gudang
        } catch (error) {
            setIsModalOpenLoading(false);
            handleOpenModalResult('failed', 'Gagal menambahkan gudang');
            // Tambahkan logika lain untuk penanganan kesalahan
        }
    }

    const handleNamaGudangChange = (e) => {
        setNamaGudang(e.target.value);
    };

    const handleAlamatGudangChange = (e) => {
        setAlamatGudang(e.target.value);
    };

    const handleKapasitasGudangChange = (e) => {
        setKapasitasGudang(e.target.value);
    };

    const handleJenisGudangChange = (e) => {
        setJenisGudang(e.target.value);
    };

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title= ' Tambah Gudang' />
                <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-3 px-8'>
                    <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-md drop-shadow-md p-4 mb-4">
                            <input
                                type="text"
                                value={namaGudang}
                                onChange={handleNamaGudangChange}
                                placeholder="Nama Gudang"
                                className="bg-gray-100 w-full py-2 px-4 rounded-md mb-2"
                            />
                            <input
                                type="text"
                                value={alamatGudang}
                                onChange={handleAlamatGudangChange}
                                placeholder="Alamat Gudang"
                                className="bg-gray-100 w-full py-2 px-4 rounded-md mb-2"
                            />
                            <input
                                type="text"
                                value={kapasitasGudang}
                                onChange={handleKapasitasGudangChange}
                                placeholder="Kapasitas Gudang"
                                className="bg-gray-100 w-full py-2 px-4 rounded-md mb-2"
                            />
                            <div className="bg-gray-100 w-full py-2 px-4 rounded-md mb-2">
                                <select
                                    value={jenisGudang}
                                    onChange={handleJenisGudangChange}
                                    className="w-full border bg-white rounded px-3 py-2 outline-none"
                                >
                                    <option value="">Jenis Gudang</option>
                                    {brandOptions.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={handleSubmitTambahGudang}
                                className="bg-primary500 text-white py-2 px-4 rounded-md"
                            >
                                Tambah Gudang
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

export default connect(mapStateToProps, mapDispatchToProps)(AddBarangPerusahaan);
