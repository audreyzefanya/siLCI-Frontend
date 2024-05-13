import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import ModalLoading from '../../../components/modal/modalLoading';
import Sidebar from '../../../components/sidebar/manajer';
import { GetDaftarBarang } from '../../../service/daftarbarang/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';


const DaftarBarang = (props) => {
  const [barangData, setBarangData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsModalOpenLoading(true);
      const response = await GetDaftarBarang();
      setBarangData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsModalOpenLoading(false); // Set modal loading menjadi tertutup setelah selesai fetch data
  }

};

  const handleDetail = (id_barang) => {
    navigate(`/manager-operasional/barang/${id_barang}`);
  };

  const handleAddBarang = (event) => {
    event.stopPropagation();
    navigate(`/manager-operasional/add-barang`);
  };

  const handleUpdateBarang = (id_barang, event) => {
    event.stopPropagation();
    navigate(`/manager-operasional/barang/update/${id_barang}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const filteredBarangData = barangData.filter(barang =>
    barang.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    barang.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex w-screen h-screen'>
      <Sidebar currentNavigation={2.3} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
      <div className='w-full h-screen flex flex-col'>
        <Header title=''/>
        <div className="flex items-center text-3xl font-bold mb-10 ml-10 mt-8" style={{ color: '#000000' }}>
          <span style={{ marginRight: '20px' }}>Daftar Barang</span>
          {/* <Button
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
          </Button> */}
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
        <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBarangData.map(barang => (
              <div key={barang.id} className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl flex" style={{ borderLeft: '4px solid #2C358C' }}>
                <img src={barang.foto || 'default_image_path.jpg'} alt={barang.nama} style={{ width: '100px', height: '100px', marginRight: '20px', objectFit: 'cover' }} />
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#2C358C' }}>{barang.nama}</h3>
                  <p className="mb-4 text-gray-700">{truncateText(barang.deskripsi, 20)}</p> 
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      onClick={() => handleDetail(barang.id)}
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
                    > Lihat Detail </Button>
                    {/* <Button
                      onClick={(e) => handleUpdateBarang(barang.id, e)}
                      style={{
                        borderRadius: '5px',
                        backgroundColor: '#7C8FDC',
                        borderColor: '#7C8FDC',
                        color: 'white',
                        padding: '7px 10px',
                        fontSize: '0.875rem',
                      }}
                    > Ubah Barang </Button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ModalLoading title="Loading..." subtitle="Please wait a moment" isOpen={isModalOpenLoading} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DaftarBarang);