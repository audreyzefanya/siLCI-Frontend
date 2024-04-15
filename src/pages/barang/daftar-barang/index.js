import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/manajer';
import { GetDaftarBarang } from '../../../service/daftarbarang/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';

const DaftarBarang = (props) => {
  const [barangData, setBarangData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetDaftarBarang();
        setBarangData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDetail = (id_barang, event) => {
    event.stopPropagation();
    navigate(`/manager-operasional/barang/${id_barang}`);
  };

  const handleAddBarang = (event) => {
    event.stopPropagation();
    navigate(`/manager-operasional/add-barang`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleUpdateBarang = (id_barang, event) => {
    event.stopPropagation();
    navigate(`/manager-operasional/barang/update/${id_barang}`);
  };

  const filteredBarangData = barangData.filter(barang =>
    barang.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    barang.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      name: 'Nama Barang',
      selector: row => row.nama,
      sortable: true,
      compact: true,
      width: '35%',
    },
    {
      name: 'Deskripsi',
      selector: row => row.deskripsi,
      sortable: true,
      compact: true,
      width: '35%',
    },
    {
      cell: (row) => (
        <div style={{ display: 'flex', justifyContent: 'start', gap: '8px' }}>
          <Button
            onClick={(e) => handleDetail(row.id, e)}
            style={{
              borderRadius: '5px',
              backgroundColor: '#2C358C',
              borderColor: '#2C358C',
              color: 'white',
              padding: '0.375rem 0.75rem',
              fontSize: '0.8rem',
            }}
          >
            View Details
          </Button>
          <Button
            onClick={(e) => handleUpdateBarang(row.id, e)}
            style={{
              borderRadius: '5px',
              backgroundColor: '#7C8FDC',
              borderColor: '#7C8FDC',
              color: 'white',
              padding: '0.375rem 0.75rem',
              fontSize: '0.8rem',
            }}
          >
            Update Barang
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '30%',
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px',
      },
    },
    headCells: {
      style: {
        color: '#202124',
        fontSize: '16px',
      },
    },
    cells: {
      style: {
        color: '#202124',
        fontSize: '14px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
    table: {
      style: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  };

  return (
    <div className='flex w-screen h-screen'>
      <Sidebar currentNavigation={2.3} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
      <div className='flex flex-col w-full h-screen'>
        <Header title=''/>
        <div className="flex items-center text-3xl font-bold mb-10 ml-10 mt-8" style={{ color: '#000000' }}>
          <span style={{ marginRight: '20px' }}>Daftar Barang</span>
          <Button
            size="sm"
            onClick={handleAddBarang}
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
        <div className="ml-10 mb-4">
          <Form.Group style={{ position: 'relative' }}>
            <Form.Control
              type="text"
              placeholder="Cari barang..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ paddingLeft: '40px' }}
            />
            <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#A0AEC0', fontSize: '18px' }} />
          </Form.Group>
        </div>
        <div style={{ padding: '20px' }}>
          <DataTable
            columns={columns}
            data={filteredBarangData}
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            pagination
          />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DaftarBarang);
