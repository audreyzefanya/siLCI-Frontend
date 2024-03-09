import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../components/header';
import Sidebar from '../../../../components/sidebar/stafgudang';
import { fetchDataGudang } from '../../../../service/gudangmanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';

const DaftarGudang = (props) => {
  const [gudangData, setGudangData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataGudang('nama', 'alamat');
        setGudangData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDetailGudang = (id_gudang) => {
    navigate(`/staf-gudang/daftar-gudang/${id_gudang}`);
  };

  const handleAddGudang = (event) => {
    event.stopPropagation();
    navigate(`/staf-gudang/daftar-gudang/add`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredGudangData = gudangData.filter(gudang =>
    gudang.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gudang.alamat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex w-screen h-screen'>
      <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
      <div className='w-full h-screen flex flex-col'>
        <Header title=''/>
        <div className="flex items-center text-3xl font-bold mb-10 ml-10 mt-8" style={{ color: '#000000' }}>
          <span style={{ marginRight: '20px' }}>Daftar Gudang</span>
          <Button
            size="sm"
            onClick={handleAddGudang}
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
            + Tambah Gudang
          </Button>
        </div>
        <div className="ml-10 mb-4">
          <Form.Group style={{ position: 'relative' }}>
            <Form.Control
              type="text"
              placeholder="Cari gudang..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ paddingLeft: '40px' }}
            />
            <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#A0AEC0', fontSize: '18px' }} />
          </Form.Group>
        </div>
        <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredGudangData.map((gudang) => (
            <div
              key={gudang.id}
              onClick={() => handleDetailGudang(gudang.id)}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
              style={{
                borderLeft: `4px solid #2C358C`
              }}
            >
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#2C358C' }}>{gudang.nama}</h3>
              <p className="mb-4 text-gray-700">{gudang.alamat}</p>
              <Button
                onClick={() => handleDetailGudang(gudang.id)}
                style={{
                  borderRadius: '5px',
                  backgroundColor: '#2C358C',
                  borderColor: '#2C358C',
                  color: 'white',
                  padding: '7px 10px',
                  fontSize: '0.875rem',
                  transition: 'background-color 0.2s',
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

export default connect(mapStateToProps, mapDispatchToProps)(DaftarGudang);
