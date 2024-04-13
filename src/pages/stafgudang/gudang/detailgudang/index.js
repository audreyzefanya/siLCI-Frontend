import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/header';
import Sidebar from '../../../../components/sidebar/stafgudang';
import { fetchDetailGudang } from '../../../../service/gudangmanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';
import { Button } from 'react-bootstrap';
import TabGudang from '../../../../components/tabGudang';

const DetailGudang = (props) => {
    const { id_gudang } = useParams();
    const navigate = useNavigate();
    const [detailGudang, setDetailGudang] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchDetail();
    }, [id_gudang]);

    const fetchDetail = async () => {
        try {
            const data = await fetchDetailGudang(id_gudang);
            setDetailGudang(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addBarangButton = () => {
        navigate(`/staf-gudang/daftar-gudang/${id_gudang}/add`);
    };

    const handleDetail = (id_gudang) => {
        navigate(`/staf-gudang/daftar-gudang/${id_gudang}`);
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handleEdit = () => {
        navigate(`/staf-gudang/daftar-gudang/ubah/${id_gudang}`);
    };

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title=''/>
                <div className="text-3xl font-bold ml-10 mt-8" style={{ color: '#000000' }}>
                    <span style={{ marginRight: '20px' }}>{detailGudang ? detailGudang.nama_gudang : ''}</span>
                    <Button
                        size="sm"
                        onClick={addBarangButton}
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
                        + Tambah Barang
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleEdit}
                        style={{
                            borderRadius: '20px',
                            backgroundColor: '#2C358C',
                            borderColor: '#2C358C',
                            color: 'white',
                            padding: '5px 15px',
                            fontSize: '1rem',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s ease-in-out',
                            marginLeft: '10px',
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Ubah Detail
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
                <TabGudang />
                <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
                    <div className="text-3xl font-bold mt-2 text-center"> Daftar Barang </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchText}
                            onChange={handleSearch}
                            style={{ padding: '5px', border: '2px solid #2C358C', borderRadius: '5px', marginRight: '10px' }}
                        />
                    </div>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Nama Barang</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Stok</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailGudang && detailGudang.barang.filter((barang) =>
                                barang.nama_barang.toLowerCase().includes(searchText.toLowerCase())
                            ).map((barang, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{barang.nama_barang}</td>
                                    <td className="border px-4 py-2">{barang.stok}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailGudang);
