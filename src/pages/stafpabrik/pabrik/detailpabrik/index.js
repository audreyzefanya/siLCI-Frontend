import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';
import Sidebar from '../../../../components/sidebar/stafpabrik';
import Header from '../../../../components/header';
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import FloatingMenu from '../../../../components/floatingmenu';
import { GetPabrik, PostAddBarangPabrik } from '../../../../service/pabrik/endpoint';
import { GetAllBarang } from '../../../../service/barang/endpoint';

const DetailPabrik = (props) => {
    const { nama_pabrik } = useParams();
    const [daftarBarang, setBarang] = useState([]);
    const [pabrik, setPabrik] = useState([]);
    const [warningMessage, setWarningMessage] = useState('');
    const [searchText, setSearchText] = useState('');
    const [showFloatingMenu, setShowFloatingMenu] = useState(false);
    const [choosenBarang, setChoosenBarang] = useState('');
    const [activeTab, setActiveTab] = useState('listBarang');
    const navigateTo = useNavigate()
    let columns = []

    if (pabrik.listBarang) {
        columns = [
            {
                name: "Merk",
                selector: row => row.barang.merk.nama,
                sortable: true,
                width: '7.5%'
            },
            {
                name: "Nama",
                selector: row => row.barang.nama,
                sortable: true,
                width: '20%'
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
                            backgroundColor: '#266bff',
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
        getDetailPabrik()
        getAllBarang()
    }, []);

    async function getDetailPabrik() {
        try {
            const pabrikData = await GetPabrik(nama_pabrik);
            setPabrik(pabrikData)
        } catch (error) {
            console.error('Error fetching pabrik data:', error);
        }
    }

    async function getAllBarang() {
        try {
            const barangData = await GetAllBarang();
            setBarang(barangData)
        } catch (error) {
            console.error('Error fetching perusahaan data:', error);
        }
    }

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const handleDetailBarang = (barangId) => {
        navigateTo(`/staf-pabrik/barang/${barangId}`);
    };

    const addBarangButton = () => {
        setShowFloatingMenu(true);
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    async function handlePostBarang() {
        if (choosenBarang) {
            try {
                console.log(choosenBarang)
                var response = await PostAddBarangPabrik(choosenBarang, nama_pabrik);
                setShowFloatingMenu(false)
                setWarningMessage('')
                getDetailPabrik()

            } catch (error) {
                if (error.request && error.request.status === 404) {
                    setWarningMessage('ID Barang tidak ditemukan')
                } else {
                    setWarningMessage(error.response.data.message)
                }
            }
        } else {
        }
    }

    const filteredData = pabrik.listBarang ? pabrik.listBarang.filter((item) =>
        item.barang.nama.toLowerCase().includes(searchText.toLowerCase()) ||
        item.barang.merk.nama.toLowerCase().includes(searchText.toLowerCase())
    ) : [];

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.2} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus} />
            <div className="w-full h-screen flex flex-col">
                <Header title={pabrik.nama} style={{ color: 'white' }} />
                <div className="flex-1 bg-neutral20">
                    <div className={`flex-1 ${showFloatingMenu ? 'blur' : ''}`}>
                        <div className='no-scrollbar overflow-y-auto py-3 px-8'>
                            {pabrik && (
                                <>
                                    <div className="pabrik-deskripsi">
                                        <b>Alamat:</b> {pabrik.alamat}
                                    </div>
                                    <br />
                                    <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'row' }}>
                                        <button
                                            className={`tab-button ${activeTab === 'listBarang' ? 'active-tab' : ''}`}
                                            onClick={() => handleTabChange('listBarang')}
                                        >
                                            Daftar Barang
                                        </button>
                                        <button
                                            className={`tab-button ${activeTab === 'batchProduksi' ? 'active-tab' : ''}`}
                                            onClick={() => handleTabChange('batchProduksi')}
                                        >
                                            Batch Produksi
                                        </button>
                                        <button
                                            className={`tab-button ${activeTab === 'permintaanPengiriman' ? 'active-tab' : ''}`}
                                            onClick={() => handleTabChange('permintaanPengiriman')}
                                        >
                                            Permintaan Pengiriman
                                        </button>
                                    </div>
                                    {activeTab === 'listBarang' && (
                                        <DataTable
                                            title={
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div className="daftar-barang">
                                                        Daftar Barang
                                                    </div>
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
                                            }
                                            columns={columns}
                                            data={filteredData}
                                            pagination
                                            fixedHeader
                                            subHeader
                                            subHeaderComponent={[
                                                <input
                                                    key="searchInput"
                                                    type="text"
                                                    placeholder="Search..."
                                                    value={searchText}
                                                    onChange={handleSearch}
                                                    style={{ marginRight: '10px', padding: '5px', border: '1px solid #ced4da', borderRadius: '5px' }}
                                                />,
                                            ]}
                                        />
                                    )}
                                    {activeTab === 'batchProduksi' && (
                                        <div>
                                            {/* Render another DataTable or content for the other tab */}
                                        </div>
                                    )}
                                    {activeTab === 'permintaanPengiriman' && (
                                        <div>
                                            {/* Render another DataTable or content for the other tab */}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {showFloatingMenu && (
                    <FloatingMenu
                        daftarBarang={daftarBarang}
                        setChoosenBarang={setChoosenBarang}
                        handlePostBarang={handlePostBarang}
                        setShowFloatingMenu={setShowFloatingMenu}
                        warningMessage={warningMessage}
                    />
                )}
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPabrik);
