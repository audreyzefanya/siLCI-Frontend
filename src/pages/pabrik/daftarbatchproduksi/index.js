import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/manajer';
import { getAllBatchProduksi } from '../../../service/pabrik/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabPabrik from '../../../components/tabPabrik';

const getStatusString = (status) => {
    switch (status) {
        case 2:
            return 'Sedang Diproses';
        case 3:
            return 'Telah Dikirim';
        default:
            return 'Status Tidak Dikenal';
    }
};

//const truncateDateString = (dateString) => {
//    return dateString.slice(0, 10);
//};

const DaftarBatch = (props) => {
    const { nama_pabrik } = useParams();
    const navigate = useNavigate();
    const [daftarBatch, setDaftarBatch] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchDaftarBatch();
    }, [nama_pabrik]);

    const fetchDaftarBatch = async () => {
        try {
            const data = await getAllBatchProduksi(nama_pabrik);
            setDaftarBatch(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

//    const handleStatusChange = async (kode_batch, newStatus) => {
//        try {
//            await updateStatusBatch(kode_batch, { status: newStatus });
//            fetchDaftarBatch();
//        } catch (error) {
//            console.error('Error updating status:', error);
//        }
//    };

    const filteredBatch = daftarBatch
        ? daftarBatch.filter(produksi =>
            produksi.kode_produksi.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title=''/>
                <div className="flex items-center text-3xl font-bold mb-10 ml-10 mt-8" style={{ color: '#000000' }}>
                    <span style={{ marginRight: '20px' }}>Daftar Batch Produksi</span>
                </div>
                <div className="ml-10 mb-4">
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Cari kode batch..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{ paddingLeft: '40px', border: '2px solid #2C358C', borderRadius: '5px', padding: '5px', outline: 'none' }}
                        />
                    </div>
                </div>
                <TabPabrik
                    tabAktif={"Batch Produksi"}
                />
                <div className='no-scrollbar flex-1 overflow-y-auto py-6 px-8' style={{ backgroundColor: '#F9FAFB' }}>
                    <div className="text-3xl font-bold mb-6 ml-2 mt-2 text-center"> {nama_pabrik} </div>
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
                                    <td className="border px-4 py-2">{produksi.status}</td>
                                    <td className="border px-4 py-2">
                                    <Button
                                    size="sm"
                                    onClick={() => navigate(`/manager-operasional/pabrik/detail/${nama_pabrik}/batch/${produksi.kode_produksi}`)}
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
            </div>
        </div>
    );
};

//                                    <td className="border px-4 py-2">
//                                        <select value={produksi.status} onChange={(e) => handleStatusChange(produksi.kode_batch, parseInt(e.target.value))}>
//                                            <option value={2}>Sedang Diproses</option>
//                                            <option value={3}>Telah Dikirim</option>
//                                        </select>
//                                    </td>
//<td className="border px-4 py-2">{truncateDateString(produksi.tanggal_produksi)}</td>

export default connect(mapStateToProps, mapDispatchToProps)(DaftarBatch);
