import React, {useState, useEffect} from 'react';
<<<<<<< HEAD
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
>>>>>>> 6a45e82d93aa1fafb8c4a155c37d363f117dfe02
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import FloatingMenu from '../../../components/floatingmenu';
<<<<<<< HEAD
import { GetPabrik, PostAddBarangPabrik } from '../../../service/pabrik/endpoint';
=======
import { GetBarangPabrik, GetPabrik, PostAddBarangPabrik } from '../../../service/pabrik/endpoint';
>>>>>>> 6a45e82d93aa1fafb8c4a155c37d363f117dfe02
import { GetAllBarang } from '../../../service/barang/endpoint';

const DetailPabrik = (props) => {
    const { nama_pabrik } = useParams();
<<<<<<< HEAD
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
    }, [nama_pabrik]);
=======
    const [daftarBarangPabrik, setBarangPabrik] = useState([]);
    const [daftarBarang, setBarang] = useState([]);
    const [pabrik, setPabrik] = useState([]);
    const [warningMessage, setWarningMessage] = useState('');
    const navigateTo = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [showFloatingMenu, setShowFloatingMenu] = useState(false);
    const [choosenBarang, setChoosenBarang] = useState('');

    const columns = [
        {
            name: "Merk",
            selector: row => row.barang.merk.nama,
            sortable: true,
            width: '7.5%' // Set a fixed width for the column
        },
        {
            name: "Nama",
            selector: row => row.barang.nama,
            sortable: true,
            width: '20%' // Set a fixed width for the column
        },
        {
            name: "Deskripsi",
            selector: row => row.barang.deskripsi,
            width: '52.5%', // Set a fixed width for the column
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
                    onClick={(e) => addBarangButton(e, row.id)}
                    style={{
                        borderRadius: '5px',
                        marginRight: '5px',
                        border: '2px #266bff', // Adjust border width and color
                        backgroundColor: '#266bff', // Fill the border with blue color
                        color: 'white',
                        padding: '7px 8px' // Text color
                    }}
                > Detail </Button>
            ),
            width: '10%' // Set a fixed width for the column
        },
    ]

    useEffect(() => {
        getDetailPabrik()
        getBarang()
        getAllBarang()
    }, []);

    async function getBarang() {
        try {
            const barangData = await GetBarangPabrik(nama_pabrik); 
            setBarangPabrik(barangData)
        } catch (error) {
            console.error('Error fetching pabrik data:', error);
        }
    }
>>>>>>> 6a45e82d93aa1fafb8c4a155c37d363f117dfe02

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

<<<<<<< HEAD
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const handleDetailBarang = (barangId) => {
        navigateTo(`/manager-operasional/daftar-barang/${barangId}`);
    };

=======
>>>>>>> 6a45e82d93aa1fafb8c4a155c37d363f117dfe02
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
<<<<<<< HEAD
                getDetailPabrik()
=======
                getBarang()
>>>>>>> 6a45e82d93aa1fafb8c4a155c37d363f117dfe02

            } catch (error) {
                if (error.request && error.request.status === 404) {
                    setWarningMessage('ID Barang tidak ditemukan')
<<<<<<< HEAD
                } else {
                    setWarningMessage(error.response.data.message)
=======
                    console.log(error)
                } else {
                    setWarningMessage(error.response.data.message)
                    console.log(error)
>>>>>>> 6a45e82d93aa1fafb8c4a155c37d363f117dfe02
                }
            }
        } else {
        }
    }

<<<<<<< HEAD
    const filteredData = pabrik.listBarang ? 
        pabrik.listBarang.filter((item) =>
            item.barang.nama.toLowerCase().includes(searchText.toLowerCase())
    ) : [];

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={3.2} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus} />
=======
    const filteredData = daftarBarangPabrik.filter((item) =>
        item.barang.nama.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus} />
>>>>>>> 6a45e82d93aa1fafb8c4a155c37d363f117dfe02
            <div className="w-full h-screen flex flex-col">
                <Header title={pabrik.nama} />
                <div className="flex-1 bg-neutral20">
                    <div className={`flex-1 ${showFloatingMenu ? 'blur' : ''}`}>
                        <div className='no-scrollbar overflow-y-auto py-3 px-8'>
<<<<<<< HEAD
                            {pabrik && (
                                <>
                                    <div className="pabrik-deskripsi">
                                        {pabrik.alamat}
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
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <span style={{ marginRight: '1075px' }}>Daftar Barang</span>
                                                    <button onClick={addBarangButton} style={{ marginLeft: '1px', background: 'none', border: 'none', cursor: 'pointer' }}>
                                                        <FaPlus />
                                                    </button>
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
=======
                            <div className="pabrik-deskripsi">
                                {pabrik.alamat}
                            </div>
                            <br></br>
                            <DataTable
                                title={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ marginRight: '1075px' }}>Daftar Barang</span>
                                        <button onClick={addBarangButton} style={{ marginLeft: '1px', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <FaPlus />
                                        </button>
                                    </div>
                                }
                                columns={columns}
                                data={filteredData}
                                pagination
                                fixedHeader
                                subHeader
                                subHeaderComponent={[
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchText}
                                        onChange={handleSearch}
                                        style={{ marginRight: '10px', padding: '5px', border: '1px solid #ced4da', borderRadius: '5px' }}
                                    />,
                                ]}
                            />
                        </div>
                    </div>
                </div>

>>>>>>> 6a45e82d93aa1fafb8c4a155c37d363f117dfe02
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
