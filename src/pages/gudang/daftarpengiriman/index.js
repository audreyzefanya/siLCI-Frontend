import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/manajer';
import TabPabrik from '../../../components/tabGudang';
import { getDaftarPengiriman, updateStatusPengiriman } from '../../../service/gudangmanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';

const getStatusString = (status) => {
    switch (status) {
        case 1:
            return 'Menunggu Konfirmasi';
        case 4:
            return 'Telah Diterima';
        default:
            return 'Status Tidak Dikenal';
    }
};

const truncateDateString = (dateString) => {
    return dateString.slice(0, 10);
};

const DaftarPengiriman = (props) => {
    const { id_gudang } = useParams();
    const navigate = useNavigate();
    const [daftarPengiriman, setDaftarPengiriman] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchDaftarPengiriman();
    }, [id_gudang]);

    const fetchDaftarPengiriman = async () => {
        try {
            const data = await getDaftarPengiriman(id_gudang);
            setDaftarPengiriman(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleStatusChange = async (kode_permintaan, newStatus) => {
        try {
            await updateStatusPengiriman(kode_permintaan, { status: newStatus });
            fetchDaftarPengiriman();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleAddPermintaanPengiriman = () => {
        navigate(`/manager-operasional/permintaanpengiriman/${id_gudang}/add`);
    };

    const filteredPengiriman = daftarPengiriman
        ? daftarPengiriman.filter(pengiriman =>
            pengiriman.kode_permintaan.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title=''/>
                <div className="flex items-center text-3xl font-bold mb-10 ml-10 mt-8" style={{ color: '#000000' }}>
                    <span style={{ marginRight: '20px' }}>Daftar Permintaan Pengiriman</span>
                    <Button
                        size="sm"
                        onClick={handleAddPermintaanPengiriman}
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
                        + Tambah Permintaan Pengiriman
                    </Button>
                </div>
                <div className="ml-10 mb-4">
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Cari kode permintaan..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{ paddingLeft: '40px', border: '2px solid #2C358C', borderRadius: '5px', padding: '5px', outline: 'none' }}
                        />
                    </div>
                </div>
                <TabPabrik 
                    tabAktif={"Pengiriman Barang"}
                />
                <div className='no-scrollbar flex-1 overflow-y-auto py-6 px-8' style={{ backgroundColor: '#F9FAFB' }}>
                    <div className="text-3xl font-bold mb-6 ml-2 mt-2 text-center"> {id_gudang} </div>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Kode Permintaan</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Nama Gudang</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Nama Barang</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Jumlah</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Waktu Permintaan</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Tanggal Pengiriman</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPengiriman.map((pengiriman, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{pengiriman.kode_permintaan}</td>
                                    <td className="border px-4 py-2">{pengiriman.gudang}</td>
                                    <td className="border px-4 py-2">{pengiriman.barang}</td>
                                    <td className="border px-4 py-2">{pengiriman.jumlah}</td>
                                    <td className="border px-4 py-2">{truncateDateString(pengiriman.waktu_permintaan)}</td>
                                    <td className="border px-4 py-2">{truncateDateString(pengiriman.tanggal_pengiriman)}</td>
                                    <td className="border px-4 py-2">
                                        <select value={pengiriman.status} onChange={(e) => handleStatusChange(pengiriman.kode_permintaan, parseInt(e.target.value))}>
                                            <option value={2}>Sedang Diproses</option>
                                            <option value={3}>Telah Dikirim</option>
                                        </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DaftarPengiriman);
