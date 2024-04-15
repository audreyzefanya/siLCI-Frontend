import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/header';
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
                merk_id: parseInt(merkIdBarang, 10)
            };
            const response = await UpdateBarang(id_barang, updateData);
            if (response) {
                navigate('/admin-karyawan/barang');
            } else {
                console.error('Tidak ada response atau response tidak sesuai.');
                alert('Tidak ada response atau response tidak sesuai.');
            }
        } catch (error) {
            console.error('Error updating barang:', error);
            let errorMessage = "An error occurred";
            if (error.response && error.response.data) {
                errorMessage = error.response.data.message || JSON.stringify(error.response.data);
            } else {
                errorMessage = error.message;
            }
            alert('Error updating barang: ' + errorMessage);
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
                    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-center mb-6">Update Barang</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(BarangUpdate);
