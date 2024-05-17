import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button, Form } from 'react-bootstrap';
import FloatingMenu from '../../../components/floatingmenu';
import { GetPabrik, PostAddBarangPabrik } from '../../../service/pabrik/endpoint';
import { GetAllBarang } from '../../../service/barang/endpoint';
import ModalLoading from '../../../components/modal/modalLoading';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabPabrik from '../../../components/tabPabrik';

const DetailPabrik = (props) => {
    const { nama_pabrik } = useParams();
    const [daftarBarang, setBarang] = useState([]);
    const [pabrik, setPabrik] = useState([]);
    const [warningMessage, setWarningMessage] = useState('');
    const [searchText, setSearchText] = useState('');
    const [showFloatingMenu, setShowFloatingMenu] = useState(false);
    const [choosenBarang, setChoosenBarang] = useState('');
    const [activeTab, setActiveTab] = useState('listBarang');
    const [searchQuery, setSearchQuery] = useState('');
    const navigateTo = useNavigate();
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);
    let columns = [];

    if (pabrik.listBarang) {
        columns = [
            {
                name: "Merk",
                selector: row => row.barang.merk.nama,
                sortable: true,
                width: '7.5%',
            },
            {
                name: "Nama",
                selector: row => row.barang.nama,
                sortable: true,
                width: '20%',
            },
            {
                name: "Deskripsi",
                selector: row => row.barang.deskripsi,
                width: '52.5%',
                cell: row => (
                    <div style={{ width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.barang.deskripsi}
                    </div>
                )
            },
            {
                name: "Stok",
                selector: row => row.stok,
                sortable: true,
                width: '10%' // Set a fixed width for the column
            },
            {
                name: "Detail",
                cell: (row) => (
                    <Button
                        variant="primary"
                        onClick={(e) => handleDetailBarang(row.barang.id)}
                        style={{
                            borderRadius: '5px',
                            marginRight: '5px',
                            border: '2px #266bff',
                            backgroundColor: '#2C358C',
                            color: 'white',
                            padding: '7px 8px'
                        }}
                    > Detail </Button>
                ),
                width: '10%' // Set a fixed width for the column
            },
        ];
    }

    useEffect(() => {
        getDetailPabrik();
        getAllBarang();
    }, [nama_pabrik]);

    async function getDetailPabrik() {
        try {
            setIsModalOpenLoading(true);
            const pabrikData = await GetPabrik(nama_pabrik);
            setPabrik(pabrikData);
        } catch (error) {
            console.error('Error fetching pabrik data:', error);
        } finally {
            setIsModalOpenLoading(false);
        }
    }

    async function getAllBarang() {
        try {
            const barangData = await GetAllBarang();
            setBarang(barangData);
        } catch (error) {
            console.error('Error fetching perusahaan data:', error);
        }
    }

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const handleDetailBarang = (barangId) => {
        navigateTo(`/manager-operasional/pabrik/barang/${barangId}`);
    };

    const addBarangButton = () => {
        setShowFloatingMenu(true);
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    async function handlePostBarang() {
        if (choosenBarang) {
            try {
                console.log(choosenBarang);
                var response = await PostAddBarangPabrik(choosenBarang, nama_pabrik);
                setShowFloatingMenu(false);
                setWarningMessage('');
                getDetailPabrik();
            } catch (error) {
                if (error.request && error.request.status === 404) {
                    setWarningMessage('ID Barang tidak ditemukan');
                } else {
                    setWarningMessage(error.response.data.message);
                }
            }
        } else {
        }
    }

    const filteredData = pabrik.listBarang ? pabrik.listBarang.filter((item) =>
        item.barang.nama.toLowerCase().includes(searchText.toLowerCase()) ||
        item.barang.merk.nama.toLowerCase().includes(searchText.toLowerCase())
    ) : [];

    // Custom styles untuk DataTable
    const customStyles = {
        headCells: {
            style: {
                color: '#FFFFFF',
                backgroundColor: '#DA3732',
            },
        },
        cells: {
            style: {
                color: '#000000',
            },
        },
        pagination: {
            style: {
                color: '#000000',
            },
        },
    };

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.2} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title='' style={{color: 'black'}}/>

                <div className="flex items-center text-3xl font-bold mb-10 ml-10 mt-8" style={{color: '#000000'}}>
                    <span style={{marginRight: '20px'}}>{nama_pabrik}</span>
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
                </div>
                <div className="ml-10">
                    <div className="pabrik-deskripsi">
                        <b>Alamat:</b> {pabrik.alamat}
                    </div>
                    <div className="mb-4" style={{ position: 'relative', marginTop: '15px' }}>
                        <Form.Control
                            type="text"
                            placeholder="Cari barang..."
                            value={searchText}
                            onChange={handleSearch}
                            style={{ paddingLeft: '40px' }}
                        />
                        <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#A0AEC0', fontSize: '18px' }} />
                    </div>
                </div>
                <TabPabrik
                    tabAktif={"Daftar Barang"}
                />
                <div className={`flex-1 ${showFloatingMenu ? 'blur' : ''}`}>
                    <div className='no-scrollbar overflow-y-auto py-3 px-8'>
                        <>
                            <br/>
                            <div className="text-3xl font-bold text-center"> Daftar Barang </div>
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                pagination
                                fixedHeader
                                subHeader
                                customStyles={customStyles}
                            />
                        </>
                    </div>
                </div>
                {showFloatingMenu && (<FloatingMenu
                    daftarBarang={daftarBarang}
                    setChoosenBarang={setChoosenBarang}
                    handlePostBarang={handlePostBarang}
                    setShowFloatingMenu={setShowFloatingMenu}
                    warningMessage={warningMessage}
                />)}
                <ModalLoading title="Loading..." subtitle="Please wait a moment"
                              isOpen={isModalOpenLoading}/>

            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPabrik);
