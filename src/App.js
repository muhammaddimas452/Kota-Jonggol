import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/component/InfoDesa/home'
import Dashboard from './pages/admin/Dashboard/index'

import DataArtikel from './pages/admin/DataArtikel/index';
import TambahArtikel from './pages/admin/DataArtikel/TambahArtikel';
import EditArtikel from './pages/admin/DataArtikel/EditArtikel';

import JumlahPenduduk from './pages/admin/JumlahPenduduk/index';
import EditJumlahPenduduk from './pages/admin/JumlahPenduduk/EditJumlahPenduduk';

import DataKegiatan from './pages/admin/DataKegiatan/index';
import TambahKegiatan from './pages/admin/DataKegiatan/TambahKegiatan';
import EditKegiatan from './pages/admin/DataKegiatan/EditKegiatan';

function App() {
  return (
    <Routes>
      <Route path="/home" element={ <Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}

      <Route path='/artikel' element={<DataArtikel />} />
      <Route path='/tambahartikel' element={<TambahArtikel />} />
      <Route path='/editartikel/:id' element={<EditArtikel />} />

      <Route path='/jumlahpenduduk' element={<JumlahPenduduk />} />
      <Route path='/editjumlahpenduduk/:id' element={<EditJumlahPenduduk />} />

      <Route path='/kegiatan' element={<DataKegiatan />} />
      <Route path='/tambahkegiatan' element={<TambahKegiatan />} />
  <Route path='/editkegiatan/:id' element={<EditKegiatan />} />

      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="*" element={<Navigate replace to="/home" />} /> 
    </Routes>  
  );
}

export default App;
