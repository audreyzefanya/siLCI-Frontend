import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/header';
import Sidebar from '../../../../components/sidebar/stafgudang';
import { fetchDetailGudang, updateDetailGudang } from '../../../../service/gudangmanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';

const GudangUpdate = (props) => {
    const { id_gudang } = useParams();
    const navigate = useNavigate();
    const [namaGudang, setNamaGudang] = useState('');
    const [alamatGudang, setAlamatGudang] = useState('');
    const [kapasitasGudang, setKapasitasGudang] = useState('');

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await fetchDetailGudang(id_gudang);
                if (response) {
                    setNamaGudang(response.nama_gudang);
                    setAlamatGudang(response.alamat_gudang);
                    setKapasitasGudang(response.kapasitas_gudang);
                }
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };
        fetchDetail();
    }, [id_gudang]);

    const handleSubmitUpdateGudang = async (event) => {
        event.preventDefault();
        try {
            const newData = {
                nama_gudang: namaGudang,
                alamat_gudang: alamatGudang,
                kapasitas_gudang: kapasitasGudang
            };
            await updateDetailGudang(id_gudang, newData);
            alert('Data gudang berhasil diperbarui');
            navigate('/staf-gudang/daftar-gudang');
        } catch (error) {
            console.error('Error updating gudang:', error);
            alert('Error updating gudang: ' + error.message);
        }
    };

    const handleCancel = () => {
        navigate('/staf-gudang/daftar-gudang');
    };

    return (
        <div className='flex w-screen h-screen bg-gray-100'>
            <Sidebar currentNavigation={2.3} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='flex flex-col flex-1 overflow-hidden'>
                <Header title={<span style={{ fontWeight: 'bold' }}></span>}/>
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
                                    placeholder="Masukkan Nama Gudang"
                                    className="input-field rounded-lg p-2 w-full border border-gray-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Alamat Gudang</label>
                                <input
                                    type="text"
                                    value={alamatGudang}
                                    onChange={(e) => setAlamatGudang(e.target.value)}
                                    placeholder="Masukkan Alamat Gudang"
                                    className="input-field rounded-lg p-2 w-full border border-gray-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Kapasitas Gudang</label>
                                <input
                                    type="text"
                                    value={kapasitasGudang}
                                    onChange={(e) => setKapasitasGudang(e.target.value)}
                                    placeholder="Masukkan Kapasitas Gudang"
                                    className="input-field rounded-lg p-2 w-full border border-gray-300"
                                />
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
                                    type="button" // Ubah ini untuk mencegah button bertindak sebagai submit
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
