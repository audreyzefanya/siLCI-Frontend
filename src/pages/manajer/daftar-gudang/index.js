import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import { fetchDataGudang } from '../../../service/daftargudang/endpoint';
import { Link } from 'react-router-dom'; // Impor Link dari react-router-dom

const DaftarGudang = (props) => {
  const [gudangData, setGudangData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataGudang();
        setGudangData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='flex w-screen h-screen'>
      <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
      <div className='w-full h-screen flex flex-col'>
        <Header title=''/>
        <div className="text-3xl font-bold mb-10 ml-10 mt-8">Daftar Gudang</div>
        <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Nama</th>
                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Lokasi</th>
                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Aksi</th> {/* Tambah kolom untuk tombol "Pilih" */}
              </tr>
            </thead>
            <tbody>
              {gudangData.map((gudang, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{gudang.nama}</td>
                  <td className="border px-4 py-2">{gudang.alamat}</td>
                  <td className="border px-4 py-2 flex justify-center">
                    <Link to={`/manager-operasional/detail-gudang/${gudang.id_gudang}`} className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md">
                      Pilih
                    </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(DaftarGudang);