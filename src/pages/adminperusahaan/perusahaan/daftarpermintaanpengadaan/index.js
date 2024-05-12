import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../components/header';
import Sidebar from '../../../../components/sidebar/adminperusahaan';
import { GetAllPengadaanAdminImpor } from '../../../../service/perusahaanimpor/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';

const DaftarPermintaanPengiriman = (props) => {
    const [pengadaanList, setPengadaanList] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // const adminUserId = props.adminUserId; 
    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        // Get user info from localStorage
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        }
      }, []);

      const fetchDetails = async (userInfo) => {
        try {
            const response = await GetAllPengadaanAdminImpor(userInfo.id);
            setPengadaanList(response);
        } catch (error) {
            console.error('Error fetching dashboard details:', error);
        }
      };

      useEffect(() => {
        if(userInfo) {
          fetchDetails(userInfo)
        }
      }, [userInfo]);

    const handleNavigateToDetail = (pengadaan_id) => {
        navigate(`/admin-perusahaan/perusahaan/pengadaan-detail/${pengadaan_id}`);
    };

    const renderFileLink = (fileUrl, text) => {
        return fileUrl ? (
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>
                View
            </a>
        ) : (
            <span style={{ color: '#6c757d' }}>{text}</span>
        );
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Perusahaan',
            selector: row => row.companyName || 'Name not available', // Use companyName if available
            sortable: true,
        },
        {
            name: 'Jumlah Barang',
            selector: row => row.jumlahBarang,
            sortable: true,
        },
        {
            name: 'Total Harga',
            selector: row => row.totalHarga,
            sortable: true,
        },
        {
            name: 'Tanggal Permintaan',
            selector: row => new Date(row.tanggalPermintaaan).toLocaleDateString('en-GB'),
            sortable: true,
        },
        {
            name: 'Tanggal Update',
            selector: row => new Date(row.tanggalUpdate).toLocaleDateString('en-GB'),
            sortable: true,
        },
        {
            name: 'File Invoice',
            cell: (row) => renderFileLink(row.fileInvoice, 'No Invoice Available'),
            sortable: false,
        },
        {
            name: 'File Payment',
            cell: (row) => renderFileLink(row.filePayment, 'No Payment Info'),
            sortable: false,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <Button
                    style={{
                        backgroundColor: '#2C358C',
                        borderColor: '#2C358C',
                        color: '#FFFFFF',
                        borderRadius: '5px',
                        padding: '5px 10px',
                        fontSize: '0.875rem',
                    }}
                    onClick={() => handleNavigateToDetail(row.id)}
                >
                    Details
                </Button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                color: '#FFFFFF', 
                backgroundColor: '#DA3732', 
                border: 'none',
            },
        },
        cells: {
            style: {
                color: '#000000', 
                border: 'none',
            },
        },
        rows: {
            style: {
                borderBottomColor: 'transparent',
            },
        },
    };
    
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <Sidebar currentNavigation={2.3} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus} />
            <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                <Header title={null}/>
                <div style={{ padding: '20px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                            Daftar Permintaan Produk
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={pengadaanList}
                        pagination
                        highlightOnHover
                        customStyles={customStyles}
                    />
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DaftarPermintaanPengiriman);