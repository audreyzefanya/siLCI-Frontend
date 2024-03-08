import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from '../protectedRoutes';

import Login from '../../pages/authentication/login';
import Logout from '../../pages/authentication/logout';
import DaftarGudang from '../../pages/manajer/daftar-gudang';
import ManajerDashboard from '../../pages/manajer/dashboard';
import DetailGudangPage from '../../pages/manajer/detail-gudang';
import profilepage from '../../pages/manajer/profile/profilepage';
import RegisterPage from '../../pages/manajer/register';
import AddPabrik from '../../pages/pabrik/addpabrik';
import DaftarPabrik from '../../pages/pabrik/daftarpabrik';
import DetailPabrik from '../../pages/pabrik/detailpabrik';
import AddBarangPerusahaan from '../../pages/perusahaan/addbarang';
import DaftarBarangPerusahaan from '../../pages/perusahaan/daftarbarang';
import DaftarPerusahaan from '../../pages/perusahaan/daftarperusahaan';


const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
            {/*------Authentication Routes------*/}
            <Route path="/login" element={<Login />} />
            {/*---End of Authentication Routes---*/}

            {/*------System Admin Routes------*/}
            {/* Dashboard */}
            <Route path="/manajer/dashboard" element={<ProtectedRoutes element={ManajerDashboard} />} />
            <Route path="/manajer/register" element={<ProtectedRoutes element={RegisterPage} />} />

            <Route path="/manager-operasional/dashboard" element={<ProtectedRoutes element={ManajerDashboard} />} />
            <Route path="/manager-operasional/register" element={<ProtectedRoutes element={RegisterPage} />} />
            <Route path="/manager-operasional/daftar-gudang" element={<DaftarGudang />} />
            <Route path="/manager-operasional/detail-gudang" element={<ProtectedRoutes element={DetailGudangPage} />} />

            <Route path="/profile" element={<ProtectedRoutes element={profilepage} />} />

            <Route path="/perusahaan" element={<ProtectedRoutes element={DaftarPerusahaan} />} />
            <Route path="/perusahaan/:id_perusahaan" element={<ProtectedRoutes element={DaftarBarangPerusahaan} />} />
            <Route path="/perusahaan/:id_perusahaan/add" element={<ProtectedRoutes element={AddBarangPerusahaan} />} />

            <Route path="/pabrik" element={<DaftarPabrik />} />
            <Route path="/pabrik/detail/:nama_pabrik" element={<DetailPabrik />} />
            <Route path="/pabrik/detail/:nama_pabrik/a" element={<DetailPabrik />} />
            <Route path="/add-pabrik" element={<AddPabrik />} />

            <Route path="/staf-gudang/daftar-gudang" element={<ProtectedRoutes element={DaftarGudang} />} />

            {/*------Open Routes------*/}
            <Route path="/logout" element={<Logout />} />
  
            <Route path="*" element={<Logout />} />
            {/*---End of Open Routes---*/}
        </Routes>
    </BrowserRouter>
  );
};

export default Routing