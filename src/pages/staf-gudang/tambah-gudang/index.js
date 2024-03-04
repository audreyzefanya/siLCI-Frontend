import React from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/staf-gudang';
import Header from '../../../components/header';

const Gudang = (props) => {

  return (
      <div className='flex w-screen h-screen'>
        <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
        <div className='w-full h-screen flex flex-col'>
          <Header title='Dashboard'/>
          <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
            <table className="table-fixed w-full">
              <thead>
                <tr>
                  <th className="w-1/5">Kode</th>
                  <th className="w-1/5">Nama</th>
                  <th className="w-1/5">Lokasi</th>
                  <th className="w-1/5">Detail</th>
                  <th className="w-1/5">Update</th>
                </tr>
              </thead>
              <tbody>
                {gudangData.map((gudang, index) => (
                  <tr key={index}>
                    <td>{gudang.kode}</td>
                    <td>{gudang.nama}</td>
                    <td>{gudang.lokasi}</td>
                    <td>{gudang.detail}</td>
                    <td><button>Update</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="absolute top-0 right-0 mt-4 mr-8">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Tambah Gudang</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Gudang;