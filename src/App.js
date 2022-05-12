import './App.css';
import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/component/InfoDesa/home'
import Peta from './pages/component/InfoDesa/peta'
import Informasi from './pages/component/InfoDesa/informasi'
import Sejarah from './pages/component/InfoDesa/Sejarah'
import VisiMisi from './pages/component/InfoDesa/VisiMisi'
import Pemerintah from './pages/component/InfoDesa/PemerintahDesa'
import Detail from './pages/component/InfoDesa/Detail'
import Galeri from './pages/component/InfoDesa/galeri'
 
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword'

import ProtectedLogin from './routers/ProtectRoute';
import Dashboard from './pages/admin/Dashboard/index'

import DataArtikel from './pages/admin/DataArtikel/index';
import TambahArtikel from './pages/admin/DataArtikel/TambahArtikel';
import EditArtikel from './pages/admin/DataArtikel/EditArtikel';

import Jabatan from './pages/admin/DataJabatan'

import PemerintahDesa from './pages/admin/PemerintahDesa/index'
import TambahPemerintah from './pages/admin/PemerintahDesa/TambahPemerintah'
import EditPemerintah from './pages/admin/PemerintahDesa/EditPemerintah'

import DataKegiatan from './pages/admin/DataKegiatan/index';
import TambahKegiatan from './pages/admin/DataKegiatan/TambahKegiatan';
import EditKegiatan from './pages/admin/DataKegiatan/EditKegiatan';

import DataKegiatanRutin from './pages/admin/DataKegiatanRutin/index';
import TambahKegiatanRutin from './pages/admin/DataKegiatanRutin/TambahKegiatanRutin';
import EditKegiatanRutin from './pages/admin/DataKegiatanRutin/EditKegiatanRutin';

import InfoWilayah from './pages/admin/InfoWilayah/index'
import TambahInfoWilayah from './pages/admin/InfoWilayah/TambahInfoWilayah'
import EditInfoWilayah from './pages/admin/InfoWilayah/EditInfoWilayah'

import DataBerita from './pages/admin/DataBerita/index';
import TambahBerita from './pages/admin/DataBerita/TambahBerita';
import EditBerita from './pages/admin/DataBerita/EditBerita';

import DataPotensi from './pages/admin/DataPotensi/index';
import TambahPotensi from './pages/admin/DataPotensi/TambahPotensi';
import EditPotensi from './pages/admin/DataPotensi/EditPotensi';

import DataUMKM from './pages/admin/DataUMKM/index';
import TambahUMKM from './pages/admin/DataUMKM/TambahUMKM';
import EditUMKM from './pages/admin/DataUMKM/EditUMKM';

import DataLayanan from './pages/admin/LayananMasyarakat/index';
import TambahLayanan from './pages/admin/LayananMasyarakat/TambahLayanan';
import EditLayanan from './pages/admin/LayananMasyarakat/EditLayanan';


function App() {
  return (
    <Routes>
      <Route path="/home" element={ <Home />} />
      <Route path="/peta" element={ <Peta />} />
      <Route path="/informasi" element={ <Informasi />} />
      <Route path="/sejarah" element={ <Sejarah />} />
      <Route path="/visimisi" element={ <VisiMisi />} />
      <Route path="/pemerintah" element={ <Pemerintah />} />
      <Route path="/galeri" element={ <Galeri />} />
      <Route path="/detail/:id" element={ <Detail />} />

      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword/:token" element={<ResetPassword/>} />

    <Route element={<ProtectedLogin />}>  
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path='/artikel' element={<DataArtikel />} />
      <Route path='/tambahartikel' element={<TambahArtikel />} />
      <Route path='/editartikel/:id' element={<EditArtikel />} />

      <Route path='/potensi' element={<DataPotensi />} />
      <Route path='/tambahpotensi' element={<TambahPotensi />} />
      <Route path='/editpotensi/:id' element={<EditPotensi />} />

      <Route path='/data-berita' element={<DataBerita />} />
      <Route path='/tambah-data-berita' element={<TambahBerita />} />
      <Route path='/edit-data-berita/:id' element={<EditBerita />} />

      <Route path='/data-umkm' element={<DataUMKM />} />
      <Route path='/tambah-data-umkm' element={<TambahUMKM />} />
      <Route path='/edit-data-umkm/:id' element={<EditUMKM />} />

      <Route path='/layanan' element={<DataLayanan />} />
      <Route path='/tambahlayanan' element={<TambahLayanan />} />
      <Route path='/editlayanan/:id' element={<EditLayanan />} />

      <Route path='/jabatan' element={<Jabatan />} />

      <Route path='/kegiatan' element={<DataKegiatan />} />
      <Route path='/tambahkegiatan' element={<TambahKegiatan />} />
      <Route path='/editkegiatan/:id' element={<EditKegiatan />} />

      <Route path='/kegiatan-rutin' element={<DataKegiatanRutin />} />
      <Route path='/tambah-kegiatan-rutin' element={<TambahKegiatanRutin />} />
      <Route path='/edit-kegiatan-rutin/:id' element={<EditKegiatanRutin />} />

      <Route path='/pemerintahdesa' element={<PemerintahDesa />} />
      <Route path='/tambahpemerintah' element={<TambahPemerintah />} />
      <Route path='/editpemerintah/:id' element={<EditPemerintah />} />

      <Route path='/datainfowilayah' element={<InfoWilayah />} />
      <Route path='/tambahdatainfowilayah' element={<TambahInfoWilayah />} />
      <Route path='/editdatainfowilayah/:id' element={<EditInfoWilayah />} />
    </Route>  

      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="*" element={<Navigate replace to="/home" />} /> 
    </Routes>  
  );
}

export default App;
