import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import emptyImage from '../../../assets/images/empty.png';
import Header from '../../../components/header';
import ModalLoading from '../../../components/modal/modalLoading';
import Sidebar from '../../../components/sidebar/manajer';
import TabGudangManajer from '../../../components/tabGudangManajer';
import { fetchDetailGudang } from '../../../service/gudangmanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DetailGudang = (props) => {
    const { id_gudang } = useParams();
    const navigate = useNavigate();
    const [detailGudang, setDetailGudang] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);

    useEffect(() => {
        fetchDetail();
    }, [id_gudang]);

    const fetchDetail = async () => {
        try {
            setIsModalOpenLoading(true);
            const data = await fetchDetailGudang(id_gudang);
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

    const filteredBarangData = detailGudang ? detailGudang.barang.filter((barang) =>
        barang.nama_barang.toLowerCase().includes(searchText.toLowerCase())
    ) : [];

    const columns = [
            {
                name: 'Nama Barang',
                selector: row => row.nama_barang,
                sortable: true,
                compact: true,
            },
            {
                name: 'Stok',
                selector: row => row.stok,
                sortable: true,
                compact: true,
                conditionalCellStyles: [
                    {
                        when: row => row.stok < 20,
                        style: {
                            color: 'red',
                        },
                    },
                ],
            }
        ];

return (
        <div className='flex w-screen h-screen' style={{ backgroundColor: 'white' }}>
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title=''/>
                <div className="text-3xl font-bold ml-10 mt-8" style={{ color: '#000000' }}>
                    <span style={{ marginRight: '20px' }}>{detailGudang ? detailGudang.nama_gudang : ''}</span>
                </div>
                <div className="alamat-gudang mb-4 ml-10">
                    <input
                        type="text"
                        value={detailGudang ? detailGudang.alamat_gudang : ''}
                        readOnly
                    />
                </div>
                <div className="jenis-gudang mb-8 ml-10">Jenis Gudang: {detailGudang && detailGudang.jenis_gudang ? detailGudang.jenis_gudang : ''}</div>
                <div className="ml-10 mb-4">
                    <Form.Group style={{ position: 'relative' }}>
                        <Form.Control
                            type="text"
                            placeholder="Cari barang..."
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
                <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8' style={{ backgroundColor: 'white' }}>
                    {detailGudang && detailGudang.barang.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <img src={emptyImage} alt="Empty" style={{ width: '250px', height: '200px' }} />
                            <p className="text-xl font-bold mt-4">Belum ada barang.</p>
                        </div>
                    ) : (
                        <div>
                            <div className="text-3xl font-bold mt-2 mb-5 text-center"> Daftar Barang </div>
                            <DataTable
                                columns={columns}
                                data={filteredBarangData}
                                noHeader={true}
                                pagination={true}
                            />
                        </div>
                    )}
                </div>
            </div>
            <ModalLoading title="Loading..." subtitle="Please wait a moment" isOpen={isModalOpenLoading} />
        </div>
    );

};

export default connect(mapStateToProps, mapDispatchToProps)(DetailGudang);
