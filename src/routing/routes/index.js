import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from '../protectedRoutes';

import Login from '../../pages/authentication/login';
import Logout from '../../pages/authentication/logout';
import AddBarang from '../../pages/barang/add-barang';
import DaftarBarang from '../../pages/barang/daftar-barang';
import DetailBarang from '../../pages/barang/detail-barang';
import BarangUpdate from '../../pages/barang/update-barang';
import DaftarGudang from '../../pages/gudang/daftargudang';
import DetailGudang from '../../pages/gudang/detailgudang';
import TambahGudang from '../../pages/gudang/tambahgudang';
import ManajerDashboard from '../../pages/manajer/dashboard';
import profilepage from '../../pages/manajer/profile/profilepage';
import RegisterPage from '../../pages/manajer/register';
import DaftarPabrik from '../../pages/pabrik/daftarpabrik';
import DetailPabrik from '../../pages/pabrik/detailpabrik';
import AddBarangPerusahaan from '../../pages/perusahaan/addbarang';
import CreatePerusahaan from '../../pages/perusahaan/createperusahaan';
import DaftarBarangPerusahaan from '../../pages/perusahaan/daftarbarang';
import DaftarPerusahaan from '../../pages/perusahaan/daftarperusahaan';
import daftarBatchProduksiPabrik from '../../pages/pabrik/daftarbatchproduksi';
import detailBatchProduksiPabrik from '../../pages/pabrik/detailbatchproduksi';
import formAddBatchProduksiPabrik from '../../pages/pabrik/addbatchproduksi';
import formUpdateBatchProduksiPabrik from '../../pages/pabrik/updatebatchproduksi';
import detailPabrik from '../../pages/pabrik/detailpabrik';
import daftarPabrik from '../../pages/pabrik/daftarpabrik';
import AddPabrik from '../../pages/pabrik/addpabrik';
import daftarPengiriman from '../../pages/pabrik/daftarpengiriman';
import daftarPengirimanGudang from '../../pages/gudang/daftarpengiriman';

import addBarang from '../../pages/adminkaryawan/barang/add-barang';
import daftarBarang from '../../pages/adminkaryawan/barang/daftar-barang';
import detailBarang from '../../pages/adminkaryawan/barang/detail-barang';
import UpdateBarang from '../../pages/adminkaryawan/barang/update-barang';

import daftarBarangPerusahaan from '../../pages/adminperusahaan/barang/daftar-barang';
import detailBarangPerusahaan from '../../pages/adminperusahaan/barang/detail-barang';
import addBarangPadaPerusahaan from '../../pages/adminperusahaan/perusahaan/addbarang';
import daftarBarangPadaPerusahaan from '../../pages/adminperusahaan/perusahaan/daftarbarang';
import daftarPerusahaan from '../../pages/adminperusahaan/perusahaan/daftarperusahaan';

import daftarBarangPengadaan from '../../pages/stafpengadaan/barang/daftar-barang';
import detailBarangPengadaan from '../../pages/stafpengadaan/barang/detail-barang';
import daftarBarangPerusahaanStafPengadaan from '../../pages/stafpengadaan/perusahaan/daftarbarang';
import daftarPerusahaanStafPengadaan from '../../pages/stafpengadaan/perusahaan/daftarperusahaan';

import detailBarangGudang from '../../pages/stafgudang/barang/detail-barang';
import addBarangStafGudang from '../../pages/stafgudang/gudang/addbarang';
import daftarGudangStafGudang from '../../pages/stafgudang/gudang/daftargudang';
import detailGudangStafGudang from '../../pages/stafgudang/gudang/detailgudang';
import tambahGudangStafGudang from '../../pages/stafgudang/gudang/tambahgudang';
import addPabrikStafGudang from '../../pages/stafgudang/pabrik/addpabrik';
import daftarPabrikStafGudang from '../../pages/stafgudang/pabrik/daftarpabrik';
import detailPabrikStafGudang from '../../pages/stafgudang/pabrik/detailpabrik';
import daftarPengirimanStafGudang from '../../pages/stafgudang/gudang/daftarpengiriman';
import ubahDetailGudang from '../../pages/stafgudang/gudang/ubahgudang';

import daftarBatchProduksiPabrikStafPabrik from '../../pages/stafpabrik/pabrik/daftarbatchproduksi';
import detailBatchProduksiPabrikStafPabrik from '../../pages/stafpabrik/pabrik/detailbatchproduksi';
import formAddBatchProduksiPabrikStafPabrik from '../../pages/stafpabrik/pabrik/addbatchproduksi';
import formUpdateBatchProduksiPabrikStafPabrik from '../../pages/stafpabrik/pabrik/updatebatchproduksi';
import daftarPabrikStafPabrik from '../../pages/stafpabrik/pabrik/daftarpabrik';
import detailPabrikStafPabrik from '../../pages/stafpabrik/pabrik/detailpabrik';
import addPabrikStafPabrik from '../../pages/stafpabrik/pabrik/addpabrik';
import detailBarangPabrik from '../../pages/stafpabrik/barang/detail-barang';
import DaftarPengirimanStafPabrik from '../../pages/stafpabrik/pabrik/daftarpengiriman';

import dashboardAdminKaryawan from '../../pages/adminkaryawan/dashboard';
import dashboardAdminPerusahaan from '../../pages/adminperusahaan/dashboard';
import dashboardStafGudang from '../../pages/stafgudang/dashboard';
import dashboardStafPabrik from '../../pages/stafpabrik/dashboard';
import dashboardStafPengadaan from '../../pages/stafpengadaan/dashboard';

import profileAdminKaryawan from '../../pages/adminkaryawan/profile';
import profileAdminPerusahaan from '../../pages/adminperusahaan/profile';
import profileStafGudang from '../../pages/stafgudang/profile';
import profileStafPabrik from '../../pages/stafpabrik/profile';
import profileStafPengadaan from '../../pages/stafpengadaan/profile';
import requestPengadaan from '../../pages/stafpengadaan/perusahaan/requestPengadaan';

import DaftarPermintaanPengirimanAdmin from '../../pages/adminperusahaan/perusahaan/daftarpermintaanpengadaan';
import PengadaanDetailAdmin from '../../pages/adminperusahaan/perusahaan/detailpengadaan';
import DaftarPermintaanPengirimanStaf from '../../pages/stafpengadaan/perusahaan/daftarpermintaanpengadaan';
import PengadaanDetailStaf from '../../pages/stafpengadaan/perusahaan/detailpengadaan';

// import DaftarPermintaanPengirimanAdmin from '../../pages/adminperusahaan/perusahaan/daftarpermintaanpengadaan';
// import DaftarPermintaanPengirimanStaf from '../../pages/stafpengadaan/perusahaan/daftarpermintaanpengadaan';


const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
            {/*------Authentication Routes------*/}
            <Route path="/login" element={<Login />} />
            {/*---End of Authentication Routes---*/}

            {/*------Manager Operasional Routes------*/}
            <Route path="/manajer/dashboard" element={<ProtectedRoutes element={ManajerDashboard} />} />
            <Route path="/manajer/register" element={<ProtectedRoutes element={RegisterPage} />} />

            <Route path="/manager-operasional/dashboard" element={<ProtectedRoutes element={ManajerDashboard} />} />
            <Route path="/manager-operasional/register" element={<ProtectedRoutes element={RegisterPage} />} />
            <Route path="/manager-operasional/perusahaan" element={<ProtectedRoutes element={DaftarPerusahaan} />} />
            <Route path="/manager-operasional/perusahaan/:id_perusahaan" element={<ProtectedRoutes element={DaftarBarangPerusahaan} />} />
            <Route path="/manager-operasional/perusahaan/:id_perusahaan/add" element={<ProtectedRoutes element={AddBarangPerusahaan} />} />
            <Route path="/manager-operasional/perusahaan/create" element={<ProtectedRoutes element={CreatePerusahaan} />} />
            <Route path="/manager-operasional/pabrik" element={<ProtectedRoutes element={daftarPabrik} />} />
            <Route path="/manager-operasional/pabrik/detail/:nama_pabrik" element={<ProtectedRoutes element={detailPabrik} />} />
            <Route path="/manager-operasional/pabrik/detail/:nama_pabrik/batch" element={<ProtectedRoutes element={daftarBatchProduksiPabrik} />} />
            <Route path="/manager-operasional/pabrik/detail/:nama_pabrik/batch/add" element={<ProtectedRoutes element={formAddBatchProduksiPabrik} />} />
            <Route path="/manager-operasional/pabrik/detail/:nama_pabrik/:kode_batch" element={<ProtectedRoutes element={detailBatchProduksiPabrik} />} />
            <Route path="/manager-operasional/pabrik/detail/:nama_pabrik/:kode_batch/update" element={<ProtectedRoutes element={formUpdateBatchProduksiPabrik} />} />
            <Route path="/manager-operasional/daftar-gudang" element={<ProtectedRoutes element={DaftarGudang} />} />
            <Route path="/manager-operasional/daftar-gudang/:id_gudang" element={<ProtectedRoutes element={DetailGudang} />} />
            <Route path="/manager-operasional/barang" element={<ProtectedRoutes element={DaftarBarang} />} />
            <Route path="/manager-operasional/barang/:id_barang" element={<ProtectedRoutes element={DetailBarang} />} />
            <Route path="/manager-operasional/barang/update/:id_barang" element={<ProtectedRoutes element={BarangUpdate} />} />
            <Route path="/manager-operasional/daftar-gudang/add" element={<ProtectedRoutes element={TambahGudang} />} />
            <Route path="/manager-operasional/add-barang" element={<ProtectedRoutes element={AddBarang} />} />
            <Route path="/manager-operasional/add-pabrik" element={<ProtectedRoutes element={AddPabrik} />} />
            <Route path="/manager-operasional/perusahaan/all" element={<ProtectedRoutes element={DaftarPermintaanPengirimanStaf} />} />
            <Route path="/manager-operasional/perusahaan/pengadaan-detail/:pengadaan_id" element={<ProtectedRoutes element={PengadaanDetailStaf} />} />
            <Route path="/manager-operasional/pabrik/permintaan-pengiriman/:nama_pabrik" element={<ProtectedRoutes element={daftarPengiriman} />} />
//            <Route path="/manager-operasional/perusahaan/pengadaan-detail/:pengadaan_id" element={<ProtectedRoutes element={PengadaanDetailStaf} />} />
            <Route path="/manager-operasional/permintaanpengiriman/:id_gudang" element={<ProtectedRoutes element={daftarPengirimanGudang} />} />

            {/*-----Admin Karyawan Routes------*/}
            <Route path="/admin-karyawan/dashboard" element={<ProtectedRoutes element={dashboardAdminKaryawan} />} />
            <Route path="/admin-karyawan/barang" element={<ProtectedRoutes element={daftarBarang} />} />
            <Route path="/admin-karyawan/barang/:id_barang" element={<ProtectedRoutes element={detailBarang} />} />
            <Route path="/admin-karyawan/barang/update/:id_barang" element={<ProtectedRoutes element={UpdateBarang} />} />
            <Route path="/admin-karyawan/add-barang" element={<ProtectedRoutes element={addBarang} />} />

            {/*-----Admin Perusahaan Import Routes------*/}
            <Route path="/admin-perusahaan/dashboard" element={<ProtectedRoutes element={dashboardAdminPerusahaan} />} />
            <Route path="/admin-perusahaan/perusahaan" element={<ProtectedRoutes element={daftarPerusahaan} />} />
            <Route path="/admin-perusahaan/perusahaan/:id_perusahaan" element={<ProtectedRoutes element={daftarBarangPadaPerusahaan} />} />
            <Route path="/admin-perusahaan/perusahaan/:id_perusahaan/add" element={<ProtectedRoutes element={addBarangPadaPerusahaan} />} />
            <Route path="/admin-perusahaan/barang/:id_barang" element={<ProtectedRoutes element={detailBarangPerusahaan} />} />
            <Route path="/admin-perusahaan/barang" element={<ProtectedRoutes element={daftarBarangPerusahaan} />} />
            <Route path="/admin-perusahaan/perusahaan/all" element={<ProtectedRoutes element={DaftarPermintaanPengirimanAdmin} />} />
            <Route path="/admin-perusahaan/perusahaan/pengadaan-detail/:pengadaan_id" element={<ProtectedRoutes element={PengadaanDetailAdmin} />} />


            {/*-----Staf Pengadaan Routes------*/}
            <Route path="/staf-pengadaan/dashboard" element={<ProtectedRoutes element={dashboardStafPengadaan} />} />
            <Route path="/staf-pengadaan/perusahaan" element={<ProtectedRoutes element={daftarPerusahaanStafPengadaan} />} />
            <Route path="/staf-pengadaan/perusahaan/:id_perusahaan" element={<ProtectedRoutes element={daftarBarangPerusahaanStafPengadaan} />} />
            <Route path="/staf-pengadaan/barang/:id_barang" element={<ProtectedRoutes element={detailBarangPengadaan} />} />
            <Route path="/staf-pengadaan/barang" element={<ProtectedRoutes element={daftarBarangPengadaan} />} />
            <Route path="/staf-pengadaan/perusahaan/:id_perusahaan/request/:id_barang" element={<ProtectedRoutes element={requestPengadaan} />} />
            <Route path="/staf-pengadaan/perusahaan/all" element={<ProtectedRoutes element={DaftarPermintaanPengirimanStaf} />} />
            <Route path="/staf-pengadaan/perusahaan/pengadaan-detail/:pengadaan_id" element={<ProtectedRoutes element={PengadaanDetailStaf} />} />


            {/*-----Staf Gudang Routes------*/}
            <Route path="/staf-gudang/dashboard" element={<ProtectedRoutes element={dashboardStafGudang} />} />
            <Route path="/staf-gudang/daftar-gudang" element={<ProtectedRoutes element={daftarGudangStafGudang} />} />
            <Route path="/staf-gudang/daftar-gudang/:id_gudang" element={<ProtectedRoutes element={detailGudangStafGudang} />} />
            <Route path="/staf-gudang/daftar-gudang/:id_gudang/add" element={<ProtectedRoutes element={addBarangStafGudang} />} />
            <Route path="/staf-gudang/daftar-gudang/add" element={<ProtectedRoutes element={tambahGudangStafGudang} />} />
            <Route path="/staf-gudang/pabrik" element={<ProtectedRoutes element={daftarPabrikStafGudang} />} />
            <Route path="/staf-gudang/pabrik/detail/:nama_pabrik" element={<ProtectedRoutes element={detailPabrikStafGudang} />} />
            <Route path="/staf-gudang/add-pabrik" element={<ProtectedRoutes element={addPabrikStafGudang} />} />
            <Route path="/staf-gudang/barang/:id_barang" element={<ProtectedRoutes element={detailBarangGudang} />} />
            <Route path="/staf-gudang/daftar-gudang/permintaanpengiriman/:id_gudang" element={<ProtectedRoutes element={daftarPengirimanStafGudang} />} />
            <Route path="/staf-gudang/daftar-gudang/ubah/:id_gudang" element={<ProtectedRoutes element={ubahDetailGudang} />} />

             {/*-----Staf Pabrik Routes------*/}
            <Route path="/staf-pabrik/dashboard" element={<ProtectedRoutes element={dashboardStafPabrik} />} />
            <Route path="/staf-pabrik/pabrik" element={<ProtectedRoutes element={daftarPabrikStafPabrik} />} />
            <Route path="/staf-pabrik/pabrik/detail/:nama_pabrik" element={<ProtectedRoutes element={detailPabrikStafPabrik} />} />
            <Route path="/staf-pabrik/add-pabrik" element={<ProtectedRoutes element={addPabrikStafPabrik} />} />
            <Route path="/staf-pabrik/barang/:id_barang" element={<ProtectedRoutes element={detailBarangPabrik} />} />
            <Route path="/staf-pabrik/pabrik/permintaan-pengiriman/:nama_pabrik" element={<ProtectedRoutes element={DaftarPengirimanStafPabrik} />} />
            <Route path="/staf-pabrik/pabrik/detail/:nama_pabrik/batch" element={<ProtectedRoutes element={daftarBatchProduksiPabrikStafPabrik} />} />
            <Route path="/staf-pabrik/pabrik/detail/:nama_pabrik/batch/add" element={<ProtectedRoutes element={formAddBatchProduksiPabrikStafPabrik} />} />
            <Route path="/staf-pabrik/pabrik/detail/:nama_pabrik/:kode_batch" element={<ProtectedRoutes element={detailBatchProduksiPabrikStafPabrik} />} />
            <Route path="/staf-pabrik/pabrik/detail/:nama_pabrik/:kode_batch/update" element={<ProtectedRoutes element={formUpdateBatchProduksiPabrikStafPabrik} />} />
            <Route path="/staf-pabrik/profile" element={<ProtectedRoutes element={profileStafPabrik} />} />
            <Route path="/staf-gudang/profile" element={<ProtectedRoutes element={profileStafGudang} />} />
            <Route path="/staf-pengadaan/profile" element={<ProtectedRoutes element={profileStafPengadaan} />} />
            <Route path="/admin-perusahaan/profile" element={<ProtectedRoutes element={profileAdminPerusahaan} />} />
            <Route path="/admin-karyawan/profile" element={<ProtectedRoutes element={profileAdminKaryawan} />} />
            <Route path="/manager-operasional/profile" element={<ProtectedRoutes element={profilepage} />} />
{/*
            <Route path="/daftar-gudang" element={<ProtectedRoutes element={DaftarGudang} />} />/manager-operasional
            <Route path="/daftar-gudang/:id_gudang" element={<ProtectedRoutes element={DetailGudang} />} />
            <Route path="/daftar-gudang/:id_gudang/add" element={<ProtectedRoutes element={AddBarangGudang} />} />
            <Route path="/daftar-gudang/add" element={<ProtectedRoutes element={TambahGudang} />} />

            <Route path="/profile" element={<ProtectedRoutes element={profilepage} />} />

            <Route path="/perusahaan" element={<ProtectedRoutes element={DaftarPerusahaan} />} />
            <Route path="/perusahaan/:id_perusahaan" element={<ProtectedRoutes element={DaftarBarangPerusahaan} />} />
            <Route path="/perusahaan/:id_perusahaan/add" element={<ProtectedRoutes element={AddBarangPerusahaan} />} />

            <Route path="/pabrik" element={<ProtectedRoutes element={DaftarPabrik} />} />
            <Route path="/pabrik/detail/:nama_pabrik" element={<ProtectedRoutes element={DetailPabrik} />} />
            <Route path="/add-pabrik" element={<ProtectedRoutes element={AddPabrik} />} /> */}

            {/*------Open Routes------*/}
            <Route path="/logout" element={<Logout />} />
  
            <Route path="*" element={<Logout />} />
            {/*---End of Open Routes---*/}
        </Routes>
    </BrowserRouter>
  );
};

export default Routing