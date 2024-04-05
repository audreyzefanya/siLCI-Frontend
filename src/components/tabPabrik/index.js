import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('Daftar Barang');
  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'Batch Produksi') {
      navigate('');
    } else if (tabName === 'Pengiriman Barang') {
      navigate(`/manager-operasional/pabrik/permintaan-pengiriman/:nama_pabrik`);
    } else if (tabName === 'Daftar Barang') {
      navigate(`/manager-operasional/pabrik/detail/:nama_pabrik`);
    }
  };

  return (
    <div className="flex">
      <TabItem tabName="Daftar Barang" isActive={activeTab === 'Daftar Barang'} onClick={handleTabClick} />
      <TabItem tabName="Batch Produksi" isActive={activeTab === 'Batch Produksi'} onClick={handleTabClick} />
      <TabItem tabName="Pengiriman Barang" isActive={activeTab === 'Pengiriman Barang'} onClick={handleTabClick} />
    </div>
  );
};

const TabItem = ({ tabName, isActive, onClick }) => {
  return (
    <div
      className={`cursor-pointer px-4 py-2 ${isActive ? 'bg-2C358C text-white' : 'hover:text-2C358C hover:bg-white'} transition-colors`}
      onClick={() => onClick(tabName)}
      style={{ backgroundColor: isActive ? '#2C358C' : '' }}
    >
      {tabName}
    </div>
  );
};

export default TabNavigation;
