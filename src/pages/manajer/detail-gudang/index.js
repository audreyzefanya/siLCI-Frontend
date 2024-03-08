import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import { fetchDetailGudang } from '../../../service/detailgudang/endpoint';
import PilihButton from '../../../components/button/buttonpilih';
import TabGudang from '../../../components/tabGudang';

const DetailGudangPage = () => {
  const [gudangData, setGudangData] = useState({});

  useEffect(() => {
    const fetchGudangData = async () => {
      try {
        const response = await fetch('/api/gudang/barang-gudang/${id_gudang}/detail');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setGudangData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchGudangData();
  }, []);

  return (
    <div>
      <div>ID Gudang: {gudangData.id_gudang}</div>
      <div>Nama Gudang: {gudangData.nama_gudang}</div>
      <div>Alamat Gudang: {gudangData.alamat_gudang}</div>
      <div>Kapasitas Gudang: {gudangData.kapasitas_gudang}</div>
      <table>
        <thead>
          <tr>
            <th>Nama Barang</th>
            <th>Stok</th>
          </tr>
        </thead>
        <tbody>
          {gudangData.barang &&
            gudangData.barang.map((barang, index) => (
              <tr key={index}>
                <td>{barang.nama_barang}</td>
                <td>{barang.stok}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailGudangPage;
