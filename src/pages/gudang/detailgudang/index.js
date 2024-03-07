import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/manajer';
import { fetchDetailGudang } from '../../../service/gudangmanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import TabGudang from '../../../components/tabGudang';

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

    const handleDetail = (id_gudang) => {
        navigate(`/daftar-gudang/${id_gudang}`);
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title=''/>
                <div className="text-3xl font-bold ml-10 mt-8">{detailGudang ? detailGudang.nama_gudang : ''}</div>
                <div className="alamat-gudang mb-4 ml-10">{detailGudang ? detailGudang.alamat_gudang : ''}</div>
                <div className="id-gudang ml-10">{detailGudang ? detailGudang.id_gudang : ''}</div>
                <div className="kapasitas-gudang mb-8 ml-10">Kapasitas: {detailGudang ? detailGudang.kapasitas_gudang : ''}</div>
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
