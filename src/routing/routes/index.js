import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from '../protectedRoutes';

import Login from '../../pages/authentication/login';
import Logout from '../../pages/authentication/logout';
import AddBarang from '../../pages/barang/add-barang';
import DaftarBarang from '../../pages/barang/daftar-barang';
import DetailBarang from '../../pages/barang/detail-barang';
import ManajerDashboard from '../../pages/manajer/dashboard';
import profilepage from '../../pages/manajer/profile/profilepage';
import RegisterPage from '../../pages/manajer/register';

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
            <Route path="/barang" element={<ProtectedRoutes element={DaftarBarang} />} />
            <Route path="/barang/:id_barang" element={<ProtectedRoutes element={DetailBarang} />} />
            <Route path="/add-barang" element={<ProtectedRoutes element={AddBarang} />} />

            <Route path="/profile" element={<ProtectedRoutes element={profilepage} />} />

            {/*------Open Routes------*/}
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Logout />} />
            {/*---End of Open Routes---*/}
        </Routes>
    </BrowserRouter>
  );
};

export default Routing