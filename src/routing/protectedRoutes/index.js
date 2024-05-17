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
        "/manager-operasional/pabrik/detail/:nama_pabrik/batch",
        "/manager-operasional/pabrik/detail/:nama_pabrik",
        "/manager-operasional/pabrik/detail/:nama_pabrik/:kode_batch",
        "/manager-operasional/pabrik/detail/:nama_pabrik/:kode_batch/update",
        "/manager-operasional/pabrik/barang/:id_barang",
        "/manager-operasional/daftar-gudang",
        "/manager-operasional/daftar-gudang/:id_gudang",
        "/manager-operasional/daftar-gudang/add",
        "/manager-operasional/barang",
        "/manager-operasional/barang/:id_barang",
        "/manager-operasional/barang/update/:id_barang",
        "/manager-operasional/profile",
        "/manager-operasional/add-barang",
        "/manager-operasional/add-pabrik",
        "/manager-operasional/pabrik/permintaan-pengiriman/:nama_pabrik",
        "/manager-operasional/perusahaan/pengadaan-detail/:pengadaan_id",
        "/manager-operasional/daftar-gudang/permintaanpengiriman/:id_gudang",
        "/manager-operasional/permintaanpengiriman/:id_gudang/add",
        "/manager-operasional/view-profile",

    ];

    const adminKaryawanRoutes = [
        "/admin-karyawan/dashboard",
        "/admin-karyawan/barang",
        "/admin-karyawan/barang/:id_barang",
        "/admin-karyawan/add-barang",
        "/admin-karyawan/barang/update/:id_barang",
        "/admin-karyawan/profile",
        "/admin-karyawan/view-profile",
    ];

    const adminPerusahaanRoutes = [
        "/admin-perusahaan/dashboard",
        "/admin-perusahaan/perusahaan",
        "/admin-perusahaan/perusahaan/:id_perusahaan",
        "/admin-perusahaan/perusahaan/:id_perusahaan/add",
        "/admin-perusahaan/profile",
        "/admin-perusahaan/barang",
        "/admin-perusahaan/barang/:id_barang",
        "/admin-perusahaan/perusahaan/all",
        "/admin-perusahaan/perusahaan/pengadaan-detail/:pengadaan_id",
        "/admin-perusahaan/view-profile",
    ];

    const stafPengadaanRoutes = [
        "/staf-pengadaan/dashboard",
        "/staf-pengadaan/perusahaan",
        "/staf-pengadaan/perusahaan/:id_perusahaan",
        "/staf-pengadaan/profile",
        "/staf-pengadaan/barang",
        "/staf-pengadaan/barang/:id_barang",
        "/staf-pengadaan/perusahaan/all",
        "/staf-pengadaan/perusahaan/pengadaan-detail/:pengadaan_id",
        "/staf-pengadaan/view-profile",
    ];

    const stafGudangRoutes = [
        "/staf-gudang/dashboard",
        "/staf-gudang/daftar-gudang",
        "/staf-gudang/daftar-gudang/:id_gudang",
        "/staf-gudang/daftar-gudang/:id_gudang/add",
        "/staf-gudang/daftar-gudang/add",
        "/staf-gudang/pabrik",
        "/staf-gudang/add-pabrik",
        "/staf-gudang/pabrik/detail/:nama_pabrik",
        "/staf-gudang/profile",
        "/staf-gudang/barang",
        "/staf-gudang/daftar-gudang/permintaanpengiriman/:id_gudang",
        "/staf-gudang/daftar-gudang/permintaanpengiriman/:id_gudang/add",
        "/staf-gudang/daftar-gudang/ubah/:id_gudang",
        "/staf-gudang/view-profile"
    ];

    const stafPabrikRoutes = [
        "/staf-pabrik/dashboard",
        "/staf-pabrik/pabrik",
        "/staf-pabrik/pabrik/detail/:nama_pabrik",
        "/staf-pabrik/add-pabrik",
        "/staf-pabrik/profile",
        "/staf-pabrik/barang",
        "/staf-pabrik/pabrik/permintaan-pengiriman/:nama_pabrik",
        "/staf-pabrik/pabrik/detail/:nama_pabrik/batch",
        "/staf-pabrik/pabrik/detail/:nama_pabrik/:kode_batch",
        "/staf-pabrik/pabrik/detail/:nama_pabrik/:kode_batch/update",
        "/staf-pabrik/view-profile",
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