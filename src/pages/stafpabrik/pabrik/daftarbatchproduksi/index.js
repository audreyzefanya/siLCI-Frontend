import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Header from '../../../../components/header';
import Sidebar from '../../../../components/sidebar/stafpabrik';
import { getAllBatchProduksiInPabrik } from '../../../../service/pabrik/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabPabrikGudang from '../../../../components/tabPabrikGudang';
import ModalLoading from '../../../../components/modal/modalLoading';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Tambahkan ini

const getStatusString = (status) => {
    switch (status) {
        case 1:
            return 'Sedang Diproses';
        case 2:
            return 'Menunggu QC ';
        case 3:
            return 'Selesai';
        case 4:
            return 'Siap Dikirim';
        case 5:
            return 'Gagal';
        default:
            return 'Status Tidak Dikenal';
    }
};

const DaftarBatch = (props) => {
    const { nama_pabrik } = useParams();
    const navigate = useNavigate();
    const [daftarBatch, setDaftarBatch] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);

    useEffect(() => {
        fetchDaftarBatch();
    }, [nama_pabrik]);

    const fetchDaftarBatch = async () => {
        try {
            setIsModalOpenLoading(true);
            const data = await getAllBatchProduksiInPabrik(nama_pabrik);
            setDaftarBatch(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsModalOpenLoading(false);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBatch = daftarBatch
        ? daftarBatch.filter(produksi =>
            produksi.kode_produksi.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.2} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title='' style={{color: 'black'}}/>
                <div className="flex items-center text-3xl font-bold mb-10 ml-10 mt-8" style={{ color: '#000000' }}>
                    <span style={{ marginRight: '20px' }}>{nama_pabrik}</span>
                    <Button
                        size="sm"
                        onClick={() => navigate(`/staf-pabrik/pabrik/detail/${nama_pabrik}/batch/add`)}
                        style={{
                            borderRadius: '20px',
                            backgroundColor: '#DA3732',
                            borderColor: '#DA3732',
                            color: 'white',
                            padding: '5px 15px',
                            fontSize: '1rem',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s ease-in-out',
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        + Tambah Batch Produksi
                    </Button>
                </div>
                <div className="ml-10 mb-4">
                    <div style={{ position: 'relative' }}>
                        <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#A0AEC0', fontSize: '18px' }} />
                        <input
                            type="text"
                            placeholder="Cari kode batch..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{ paddingLeft: '40px' }}
                        />
                    </div>
                </div>
                <TabPabrikGudang
                    tabAktif={"Batch Produksi"}
                />
                <div className='no-scrollbar flex-1 overflow-y-auto py-6 px-8' style={{ backgroundColor: '#F9FAFB' }}>
                    <div className="text-3xl font-bold mb-6 ml-2 mt-2 text-center"> Daftar Batch Produksi</div>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Kode Produksi</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Nama Barang</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Tanggal Produksi</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Jumlah</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Status</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBatch.map((produksi, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{produksi.kode_produksi}</td>
                                    <td className="border px-4 py-2">{produksi.barang.nama}</td>
                                    <td className="border px-4 py-2">{produksi.tanggal_produksi}</td>
                                    <td className="border px-4 py-2">{produksi.jumlah}</td>
                                    <td className="border px-4 py-2">{getStatusString(produksi.status)}</td>
                                    <td className="border px-4 py-2">
                                    <Button
                                    size="sm"
                                    onClick={() => navigate(`/staf-pabrik/pabrik/detail/${nama_pabrik}/${produksi.kode_produksi}`)}
                                    style={{
                                        borderRadius: '10px',
                                        backgroundColor: '#2C358C',
                                        borderColor: '#2C358C',
                                        color: 'white',
                                        padding: '5px 15px',
                                        fontSize: '0.9rem',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.2s ease-in-out',
                                    }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                    Detail
                                    </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ModalLoading title="Loading Barang..." subtitle="Please wait a moment" isOpen={isModalOpenLoading} /> {/* Menampilkan modal loading */}
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DaftarBatch);
