import React from 'react';

const TabDash = ({ activeTab, onTabChange }) => {
  const tabs = ['Karyawan', 'Barang', 'Gudang'];

  return (
    <div className="flex border-b">
      {tabs.map((tabName) => (
        <div
          key={tabName}
          className={`cursor-pointer px-4 py-2 ${activeTab === tabName ? 'bg-2C358C text-white' : 'text-blue-600 hover:bg-blue-200'} transition-colors`}
          onClick={() => onTabChange(tabName)}
          style={{ backgroundColor: activeTab === tabName ? '#2C358C' : 'transparent' }}
        >
          {tabName}
        </div>
      ))}
    </div>
  );
};

export default TabDash;
