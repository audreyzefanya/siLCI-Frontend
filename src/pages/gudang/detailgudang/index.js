import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/manajer';
import { fetchDetailGudang } from '../../../service/gudangmanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import TabGudangManajer from '../../../components/tabGudangManajer';
import ModalLoading from '../../../components/modal/modalLoading';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import emptyImage from '../../../assets/images/empty.png';

const DetailGudang = (props) => {
    const { id_gudang } = useParams();
    const navigate = useNavigate();
    const [detailGudang, setDetailGudang] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false); // State untuk modal loading

    useEffect(() => {
        fetchDetail();
    }, [id_gudang]);

    const fetchDetail = async () => {
        try {
            setIsModalOpenLoading(true);
            const data = await fetchDetailGudang(id_gudang);
            console.log("Detail Gudang:", data);
            setDetailGudang(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsModalOpenLoading(false);
        }
    };

    const handleDetail = (id_gudang) => {
        navigate(`/manager-operasional/daftar-gudang/${id_gudang}`);
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title=''/>
                <div className="text-3xl font-bold ml-10 mt-8">{detailGudang ? detailGudang.nama_gudang : ''}</div>
                <div className="alamat-gudang mb-3 ml-10">{detailGudang ? detailGudang.alamat_gudang : ''}</div>
                <div className="jenis-gudang mb-8 ml-10">Jenis Gudang: {detailGudang && detailGudang.jenis_gudang ? detailGudang.jenis_gudang : ''}</div>
                <div className="ml-10 mb-4">
                    <Form.Group style={{ position: 'relative' }}>
                        <Form.Control
                            type="text"
                            placeholder="Cari gudang..."
                            value={searchText}
                            onChange={handleSearch}
                            style={{ paddingLeft: '40px' }}
                        />
                        <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#A0AEC0', fontSize: '18px' }} />
                    </Form.Group>
                </div>
                <TabGudangManajer
                    tabAktif={"Daftar Barang"}
                />
                <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
                    {detailGudang && detailGudang.barang.length > 0 ? (
                        <div>
                            <div className="text-3xl font-bold mt-2 mb-8 text-center"> Daftar Barang </div>
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Nama Barang</th>
                                        <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Stok</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detailGudang.barang.filter((barang) =>
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
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <img src={emptyImage} alt="Empty" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                            <p className="text-xl font-semibold mt-4">Belum ada barang.</p>
                        </div>
                    )}
                </div>
                <ModalLoading title="Loading..." subtitle="Please wait a moment" isOpen={isModalOpenLoading} />
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailGudang);
