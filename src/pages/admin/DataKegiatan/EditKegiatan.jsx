import React, { useEffect, useState } from 'react';
import Nav from '../Nav'
import swal from 'sweetalert';
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { NavLink } from "reactstrap"
import axios from 'axios';
import '../css/main.min.css'

export default function TambahArtikel() {
    const api = "http://127.0.0.1:8000/api"

    const { id } = useParams()
    const [kegiatanInput, setKegiatan] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false)
    const [picture, setPicture] = useState([]);
    const navigate = useNavigate();

    const getKegiatan = async () => {
        try {
            const kegiatan_id = id;
            setLoading(true)
            const res = await axios.get(api + `/kegiatan/edit/${kegiatan_id}`)
            console.log(res)
            setLoading(false)
            if (res.data.status === 200) {
                setKegiatan(res.data.kegiatan);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/kegiatan");
            }
        }
        catch (err) {
            setLoading(false)
            return navigate("/kegiatan");
        }
    }

    useEffect(() => {

        getKegiatan();

    }, [])


    const handleInput = (e) => {
        e.persist();
        setKegiatan({ ...kegiatanInput, [e.target.name]: e.target.value })
    }
    const handleImage = (e) => {
        e.persist();
        setPicture({ image: e.target.files[0] })
        console.log(picture.image)
    }

    const updateKegiatan = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', picture.image)
        formData.append('tanggal', kegiatanInput.tanggal)
        formData.append('nama_kegiatan', kegiatanInput.nama_kegiatan)
        formData.append('status', kegiatanInput.status)

        const kegiatan_id = id;
        const data = kegiatanInput;
        const res = await axios.post(api + `/kegiatan/update/${kegiatan_id}/?_method=PUT`, formData)
        if (res.data.status === 200) {
            swal("Success", res.data.message, "success")
            setError([]);
        } else if (res.data.status === 422) {
            swal("Data Perlu di Isi", "", "error")
            setError(res.data.errors);
        }
    }

    if (loading === true) {
        return (
            <div>loading</div>
        )
    } else {

        return (
            <div className='page-wrapper'>
                <Nav />
      
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
                                        <NavLink href="/kegiatan"><button className='genric-btn info radius mr-4'>Back</button></NavLink>
                                    </div>
                                    <div className="ibox-body">
                                        <form onSubmit={updateKegiatan}>
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
                                                                id="nama_kegiatan"
                                                                name="nama_kegiatan"
                                                                onChange={handleInput}
                                                                value={kegiatanInput.nama_kegiatan}
                                                            />
                                                            <small className='text-danger'>{error.nama_kegiatan}</small>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Tambahkan Gambar</label>
                                                            <input type="file"
                                                                className='form-control'
                                                                style={{ border: "none" }}
                                                                name="image"
                                                                onChange={handleImage}
                                                            />
                                                            <img className='mt-3 ml-3' style={{ width: 150, height: 100 }} src={"http://localhost:8000/" + kegiatanInput.image} alt="" />
                                                            <small className='text-danger'>{error.image}</small>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Keterangan</label>
                                                            <div className="radio">
                                                                {(() => {
                                                                    if (kegiatanInput.status === 1) {
                                                                        return (
                                                                            <label>
                                                                                <input type="radio" name="status" id="status" onChange={handleInput} value="1" checked />Sudah Dilaksanakan
                                                                            </label>
                                                                        )

                                                                    } else {
                                                                        return (
                                                                            <label>
                                                                                <input type="radio" name="status" id="status" onChange={handleInput} value="1" />Sudah Dilaksanakan
                                                                            </label>
                                                                        )
                                                                    }
                                                                })()}
                                                            </div>
                                                            <div className="radio">
                                                                {(() => {
                                                                    if (kegiatanInput.status === 0) {
                                                                        return (
                                                                            <label>
                                                                                <input type="radio" name="status" id="status" onChange={handleInput} value="0" checked />Belum Dilaksakan
                                                                            </label>
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <label>
                                                                                <input type="radio" name="status" id="status" onChange={handleInput} value="0" />Belum Dilaksakan
                                                                            </label>
                                                                        )
                                                                    }
                                                                })()}
                                                            </div>
                                                            <small className='text-danger'>{error.status}</small>
                                                        </div>
                                                        <button
                                                            type='submit' className='genric-btn info radius btn-user btn-block'>
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
            //                         <h3>Update Page</h3>
            //                         <p className="text-subtitle text-muted">A page for user to update</p>
            //                     </div>
            //                     <div className="col-12 col-md-6 order-md-2 order-first">
            //                         <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
            //                             <ol className="breadcrumb">
            //                                 <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
            //                                 <li className="breadcrumb-item active" aria-current="page">EditArtikel</li>
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
            //                                 <h3 className="">Edit Artikel</h3>
            //                                 <NavLink href="/kegiatan"><button className='btn btn-primary'>Back</button></NavLink>
            //                             </div>
            //                             <form onSubmit={updateKegiatan}>
            //                                 <div className="card-body">
            //                                     <div className="row">
            //                                         <div className="col-lg-12 col-6">
            //                                             <div className="form-group">
            //                                                 <label>Tanggal</label>
            //                                                 <input className="form-control" type="date" placeholder="Masukkan Nama Artikel"
            //                                                     id="tanggal"
            //                                                     name="tanggal"
            //                                                     onChange={handleInput}
            //                                                     value={kegiatanInput.tanggal}
            //                                                 />
            //                                                 <small className='text-danger'>{error.tanggal}</small>
            //                                             </div>
            //                                             <div className="form-group">
            //                                                 <label>Kegiatan</label>
            //                                                 <input className="form-control" type="text" row="3" placeholder='Isi Nama Kegiatan'
            //                                                     id="kegiatan"
            //                                                     name="kegiatan"
            //                                                     onChange={handleInput}
            //                                                     value={kegiatanInput.kegiatan}
            //                                                 />
            //                                                 <small className='text-danger'>{error.kegiatan}</small>
            //                                             </div>
            //                                             <div className="form-group">
            //                                                 <label>Tambahkan Gambar</label>
            //                                                 <input type="file"
            //                                                     className='form-control'
            //                                                     style={{ border: "none" }}
            //                                                     name="image"
            //                                                     onChange={handleImage}
            //                                                 />
            //                                                 <img className='mt-3 ml-3' style={{ width: 150, height: 100 }} src={"http://localhost:8000/" + kegiatanInput.image} alt="" />
            //                                                 <small className='text-danger'>{error.image}</small>
            //                                             </div>
            //                                             <div className="form-group">
            //                                                 <label>Keterangan</label>
            //                                                 <div className="radio">
            //                                                     {(() => {
            //                                                         if (kegiatanInput.status === 1) {
            //                                                             return (
            //                                                                 <label>
            //                                                                     <input type="radio" name="status" id="status" onChange={handleInput} value="1" checked />Sudah Dilaksanakan
            //                                                                 </label>
            //                                                             )
            //                                                         } else {
            //                                                             return (
            //                                                                 <label>
            //                                                                     <input type="radio" name="status" id="status" onChange={handleInput} value="1"/>Sudah Dilaksanakan
            //                                                                 </label>
            //                                                             )
            //                                                         }
            //                                                     })()}
            //                                                 </div>
            //                                                 <div className="radio">
            //                                                 {(() => {
            //                                                         if (kegiatanInput.status === 0) {
            //                                                             return (
            //                                                                 <label>
            //                                                                     <input type="radio" name="status" id="status" onChange={handleInput} value="0" checked />Belum Dilaksakan
            //                                                                 </label>
            //                                                             )
            //                                                         } else {
            //                                                             return (
            //                                                                 <label>
            //                                                                     <input type="radio" name="status" id="status" onChange={handleInput} value="0"/>Belum Dilaksakan
            //                                                                 </label>
            //                                                             )
            //                                                         }
            //                                                     })()}
            //                                                 </div>
            //                                                 <small className='text-danger'>{error.status}</small>
            //                                             </div>
            //                                             <button
            //                                                 type='submit' className='btn btn-primary btn-user btn-block'>
            //                                                 Tambah Data
            //                                             </button>
            //                                         </div>
            //                                     </div>
            //                                 </div>
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
}