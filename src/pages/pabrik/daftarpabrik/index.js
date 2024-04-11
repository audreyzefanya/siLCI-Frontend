import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/manajer';
import { GetAllPabrik } from '../../../service/pabrik/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import TabPabrik from '../../../components/tabPabrik';

const DaftarPabrik = (props) => {
  const [pabrikData, setPabrikData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllPabrik();
        setPabrikData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDetailPabrik = (nama_pabrik) => {
    navigate(`/manager-operasional/pabrik/detail/${nama_pabrik}`);
  };

  const handleAddPabrik = (event) => {
    event.stopPropagation();
    navigate(`/manager-operasional/add-pabrik`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPabrikData = pabrikData.filter(pabrik =>
    pabrik.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pabrik.alamat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex w-screen h-screen'>
      <Sidebar currentNavigation={2.2} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
      <div className='w-full h-screen flex flex-col'>
        <Header title=''/>
        <div className="flex items-center text-3xl font-bold mb-10 ml-10 mt-8" style={{ color: '#000000' }}>
          <span style={{ marginRight: '20px' }}>Daftar Pabrik</span>
          <Button
            size="sm"
            onClick={handleAddPabrik}
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
            + Tambah Pabrik
          </Button>
        </div>
        <div className="ml-10 mb-4">
          <Form.Group style={{ position: 'relative' }}>
            <Form.Control
              type="text"
              placeholder="Cari pabrik..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ paddingLeft: '40px' }}
            />
            <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#A0AEC0', fontSize: '18px' }} />
          </Form.Group>
        </div>
        <div className='no-scrollbar flex-1 overflow-y-auto py-6 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' style={{ backgroundColor: '#F9FAFB' }}>
          {filteredPabrikData.map((pabrik) => (
            <div
              key={pabrik.id}
              onClick={() => handleDetailPabrik(pabrik.nama)}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
              style={{
                borderLeft: `4px solid #2C358C`
              }}
            >
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#2C358C' }}>{pabrik.nama}</h3>
              <p className="mb-4 text-gray-700">{pabrik.alamat}</p>
              <Button
                onClick={() => handleDetailPabrik(pabrik.nama)}
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

export default connect(mapStateToProps, mapDispatchToProps)(DaftarPabrik);
