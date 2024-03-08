import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../../components/button/buttonpilih';
import Header from '../../../../components/header';
import Sidebar from '../../../../components/sidebar/stafgudang';
import { GetAllPabrik } from '../../../../service/pabrik/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';

const DaftarPabrik = (props) => {
  const [pabrikData, setPabrikData] = useState([]);
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
    navigate(`/staf-gudang/pabrik/detail/${nama_pabrik}`);
  };

  const handleAddPabrik = (event) => {
      event.stopPropagation();
      navigate(`/staf-gudang/add-pabrik`);
    };


  return (
    <div className='flex w-screen h-screen'>
      <Sidebar currentNavigation={2.2} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
      <div className='w-full h-screen flex flex-col'>
        <Header title=''/>
        <div className="text-3xl font-bold mb-10 ml-10 mt-8">Daftar Pabrik</div>
        <Button
                    size="sm"
                    variant="primary"
                    onClick={handleAddPabrik}
                    style={{
                      borderRadius: '5px',
                      backgroundColor: '#2C358C',
                      color: 'white',
                      padding: '5px 10px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#DA3732'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#2C358C'}
                  >
                    + Tambah Pabrik
                  </Button>

        <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pabrikData.map(pabrik => (
              <div key={pabrik.id} className="bg-white rounded-lg p-6 flex flex-col justify-between">
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{pabrik.nama}</h3>
                  <p className="text-sm text-gray-600">{pabrik.alamat}</p>
                  <div className="mt-4">
                    <PrimaryButton onClick={() => handleDetailPabrik(pabrik.nama)}>Detail</PrimaryButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(DaftarPabrik);
