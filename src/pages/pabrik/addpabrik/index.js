import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import ModalResult from '../../../components/modal/modalResult';
import Sidebar from '../../../components/sidebar/manajer';
import { PostAddPabrik } from '../../../service/pabrik/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';

const AddPabrik = (props) => {
    const [isModalOpenResult, setIsModalOpenResult] = useState(false);
    const [dataSubtitleModal, setDataSubtitleModal] = useState('');
    const [flagResult, setFlagResult] = useState('success');
    const [namaPabrik, setNamaPabrik] = useState('');
    const [alamatPabrik, setAlamatPabrik] = useState('');
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);
    const navigateTo = useNavigate();

    async function handleSubmitTambahPabrik() {
        try {
            setIsModalOpenLoading(true);
            const dataPabrik = {
                nama: namaPabrik,
                alamat: alamatPabrik
            };
            const response = await PostAddPabrik(dataPabrik);
            setIsModalOpenLoading(false);
            handleOpenModalResult('success', 'Pabrik berhasil ditambahkan');
            navigateTo('/manager-operasional/pabrik');
        } catch (error) {
            setIsModalOpenLoading(false);
            handleOpenModalResult('failed', 'Gagal menambahkan pabrik');
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
        navigateTo('/manager-operasional/pabrik');
    };

    return (
        <div className='flex w-screen h-screen bg-gray-100'>
            <Sidebar currentNavigation={2.2} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='flex flex-col flex-1 overflow-hidden'>
            <Header title={<span style={{ fontWeight: 'bold' }}>Tambah Pabrik</span>}/>
                <div className='flex-1 overflow-y-auto p-8'>
                    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Nama Pabrik</label>
                            <input
                                type="text"
                                value={namaPabrik}
                                onChange={(e) => setNamaPabrik(e.target.value)}
                                placeholder="Masukkan Nama Pabrik"
                                className="input-field rounded-lg p-2 w-full border border-gray-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Alamat Pabrik</label>
                            <textarea
                                value={alamatPabrik}
                                onChange={(e) => setAlamatPabrik(e.target.value)}
                                placeholder="Masukkan Alamat Pabrik"
                                className="input-field rounded-lg p-2 w-full border border-gray-300"
                            />
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
                            onClick={handleSubmitTambahPabrik}
                            className="btn-tambah-pabrik mr-4"
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
                            Tambah Pabrik
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

export default connect(mapStateToProps, mapDispatchToProps)(AddPabrik);
