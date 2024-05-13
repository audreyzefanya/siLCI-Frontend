import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/header';
import ModalResult from '../../../../components/modal/modalResult';
import Sidebar from '../../../../components/sidebar/adminkaryawan';
import { GetDetailBarang, UpdateBarang } from '../../../../service/daftarbarang/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';

const BarangUpdate = (props) => {
    const { id_barang } = useParams();
    const navigate = useNavigate();
    const [namaBarang, setNamaBarang] = useState('');
    const [deskripsiBarang, setDeskripsiBarang] = useState('');
    const [hargaBarang, setHargaBarang] = useState('');
    const [merkIdBarang, setMerkIdBarang] = useState('');
    const [fotoBarang, setFotoBarang] = useState(null);
    const [isChangingFoto, setIsChangingFoto] = useState(false);
    const [isModalOpenResult, setIsModalOpenResult] = useState(false);
    const [flagResult, setFlagResult] = useState('success');
    const [dataSubtitleModal, setDataSubtitleModal] = useState('');

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

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await GetDetailBarang(id_barang);
                if (response) {
                    setNamaBarang(response.nama);
                    setDeskripsiBarang(response.deskripsi);
                    setHargaBarang(response.harga);
                    setMerkIdBarang(response.merk.id);
                    setFotoBarang(response.foto);
                }
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };
        fetchDetail();
    }, [id_barang]);

    const handleSubmitUpdateBarang = async (event) => {
        event.preventDefault();
        try {
            const updateData = {
                nama: namaBarang,
                deskripsi: deskripsiBarang,
                harga: parseInt(hargaBarang, 10),
                merk_id: parseInt(merkIdBarang, 10),
                foto: fotoBarang
            };
            const response = await UpdateBarang(id_barang, updateData);
            if (response) {
                handleOpenModalResult('success', 'Barang berhasil diperbarui');
            } else {
                console.error('Tidak ada response atau response tidak sesuai.');
                handleOpenModalResult('failed', 'Gagal memperbarui barang');
            }
        } catch (error) {
            console.error('Error updating barang:', error);
            handleOpenModalResult('failed', 'Gagal memperbarui barang: ' + error.message);
        }
    };
    

    function handleOpenModalResult(type, subtitle) {
        setDataSubtitleModal(subtitle);
        setFlagResult(type);
        setIsModalOpenResult(true);
    
        setTimeout(() => {
            setIsModalOpenResult(false);
            if (type === 'success') {
                navigate('/admin-karyawan/barang');
            }
        }, 3000); 
    }
    

    const handleUploadFoto = (e) => {
        if (e.target.files.length > 0) {
            setIsChangingFoto(true);
            setFotoBarang(e.target.files[0]);
        }
    };

    const handleCancel = () => {
        navigate('/admin-karyawan/barang');
    };

    return (
        <div className='flex w-screen h-screen bg-gray-100'>
            <Sidebar currentNavigation={2.3} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='flex flex-col flex-1 overflow-hidden'>
                <Header title={<span style={{ fontWeight: 'bold' }}></span>}/>
                <div className='flex-1 overflow-y-auto p-8'>
                <h2 className="text-2xl font-bold text-center mb-6">Update Barang</h2>
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 flex">
                        <div className="flex-1">
                            {fotoBarang && !isChangingFoto && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Gambar Saat Ini</label>
                                    <img src={fotoBarang} alt="Current Foto" style={{ width: '100%', height: 'auto' }} />
                                    <button 
                                        onClick={() => setIsChangingFoto(true)} 
                                        className="btn-small"
                                        style={{
                                            backgroundColor: '#4A90E2', 
                                            color: '#FFFFFF', 
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s, transform 0.3s',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            marginTop: '8px',
                                        }}
                                    >
                                        Ganti Gambar
                                    </button>
                                </div>
                            )}
                            {isChangingFoto && (
                                <div>
                                    <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">Unggah Gambar Baru</label>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        className="input-field rounded-lg p-2 w-full border border-gray-300"
                                        onChange={handleUploadFoto}
                                        required
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 ml-4">
                            <form onSubmit={handleSubmitUpdateBarang}>
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
                                        rows={3}
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
                                        Update Barang
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

export default connect(mapStateToProps, mapDispatchToProps)(BarangUpdate);
