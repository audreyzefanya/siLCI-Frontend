import React, { useState } from 'react';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex">
      <TabItem tabName="Riwayat Barang" isActive={activeTab === 'Riwayat Barang'} onClick={handleTabClick} />
      <TabItem tabName="Daftar Barang" isActive={activeTab === 'Daftar Barang'} onClick={handleTabClick} />
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
