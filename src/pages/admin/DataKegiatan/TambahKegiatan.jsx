import React, { useEffect, useState } from 'react';
import Footer from '../Footer'
import Nav from '../Nav'
import Sidebar from '../Sidebar'
import { Formik } from 'formik'
import swal from 'sweetalert';
import { tambahKegiatan } from '../../../api/kegiatan'
import { useNavigate } from "react-router-dom";
import { NavLink } from "reactstrap"
import axios from 'axios';
import '../css/main.min.css'

export default function TambahArtikel() {
    const api = "http://127.0.0.1:8000/api"

    const [kegiatanInput, setKegiatan] = useState({
        tanggal: "",
        kegiatan: "",
        status: "",

    });
    const [picture, setPicture] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setKegiatan({ ...kegiatanInput, [e.target.name]: e.target.value })
    }
    const handleImage = (e) => {
        e.persist();
        setPicture({ image: e.target.files[0] })
    }

    const navigate = useNavigate();
    const [error, setError] = useState([]);
    const submitKegiatan = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', picture.image)
        formData.append('tanggal', kegiatanInput.tanggal)
        formData.append('kegiatan', kegiatanInput.kegiatan)
        formData.append('status', kegiatanInput.status)

        const res = await axios.post(api + `/kegiatan/add`, formData)
        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");
            setError([]);
            return navigate("/kegiatan");
        }
        else if (res.data.status === 422) {
            swal("Data Perlu di Isi", "", "error");
            setError(res.data.errors);
        }
    }

    // const [error, setError] = useState([]);
    // const navigate = useNavigate();
    // const onSubmit = async (values) => {
    //     const result = await tambahKegiatan(values);
    //     console.log("result", result);
    //     if (result?.data?.status === 200) {
    //         swal("Success", result.data.status, "success");
    //         return navigate("/kegiatan");
    //     }
    //     else if (result.data?.status === 422) {
    //         swal("Data Perlu di Isi", "", "error");
    //         setError(result.data.errors);
    //     }
    //     else if (result?.data?.status === 404) {
    //         swal("Error", result.data.status, "error");
    //     }

    // };


    return (
        <div className='page-wrapper'>
            <Nav />
            <Sidebar />
            <div className="content-wrapper">
                <div className="page-heading">
                    <h1 className="page-title">Basic Form</h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html"><i className="la la-home font-20" /></a>
                        </li>
                        <li className="breadcrumb-item">Basic Form</li>
                    </ol>
                </div>
                <div className="page-content fade-in-up">
                    <div className="row">
                        <div className="col-md-12 col-12">
                            <div className="ibox">
                                <div className="ibox-head">
                                    <div className="ibox-title">Basic form</div>
                                    <div className="ibox-tools">
                                        <a className="ibox-collapse"><i className="fa fa-minus" /></a>
                                        <a className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-ellipsis-v" /></a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a className="dropdown-item">option 1</a>
                                            <a className="dropdown-item">option 2</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="ibox-body">
                                    <form onSubmit={submitKegiatan}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-12 col-6">
                                                    <div className="form-group">
                                                        <label>Tanggal</label>
                                                        <input className="form-control" type="date" placeholder="Masukkan Nama Artikel"
                                                            id="tanggal"
                                                            name="tanggal"
                                                            onChange={handleInput}
                                                            value={kegiatanInput.tanggal}
                                                        />
                                                        <small className='text-danger'>{error.tanggal}</small>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Kegiatan</label>
                                                        <input className="form-control" type="text" row="3" placeholder='Isi Nama Kegiatan'
                                                            id="kegiatan"
                                                            name="kegiatan"
                                                            onChange={handleInput}
                                                            value={kegiatanInput.kegiatan}
                                                        />
                                                        <small className='text-danger'>{error.kegiatan}</small>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Tambahkan Gambar</label>
                                                        <input type="file"
                                                            className='form-control'
                                                            style={{ border: "none" }}
                                                            name="image"
                                                            onChange={handleImage}
                                                        />
                                                        <small className='text-danger'>{error.image}</small>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Keterangan</label>
                                                        <div className="radio">
                                                            <label>
                                                                <input type="radio" name="status" id="status" onChange={handleInput} value="1" />Sudah Dilaksanakan
                                                            </label>
                                                        </div>
                                                        <div className="radio">
                                                            <label>
                                                                <input type="radio" name="status" id="status" onChange={handleInput} value="0" />Belum Dilaksanakan
                                                            </label>
                                                        </div>
                                                        <small className='text-danger'>{error.status}</small>
                                                    </div>
                                                    <button
                                                        type='submit' className='btn btn-primary btn-user btn-block'>
                                                        Tambah Data
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <div id="app">
        //     <Sidebar />
        //     <div id="main">
        //         <header className="mb-3">
        //             <a href="#" className="burger-btn d-block d-xl-none">
        //                 <i className="bi bi-justify fs-3" />
        //             </a>
        //         </header>
        //         <div className="page-heading">
        //             <div className="page-title">
        //                 <div className="row">
        //                     <div className="col-12 col-md-6 order-md-1 order-last">
        //                         <h3>Add Data</h3>
        //                         <p className="text-subtitle text-muted">A page for user to add the data</p>
        //                     </div>
        //                     <div className="col-12 col-md-6 order-md-2 order-first">
        //                         <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
        //                             <ol className="breadcrumb">
        //                                 <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
        //                                 <li className="breadcrumb-item active" aria-current="page">TambahArtikel</li>
        //                             </ol>
        //                         </nav>
        //                     </div>
        //                 </div>
        //             </div>
        //             <section id="input-style">
        //                 <div className="row">
        //                     <div className="col-md-12">
        //                         <div className="card">
        //                             <div className="card-header d-sm-flex align-items-center justify-content-between">
        //                                 <h3 className="">Tambah Artikel</h3>
        //                                 <NavLink href="/kegiatan"><button className='btn btn-primary'>Back</button></NavLink>
        //                             </div>
        //                             <form onSubmit={submitKegiatan}>
        //                             <div className="card-body">
        //                                 <div className="row">
        //                                     <div className="col-lg-12 col-6">
        //                                     <div className="form-group">
        //                                         <label>Tanggal</label>
        //                                         <input className="form-control" type="date" placeholder="Masukkan Nama Artikel"
        //                                             id="tanggal"
        //                                             name="tanggal"
        //                                             onChange={handleInput}
        //                                             value={kegiatanInput.tanggal}
        //                                         />
        //                                         <small className='text-danger'>{error.tanggal}</small>
        //                                     </div>
        //                                     <div className="form-group">
        //                                         <label>Kegiatan</label>
        //                                         <input className="form-control" type="text" row="3" placeholder='Isi Nama Kegiatan'
        //                                             id="kegiatan"
        //                                             name="kegiatan"
        //                                             onChange={handleInput}
        //                                             value={kegiatanInput.kegiatan}
        //                                         />
        //                                         <small className='text-danger'>{error.kegiatan}</small>
        //                                     </div>
        //                                     <div className="form-group">
        //                                         <label>Tambahkan Gambar</label>
        //                                         <input type="file"
        //                                             className='form-control'
        //                                             style={{ border: "none" }}
        //                                             name="image"
        //                                             onChange={handleImage}
        //                                         />
        //                                         <small className='text-danger'>{error.image}</small>
        //                                     </div>
        //                                     <div className="form-group">
        //                                         <label>Keterangan</label>
        //                                         <div className="radio">
        //                                             <label>
        //                                                 <input type="radio" name="status" id="status" onChange={handleInput} value="1" />Sudah Dilaksanakan
        //                                             </label>
        //                                         </div>
        //                                         <div className="radio">
        //                                             <label>
        //                                                 <input type="radio" name="status" id="status" onChange={handleInput} value="0" />Belum Dilaksanakan
        //                                             </label>
        //                                         </div>
        //                                         <small className='text-danger'>{error.status}</small>
        //                                     </div>
        //                                     <button
        //                                     type='submit' className='btn btn-primary btn-user btn-block'>
        //                                     Tambah Data
        //                                 </button>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             </form>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </section>
        //         </div>
        //     </div>
        // </div> 
    )
}