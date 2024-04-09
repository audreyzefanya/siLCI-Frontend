import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TabNavigation = ( {tabAktif} ) => {
  const [activeTab, setActiveTab] = useState(tabAktif);
  const navigate = useNavigate();
  const { nama_pabrik } = useParams();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleNavigate = (tabName) => {
    if (tabName === 'Batch Produksi') {
      navigate(`/manager-operasional/pabrik/detail/${nama_pabrik}/batch`);
    } else if (tabName === 'Pengiriman Barang') {
      navigate(`/manager-operasional/pabrik/permintaan-pengiriman/${nama_pabrik}`);
    } else if (tabName === 'Daftar Barang') {
      navigate(`/manager-operasional/pabrik/detail/${nama_pabrik}`);
    }
  };

  return (
    <div className="flex">
      <TabItem tabName="Daftar Barang" isActive={activeTab === 'Daftar Barang'} onClick={() => { handleTabClick('Daftar Barang'); handleNavigate('Daftar Barang'); }} />
      <TabItem tabName="Batch Produksi" isActive={activeTab === 'Batch Produksi'} onClick={() => { handleTabClick('Batch Produksi'); handleNavigate('Batch Produksi'); }} />
      <TabItem tabName="Pengiriman Barang" isActive={activeTab === 'Pengiriman Barang'} onClick={() => { handleTabClick('Pengiriman Barang'); handleNavigate('Pengiriman Barang'); }} />
    </div>
  );
};

const TabItem = ({ tabName, isActive, onClick }) => {
  return (
    <div
      className={`cursor-pointer px-4 py-2 ${isActive ? 'bg-2C358C text-white' : 'hover:text-2C358C hover:bg-white'} transition-colors`}
      onClick={onClick}
      style={{ backgroundColor: isActive ? '#2C358C' : '' }}
    >
      {tabName}
    </div>
  );
};

export default TabNavigation;