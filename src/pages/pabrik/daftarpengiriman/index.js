import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/manajer';
import { getDaftarPengiriman, updateStatusPengiriman } from '../../../service/pabrik/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabPabrik from '../../../components/tabPabrik';
import ModalLoading from '../../../components/modal/modalLoading';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const getStatusString = (status) => {
    switch (status) {
        case 1:
            return { text: 'Menunggu Konfirmasi', color: '#E69B00' };
        case 2:
            return { text: 'Sedang Diproses', color: '#B2B2B2' };
        case 3:
            return { text: 'Telah Dikirim', color: '#00DC00' };
        case 4:
            return { text: 'Telah Diterima', color: '#2C358C' };
        default:
            return { text: 'Status Tidak Dikenal', color: '#000000' };
    }
};

const truncateDateString = (dateString) => {
    return dateString.slice(0, 10);
};

const DaftarPengiriman = (props) => {
    const { nama_pabrik } = useParams();
    const navigate = useNavigate();
    const [daftarPengiriman, setDaftarPengiriman] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);

    useEffect(() => {
        fetchDaftarPengiriman();
    }, [nama_pabrik]);

    const fetchDaftarPengiriman = async () => {
        try {
            setIsModalOpenLoading(true);
            const data = await getDaftarPengiriman(nama_pabrik);
            setDaftarPengiriman(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsModalOpenLoading(false);
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

    const filteredPengiriman = daftarPengiriman
        ? daftarPengiriman.filter(pengiriman =>
            pengiriman.kode_permintaan.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.2} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title='' style={{color: 'black'}}/>
                <div className="flex items-center text-3xl font-bold mb-10 ml-10 mt-8" style={{ color: '#000000' }}>
                    <span style={{ marginRight: '20px' }}>{nama_pabrik}</span>
                </div>
                <div className="ml-10 mb-4">
                    <div style={{ position: 'relative' }}>
                        <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#A0AEC0', fontSize: '18px' }} />
                        <input
                            type="text"
                            placeholder="Cari kode permintaan..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{ paddingLeft: '40px' }}
                        />
                    </div>
                </div>
                <TabPabrik
                    tabAktif={"Pengiriman Barang"}
                />
                <div className='no-scrollbar flex-1 overflow-y-auto py-6 px-8' style={{ backgroundColor: '#F9FAFB' }}>
                    <div className="text-3xl font-bold mb-6 ml-2 mt-2 text-center"> Daftar Permintaan Pengiriman </div>
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
                                <td className="border px-4 py-2" style={{ color: getStatusString(pengiriman.status).color }}>
                                    {getStatusString(pengiriman.status).text}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <ModalLoading title="Loading..." subtitle="Please wait a moment"
                              isOpen={isModalOpenLoading}/> {/* Menampilkan modal loading */}
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DaftarPengiriman);
