import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/manajer';
import { GetDaftarBarang } from '../../../service/daftarbarang/endpoint'; // Sesuaikan path ini jika berbeda
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

  const handleDetail = (id_barang) => {
    navigate(`/manager-operasional/daftar-barang/${id_barang}`);
  };

  return (
    <div className='flex w-screen h-screen'>
      <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
      <div className='w-full h-screen flex flex-col'>
        <Header title=''/>
        <div className="text-3xl font-bold mb-10 ml-10 mt-8">Daftar Barang</div>
        <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Nama</th>
                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Deskripsi</th>
                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Detail</th>
              </tr>
            </thead>
            <tbody>
              {barangData.map((barang, index) => (
                <tr key={barang.id}>
                  <td className="border px-4 py-2">{barang.nama}</td>
                  <td className="border px-4 py-2">{barang.deskripsi}</td>
                  <td className="border px-4 py-2 flex justify-center">
                    <button onClick={() => handleDetail(barang.id)} className="block text-center text-blue-500 hover:text-blue-700 mt-2 mx-auto">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DaftarBarang);
