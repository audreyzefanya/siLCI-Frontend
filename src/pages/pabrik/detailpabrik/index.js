import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { GetPabrik } from '../../../service/pabrik/endpoint';
import TabPabrik from '../../../components/tabPabrik';

const DetailPabrik = (props) => {
    const { nama_pabrik } = useParams();
    const [pabrik, setPabrik] = useState([]);
    const [searchText, setSearchText] = useState('');
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
    }, [nama_pabrik]);

    async function getDetailPabrik() {
        try {
            const pabrikData = await GetPabrik(nama_pabrik);
            setPabrik(pabrikData)
        } catch (error) {
            console.error('Error fetching pabrik data:', error);
        }
    }

    const handleDetailBarang = (barangId) => {
        navigateTo(`/manager-operasional/barang/${barangId}`);
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = pabrik.listBarang ? pabrik.listBarang.filter((item) =>
        item.barang.nama.toLowerCase().includes(searchText.toLowerCase()) ||
        item.barang.merk.nama.toLowerCase().includes(searchText.toLowerCase())
    ) : [];

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.2} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus} />
            <div className="w-full h-screen flex flex-col">
                <Header title={pabrik.nama} />
                <div className="flex-1 bg-neutral20">
                    <div className='no-scrollbar overflow-y-auto py-3 px-8'>
                        {pabrik && (
                            <>
                                <div className="pabrik-deskripsi">
                                    <b>Alamat:</b> {pabrik.alamat}
                                </div>
                                <br />
                                <TabPabrik 
                                    tabAktif={"Daftar Barang"}
                                />
                                <DataTable
                                    title={
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span>Daftar Barang</span>
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPabrik);
