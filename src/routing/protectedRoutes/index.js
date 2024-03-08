import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ element: Component }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    const canAccessRoute = (currentRoute, allowedRoutes) => {
        return allowedRoutes.some((allowedRoute) => currentRoute.startsWith(allowedRoute));
    };
    
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const manajerRoutes = [
        '/manajer/dashboard',
        '/manajer/register',
    ];

    const managerOperasionalRoutes = [
        '/manager-operasional/dashboard',
        '/manager-operasional/register',
        "/manager-operasional/perusahaan",
        "/manager-operasional/perusahaan/:id_perusahaan",
        "/manager-operasional/pabrik",
        "/manager-operasional/pabrik/detail/:nama_pabrik",
        "/manager-operasional/daftar-gudang",
        "/manager-operasional/daftar-gudang/:id_gudang",
        "/manager-operasional/barang",
        "/manager-operasional/barang/:id_barang",
        "/manager-operasional/profile",
    ];

    const adminKaryawanRoutes = [
        "/admin-karyawan/dashboard",
        "/admin-karyawan/barang",
        "/admin-karyawan/barang/:id_barang",
        "/admin-karyawan/add-barang",
        "/admin-karyawan/profile",
    ];

    const adminPerusahaanRoutes = [
        "/admin-perusahaan/dashboard",
        "/admin-perusahaan/perusahaan",
        "/admin-perusahaan/perusahaan/:id_perusahaan",
        "/admin-perusahaan/perusahaan/:id_perusahaan/add",
        "/admin-perusahaan/profile",
        "/admin-perusahaan/barang",
        "/admin-perusahaan/barang/:id_barang",
    ];

    const stafPengadaanRoutes = [
        "/staf-pengadaan/dashboard",
        "/staf-pengadaan/perusahaan",
        "/staf-pengadaan/perusahaan/:id_perusahaan",
        "/staf-pengadaan/profile",
        "/staf-pengadaan/barang",
        "/staf-pengadaan/barang/:id_barang",
    ];

    const stafGudangRoutes = [
        "/staf-gudang/dashboard",
        "/staf-gudang/daftar-gudang",
        "/staf-gudang/daftar-gudang/:id_gudang",
        "/staf-gudang/daftar-gudang/:id_gudang/add",
        "/staf-gudang/daftar-gudang/add",
        "/staf-gudang/pabrik",
        "/staf-gudang/pabrik/detail/:nama_pabrik",
        "/staf-gudang/profile",
        
    ];

    const stafPabrikRoutes = [
        "/staf-pabrik/dashboard",
        "/staf-pabrik/pabrik",
        "/staf-pabrik/pabrik/detail/:nama_pabrik",
        "/staf-pabrik/add-pabrik",
        "/staf-pabrik/profile",
    ];


    if (isAuthenticated) {
            if (userInfo.role === 'Manajer' && canAccessRoute(window.location.pathname, manajerRoutes)) {
                return <Component />;
            }
            else if (userInfo.role === 'Manager Operasional' && canAccessRoute(window.location.pathname, managerOperasionalRoutes)) {
                return <Component />;
            }
            else if (userInfo.role === 'Admin Karyawan' && canAccessRoute(window.location.pathname, adminKaryawanRoutes)) {
                return <Component />;
            }
            else if (userInfo.role === 'Admin Perusahaan Import' && canAccessRoute(window.location.pathname, adminPerusahaanRoutes)) {
                return <Component />;
            }
            else if (userInfo.role === 'Staf Pengadaan' && canAccessRoute(window.location.pathname, stafPengadaanRoutes)) {
                return <Component />;
            }
            else if (userInfo.role === 'Staf Gudang' && canAccessRoute(window.location.pathname, stafGudangRoutes)) {
                return <Component />;
            }
            else if (userInfo.role === 'Staf Pabrik' && canAccessRoute(window.location.pathname, stafPabrikRoutes)) {
                return <Component />;
            }
            else {
                return <Navigate to="/logout" />;
            }
        } else {
            return <Navigate to="/login" />;
        }
    };

export default ProtectedRoutes;