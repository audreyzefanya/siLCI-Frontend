import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/header';
import Sidebar from '../../../../components/sidebar/stafgudang';
import { fetchDataGudang, updateDetailGudang } from '../../../../service/gudangmanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';

const GudangUpdate = (props) => {
    const { id_gudang } = useParams();
    const navigate = useNavigate();
    const [namaGudang, setNamaGudang] = useState('');
    const [alamatGudang, setAlamatGudang] = useState('');
    const [jenisGudang, setJenisGudang] = useState('');

    useEffect(() => {
        const fetchGudangDetail = async () => {
            try {
                const response = await fetchDataGudang(id_gudang);
                if (response) {
                    setNamaGudang(response.nama || '');
                    setAlamatGudang(response.alamat || '');
                    setJenisGudang(response.jenis || '');
                }
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };
        fetchGudangDetail();
    }, [id_gudang]);

    const handleSubmitUpdateGudang = async (event) => {
        event.preventDefault();
        const newData = {
            nama: namaGudang,
            alamat: alamatGudang,
            kapasitas: 0, // Set kapasitas menjadi 0
            jenis: parseInt(jenisGudang, 10)
        };
        try {
            await updateDetailGudang(id_gudang, newData);
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
                <Header title={<span style={{ fontWeight: 'bold' }}>Update Gudang</span>}/>
                <div className='flex-1 overflow-y-auto p-8'>
                    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-center mb-6">Update Gudang</h2>
                        <form onSubmit={handleSubmitUpdateGudang}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nama Gudang</label>
                                <input
                                    type="text"
                                    value={namaGudang}
                                    onChange={(e) => setNamaGudang(e.target.value)}
                                    className="input-field rounded-lg p-2 w-full border border-gray-300"
                                    placeholder="Masukkan Nama Gudang"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Alamat Gudang</label>
                                <input
                                    type="text"
                                    value={alamatGudang}
                                    onChange={(e) => setAlamatGudang(e.target.value)}
                                    className="input-field rounded-lg p-2 w-full border border-gray-300"
                                    placeholder="Masukkan Alamat Gudang"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700">Jenis Gudang</label>
                                <select
                                    value={jenisGudang}
                                    onChange={(e) => setJenisGudang(e.target.value)}
                                    className="input-field rounded-lg p-2 w-full border border-gray-300"
                                >
                                    <option value="">Pilih Jenis Gudang</option>
                                    <option value="1">Bahan Baku</option>
                                    <option value="2">Penyimpanan</option>
                                    <option value="3">Cross-Docking</option>
                                    <option value="4">Produksi</option>
                                    <option value="5">Sortir</option>
                                    <option value="6">Transhipment</option>
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
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(GudangUpdate);
