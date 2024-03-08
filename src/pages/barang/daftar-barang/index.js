import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/manajer';
import { GetDaftarBarang } from '../../../service/daftarbarang/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';

const DaftarBarang = (props) => {
  const [barangData, setBarangData] = useState([]);
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
    navigate(`/manager-operasional/daftar-barang/${id_barang}`);
  };

  const handleCardClick = (id_barang) => {
    navigate(`/manager-operasional/daftar-barang/${id_barang}`);
  };

  const handleAddBarang = (event) => {
    event.stopPropagation();
    navigate(`/manager-operasional/add-barang`);
  };
  

  return (
    <div className='flex w-screen h-screen'>
      <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
      <div className='w-full h-screen flex flex-col'>
        <Header title=''/>
        <div className="text-3xl font-bold mb-10 ml-10 mt-8" style={{ color: '#2C358C' }}>Daftar Barang</div>
        <Button
            size="sm" 
            variant="primary"
            onClick={handleAddBarang}
            style={{
              borderRadius: '5px',
              backgroundColor: '#2C358C',
              color: 'white',
              padding: '5px 10px' 
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#DA3732'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2C358C'}
          >
            + Tambah Barang
          </Button>
        <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {barangData.map((barang) => (
            <div 
              key={barang.id} 
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-blue-100" 
              // onClick={() => handleCardClick(barang.id)}
              style={{
                border: '2px solid #2C358C' 
              }}
            >
              <h3 className="text-lg font-bold">{barang.nama}</h3>
              <p className="mb-4">{barang.deskripsi}</p>
              <Button
                  variant="primary"
                  onClick={(e) => handleDetail(barang.id, e)}
                  style={{
                      borderRadius: '5px',
                      // border: '2px solid black',
                      backgroundColor: '#2C358C', 
                      color: 'white',
                      padding: '7px 8px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#DA3732'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#2C358C'}
              > View Details </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DaftarBarang);
