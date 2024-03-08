import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDataGudang } from '../../../service/gudangmanagement/endpoint';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import PrimaryButton from '../../../components/button/buttonpilih';
import { Button } from 'react-bootstrap';

const DaftarGudang = (props) => {
  const [gudangData, setGudangData] = useState([]);
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
    navigate(`/manager-operasional/daftar-gudang/${id_gudang}`);
  };

  const handleAddGudang = (event) => {
      event.stopPropagation();
      navigate(`/manager-operasional/daftar-gudang/add`);
    };


  return (
    <div className='flex w-screen h-screen'>
      <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
      <div className='w-full h-screen flex flex-col'>
        <Header title=''/>
        <div className="text-3xl font-bold mb-10 ml-10 mt-8">Daftar Gudang</div>
        <Button
                    size="sm"
                    variant="primary"
                    onClick={handleAddGudang}
                    style={{
                      borderRadius: '5px',
                      backgroundColor: '#2C358C',
                      color: 'white',
                      padding: '5px 10px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#DA3732'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#2C358C'}
                  >
                    + Tambah Gudang
                  </Button>

        <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gudangData.map(gudang => (
              <div key={gudang.id} className="bg-white rounded-lg p-6 flex flex-col justify-between">
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{gudang.nama}</h3>
                  <p className="text-sm text-gray-600">{gudang.alamat}</p>
                  <div className="mt-4">
                    <PrimaryButton onClick={() => handleDetailGudang(gudang.id)}>Detail</PrimaryButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DaftarGudang);
