import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import emptyImage from '../../../../assets/images/empty.png';
import Header from '../../../../components/header';
import ModalLoading from '../../../../components/modal/modalLoading';
import Sidebar from '../../../../components/sidebar/stafgudang';
import TabGudang from '../../../../components/tabGudang';
import { fetchDetailGudang, reduceStokBarang } from '../../../../service/gudangmanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';
import ReduceStockMenu from '../../../../components/reducestockmenu';

const DetailGudang = (props) => {
    const { id_gudang } = useParams();
    const navigate = useNavigate();
    const [detailGudang, setDetailGudang] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);
    const [showReduceMenu, setShowReduceMenu] = useState(false);
    const [selectedBarang, setSelectedBarang] = useState(null);

    useEffect(() => {
        fetchDetail();
    }, [id_gudang]);

    const handleReduceStockClick = (barang) => {
        console.log(barang)
        setSelectedBarang(barang);
        setShowReduceMenu(true);
    };

    const closeReduceMenu = () => {
        setShowReduceMenu(false);
    };

    const submitReduceStock = async (data) => {
        try {
            const dataKurang = {
                barang: selectedBarang.id_barang,
                gudang: id_gudang,
                stok: data.stok
            };
            console.log(dataKurang);
            await reduceStokBarang(dataKurang);
            fetchDetail(); // Refresh data
            closeReduceMenu();
        } catch (error) {
            console.error('Error reducing stock:', error);
        }
    };

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

    const filteredBarangData = detailGudang ? detailGudang.barang.filter((barang) =>
        barang.nama_barang.toLowerCase().includes(searchText.toLowerCase())
    ) : [];

    const columns = [
        {
            name: 'Nama Barang',
            selector: row => row.nama_barang,
            sortable: true,
            compact: true,
            center: true, // Center align text
        },
        {
            name: 'Stok',
            selector: row => row.stok,
            sortable: true,
            compact: true,
            center: true, // Center align text
            conditionalCellStyles: [
                {
                    when: row => row.stok < 20,
                    style: {
                        color: 'red',
                    },
                },
            ],
        },
        {
                name: '',
                button: true,
                ignoreRowClick: true,
                allowOverflow: true,
                cell: row => row.stok > 0 ? (
                    <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleReduceStockClick(row)}
                        style={{
                            borderRadius: '5px',
                            backgroundColor: '#2C358C',
                            borderColor: '#2C358C',
                            color: 'white',
                            padding: '5px 7px',
                            fontSize: '0.875rem',
                            transition: 'background-color 0.2s',
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#DA3732'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#2C358C'}
                    >
                        Kurangi Stok
                    </Button>
                ) : null
            }
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#DA3732',
                color: 'white',
                textAlign: 'center', // Center align column headers
            },
        },
        cells: {
            style: {
                textAlign: 'center', // Center align cells
            },
        },
    };

    return (
        <div className='flex w-screen h-screen' style={{ backgroundColor: 'white' }}>
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
                <TabGudang
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
                                customStyles={customStyles}
                            />
                        </div>
                    )}
                </div>
            </div>
            <ModalLoading title="Loading..." subtitle="Please wait a moment" isOpen={isModalOpenLoading} />
            {showReduceMenu && selectedBarang && (
                <ReduceStockMenu
                    onClose={closeReduceMenu}
                    onSubmit={submitReduceStock}
                    id_barang={selectedBarang.id_barang}
                    id_gudang={id_gudang}
                />
            )}
        </div>
    );

};

export default connect(mapStateToProps, mapDispatchToProps)(DetailGudang);
