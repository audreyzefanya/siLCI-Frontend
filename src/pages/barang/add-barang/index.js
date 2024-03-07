import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);
    const navigateTo = useNavigate();
    const { id_barang } = useParams();
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
        } catch (error) {
            setIsModalOpenLoading(false);
            handleOpenModalResult('failed', 'Gagal menambahkan barang');
        }
    }

    const handleNamaBarangChange = (e) => {
        setNamaBarang(e.target.value);
    };

    const handleDeskripsiBarangChange = (e) => {
        setDeskripsiBarang(e.target.value);
    };

    const handleHargaBarangChange = (e) => {
        setHargaBarang(e.target.value);
    };

    const handleMerkIdBarangChange = (e) => {
        setMerkIdBarang(e.target.value);
    };

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title={`Tambah Gudang`}/>
                <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-3 px-8'>
                    <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-md drop-shadow-md p-4 mb-4">
                            <input
                                type="text"
                                value={namaBarang}
                                onChange={handleNamaBarangChange}
                                placeholder="Nama Barang"
                                className="bg-gray-100 w-full py-2 px-4 rounded-md mb-2"
                            />
                            <input
                                type="text"
                                value={deskripsiBarang}
                                onChange={handleDeskripsiBarangChange}
                                placeholder="Deskripsi Barang"
                                className="bg-gray-100 w-full py-2 px-4 rounded-md mb-2"
                            />
                            <input
                                type="number"
                                value={hargaBarang}
                                onChange={handleHargaBarangChange}
                                placeholder="Harga Barang"
                                className="bg-gray-100 w-full py-2 px-4 rounded-md mb-2"
                            />
                            <div className="bg-gray-100 w-full py-2 px-4 rounded-md mb-2">
                                <select
                                    value={merkIdBarang}
                                    onChange={handleMerkIdBarangChange}
                                    className="w-full border bg-white rounded px-3 py-2 outline-none"
                                >
                                    <option value="">Pilih Merek</option>
                                    {brandOptions.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={handleSubmitTambahBarang}
                                className="bg-primary500 text-white py-2 px-4 rounded-md"
                            >
                                Tambah Barang
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
