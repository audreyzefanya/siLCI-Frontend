import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { GetDetailPerusahaan, GetBarangPerusahaanImpor } from '../../../../service/perusahaanimpor/endpoint';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';
import Sidebar from '../../../../components/sidebar/adminperusahaan';
import Header from '../../../../components/header';
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';

const DaftarBarangPerusahaan = (props) => {
    const { id_perusahaan } = useParams();
    const [perusahaan, setPerusahaan] = useState([]);
    const [barang, setBarang] = useState([]);
    const navigateTo = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [buttonTambah, setButtonTambah] = useState(false)
    const [userInfo, setUserInfo] = useState(null);
    var columns = [];

    if (barang) {
        columns = [
            {
                name: "Merk",
                selector: row => row.merk.nama,
                sortable: true,
                width: '7.5%' // Set a fixed width for the column
            },
            {
                name: "Nama",
                selector: row => row.nama,
                sortable: true,
                width: '20%' // Set a fixed width for the column
            },
            {
                name: "Deskripsi",
                selector: row => row.deskripsi,
                width: '47.5%', // Set a fixed width for the column
                cell: row => (
                    <div style={{ width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.deskripsi}
                    </div>
                )
            },
            {
                name: "Harga (Rp)",
                selector: row => row.harga.toLocaleString(),
                sortable: true,
                width: '10%' // Set a fixed width for the column
            },
            {
                name: "Detail",
                cell: (row) => (
                    <Button
                        variant="primary"
                        onClick={(e) => handleDetailBarang(row.id)}
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
                width: '15%' // Set a fixed width for the column
            }
        ];
    }

    useEffect(() => {
        getDetailPerusahaan()
        getBarangPerusahaanImpor()
    }, [])

    async function getDetailPerusahaan() {
        try {
            const perusahaanData = await GetDetailPerusahaan(id_perusahaan); 
            setPerusahaan(perusahaanData)
        } catch (error) {
            console.error('Error fetching perusahaan data:', error);
        }
    }

    async function getBarangPerusahaanImpor() {
        try {
            const barangData = await GetBarangPerusahaanImpor(id_perusahaan);
            setBarang(barangData);
        } catch (error) {
            console.error('Error fetching Barang data: ', error);
        }
    }
    
    useEffect(() => {
        // Get user info from localStorage
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        }
      }, []);

    useEffect(() => {
        if(userInfo && perusahaan) {
            if(userInfo.id === perusahaan.admin) {
                setButtonTambah(true);
            } 
        }
    }, [userInfo, perusahaan]);

    const handleDetailBarang = (barangId) => {
        navigateTo(`/admin-perusahaan/barang/${barangId}`);
    };

    const addBarangButton = () => {
        navigateTo(`/admin-perusahaan/perusahaan/${id_perusahaan}/add`);
    };
    
    const handleSearch = (e) => {
        setSearchText(e.target.value); 
    };

    const filteredData = barang ? barang.filter((item) =>
        item.nama.toLowerCase().includes(searchText.toLowerCase()) ||
        item.merk.nama.toLowerCase().includes(searchText.toLowerCase())
    ) : [];

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title={perusahaan.nama}/>
                <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-3 px-8'>
                    {perusahaan && perusahaan.nama && (
                        <div>
                            <div className="perusahaan-deskripsi">
                                {perusahaan.deskripsi}
                            </div>
                            <br />
                            <DataTable
                                title={
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div className="daftar-barang">
                                            Daftar Barang
                                        </div>
                                        {buttonTambah && (
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
                                        )}
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DaftarBarangPerusahaan);
