import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import { fetchDetailGudang } from '../../../service/detailgudang/endpoint';

const DetailGudangPage = (props) => {
  const { id_gudang } = useParams();
  const [gudangData, setGudangData] = useState({});

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await fetchDetailGudang();
        setGudangData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDetail();
  }, []);

  return (
    <div className='flex w-screen h-screen'>
      <Sidebar />
      <div className='w-full h-screen flex flex-col'>
        <Header title=''/>
        <div className="text-3xl font-bold mb-10 ml-10 mt-8">Detail Gudang</div>
          <div>ID Gudang: {gudangData.id_gudang}</div>
          <div>Nama Gudang: {gudangData.nama_gudang}</div>
          <div>Alamat Gudang: {gudangData.alamat_gudang}</div>
          <div>Kapasitas Gudang: {gudangData.kapasitas_gudang}</div>
        <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
          <table className="w-full table-auto mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Nama Barang</th>
                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Stok</th>
              </tr>
            </thead>
            <tbody>
              {gudangData.barang && gudangData.barang.map((barang, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{barang.nama_barang}</td>
                  <td className="border px-4 py-2">{barang.stok}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  idGudang: state.gudang.idGudang
});

export default connect(mapStateToProps)(DetailGudangPage);