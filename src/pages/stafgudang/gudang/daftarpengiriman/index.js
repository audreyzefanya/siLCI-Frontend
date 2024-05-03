import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Header from '../../../../components/header';
import Sidebar from '../../../../components/sidebar/stafgudang';
import TabGudang from '../../../../components/tabGudang';
import { fetchDetailGudang, getDaftarPengiriman, updateStatusPengiriman } from '../../../../service/gudangmanagement/endpoint';
import { GetAllPabrik } from '../../../../service/pabrik/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';
import noDeliveryImage from '../../../../assets/images/nodelivery.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ModalLoading from '../../../../components/modal/modalLoading';

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
    const { id_gudang } = useParams();
    const navigate = useNavigate();
    const [detailGudang, setDetailGudang] = useState(null);
    const [daftarPengiriman, setDaftarPengiriman] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false); // State untuk modal loading

    useEffect(() => {
        fetchDaftarPengiriman();
    }, [id_gudang]);

    const fetchDaftarPengiriman = async () => {
        try {
            setIsModalOpenLoading(true); // Set modal loading menjadi terbuka saat memulai fetch data
            // Ambil detail gudang
            const gudang = await fetchDetailGudang(id_gudang);
            setDetailGudang(gudang);

            // Ambil daftar pengiriman
            const data = await getDaftarPengiriman(id_gudang);
            setDaftarPengiriman(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsModalOpenLoading(false); // Set modal loading menjadi tertutup setelah selesai fetch data
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
        navigate(`/staf-gudang/daftar-gudang/permintaanpengiriman/${id_gudang}/add`);
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
                <div className="flex items-center text-3xl font-bold ml-10 mt-8" style={{ color: '#000000' }}>
                    <span style={{ marginRight: '20px' }}>{detailGudang ? detailGudang.nama_gudang : ''}</span>
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
                <div className="alamat-gudang mb-4 ml-10">
                    <input
                        type="text"
                        value={detailGudang ? detailGudang.alamat_gudang : ''}
                        readOnly
                    />
                </div>
                <div className="id-gudang ml-10">{detailGudang ? detailGudang.id_gudang : ''}</div>
                <div className="kapasitas-gudang mb-8 ml-10">
                    <input
                        type="text"
                        value={detailGudang ? detailGudang.kapasitas_gudang : ''}
                        readOnly
                    />
                </div>
                <div className="ml-10 mb-4">
                    <Form.Group style={{ position: 'relative' }}>
                        <Form.Control
                            type="text"
                            placeholder="Cari pengiriman..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{ paddingLeft: '40px' }}
                        />
                        <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#A0AEC0', fontSize: '18px' }} />
                    </Form.Group>
                </div>
                <TabGudang
                    tabAktif={"Pengiriman Barang"}
                />
                <div className='no-scrollbar flex-1 overflow-y-auto py-6 px-8' style={{ backgroundColor: '#F9FAFB' }}>
                    {filteredPengiriman.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <img src={noDeliveryImage} alt="No Delivery" style={{ width: '400px', height: '350px' }} />
                            <p className="text-xl font-bold mt-4">Belum ada pengiriman.</p>
                        </div>
                    ) : (
                        <div>
                            <div className="text-3xl font-bold mb-6 ml-2 mt-2 text-center"> Daftar Permintaan Pengiriman </div>
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Kode Permintaan</th>
                                        <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}> Pabrik</th>
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
                                            <td className="border px-4 py-2">{pengiriman.pabrik}</td>
                                            <td className="border px-4 py-2">{pengiriman.barang}</td>
                                            <td className="border px-4 py-2">{pengiriman.jumlah}</td>
                                            <td className="border px-4 py-2">{truncateDateString(pengiriman.waktu_permintaan)}</td>
                                            <td className="border px-4 py-2">{truncateDateString(pengiriman.tanggal_pengiriman)}</td>
                                            <td className="border px-4 py-2">
                                                <select
                                                    value={pengiriman.status}
                                                    onChange={(e) => handleStatusChange(pengiriman.kode_permintaan, parseInt(e.target.value))}
                                                    style={{ color: getStatusString(pengiriman.status).color }}
                                                    disabled={pengiriman.status === 4}
                                                >
                                                    <option value={1} style={{ backgroundColor: getStatusString(1).color }}>{getStatusString(1).text}</option>
                                                    <option value={2} style={{ backgroundColor: getStatusString(2).color }} disabled>{getStatusString(2).text}</option>
                                                    <option value={3} style={{ backgroundColor: getStatusString(3).color }} disabled>{getStatusString(3).text}</option>
                                                    <option value={4} style={{ backgroundColor: getStatusString(4).color }}>{getStatusString(4).text}</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <ModalLoading title="Loading..." subtitle="Please wait a moment" isOpen={isModalOpenLoading} />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DaftarPengiriman);
