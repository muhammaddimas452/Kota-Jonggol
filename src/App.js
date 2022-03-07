import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/component/InfoDesa/home'
import Peta from './pages/component/InfoDesa/peta'

import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword'
import Dashboard from './pages/admin/Dashboard/index'

import DataArtikel from './pages/admin/DataArtikel/index';
import TambahArtikel from './pages/admin/DataArtikel/TambahArtikel';
import EditArtikel from './pages/admin/DataArtikel/EditArtikel';

import PemerintahDesa from './pages/admin/PemerintahDesa/index'

import DataKegiatan from './pages/admin/DataKegiatan/index';
import TambahKegiatan from './pages/admin/DataKegiatan/TambahKegiatan';
import EditKegiatan from './pages/admin/DataKegiatan/EditKegiatan';

function App() {
  return (
    <Routes>
      <Route path="/home" element={ <Home />} />
      <Route path="/peta" element={ <Peta />} />

      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword/>} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path='/artikel' element={<DataArtikel />} />
      <Route path='/tambahartikel' element={<TambahArtikel />} />
      <Route path='/editartikel/:id' element={<EditArtikel />} />


      <Route path='/kegiatan' element={<DataKegiatan />} />
      <Route path='/tambahkegiatan' element={<TambahKegiatan />} />
      <Route path='/editkegiatan/:id' element={<EditKegiatan />} />

      <Route path='/pemerintahdesa' element={<PemerintahDesa />} />

      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="*" element={<Navigate replace to="/home" />} /> 
    </Routes>  
  );
}

export default App;
