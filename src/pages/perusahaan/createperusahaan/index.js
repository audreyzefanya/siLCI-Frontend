import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import ModalLoading from '../../../components/modal/modalLoading';
import ModalResult from '../../../components/modal/modalResult';
import Sidebar from '../../../components/sidebar/manajer';
import { CreatePerusahaanImpor } from '../../../service/fileUpload/endpoint';
import { GetAdminImport } from '../../../service/usermanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';

const CreatePerusahaan = (props) => {
    const [isModalOpenResult, setIsModalOpenResult] = useState(false);
    const [dataSubtitleModal, setDataSubtitleModal] = useState('');
    const [flagResult, setFlagResult] = useState('success');
    const [namaPerusahaan, setNamaPerusahaan] = useState('');
    const [deskripsiPerusahaan, setDeskripsiPerusahaan] = useState('');
    const [adminPerusahaan, setAdminPerusahaan] = useState("");
    const [daftarAdmin, setDaftarAdmin] = useState([]);
    const [logoPerusahaan, setLogoPerusahaan] = useState(null)

    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);
    const navigateTo = useNavigate();

    useEffect(() => {
        getAllAdminImport()
    }, [])

    async function getAllAdminImport() {
        try {
            const daftarAdminData = await GetAdminImport(); 
            setDaftarAdmin(daftarAdminData)
        } catch (error) {
            console.error('Error fetching admin perusahaan data:', error);
        }
    }

    async function handleSubmitTambahPerusahaan(event) {
        event.preventDefault();
        try {
            setIsModalOpenLoading(true);
            const dataPerusahaan = {
                nama: namaPerusahaan,
                deskripsi: deskripsiPerusahaan,
                admin: adminPerusahaan,
                logo: logoPerusahaan,
            };
            const response = await CreatePerusahaanImpor(dataPerusahaan);
            setIsModalOpenLoading(false);
            handleOpenModalResult('success', 'Perusahaan berhasil ditambahkan');
            navigateTo('/manager-operasional/perusahaan');
        } catch (error) {
            setIsModalOpenLoading(false);
            handleOpenModalResult('failed', 'User Sudah Terhubung Pada Perusahaan Lain');
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
        navigateTo('/manager-operasional/perusahaan');
    };

    const handleUploadLogo = (e) => {
        setLogoPerusahaan(e.target.files[0]);
    };

    return (
        <div className='flex w-screen h-screen bg-gray-100'>
            <Sidebar currentNavigation={3.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='flex flex-col flex-1 overflow-hidden'>
                <Header title={<span style={{ fontWeight: 'bold' }}></span>}/>
                <div className='flex-1 overflow-y-auto p-8'>
                    <form onSubmit={handleSubmitTambahPerusahaan}>
                        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                            <div className="text-4xl font-bold mb-4 mt-8" style={{ color: '#000000', marginBottom: '20px' }}>Tambah Perusahaan</div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nama Perusahaan</label>
                                <input
                                    type="text"
                                    value={namaPerusahaan}
                                    onChange={(e) => setNamaPerusahaan(e.target.value)}
                                    placeholder="Masukkan Nama Perusahaan"
                                    className="input-field rounded-lg p-2 w-full border border-gray-300"
                                    required 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Deskripsi Perusahaan</label>
                                <textarea
                                    value={deskripsiPerusahaan}
                                    onChange={(e) => setDeskripsiPerusahaan(e.target.value)}
                                    placeholder="Masukkan Deskripsi Perusahaan"
                                    className="input-field rounded-lg p-2 w-full border border-gray-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">Upload Image</label>
                                <input type="file" id="imageUpload" accept="image/*" className="input-field rounded-lg p-2 w-full border border-gray-300" onChange={handleUploadLogo} required />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700">Admin Perusahaan Import</label>
                                <select
                                    value={adminPerusahaan}
                                    onChange={(e) => setAdminPerusahaan(e.target.value)}
                                    className="input-field rounded-lg p-2 w-full border border-gray-300"
                                    required  
                                >
                                    <option value="" disabled hidden>Pilih Admin Perusahaan Import</option>
                                    {daftarAdmin.map((admin) => (
                                        <option key={admin.id} value={admin.id}>{admin.email}</option>
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
                                    Tambah Perusahaan
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePerusahaan);
