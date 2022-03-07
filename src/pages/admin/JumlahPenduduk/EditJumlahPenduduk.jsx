import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import Footer from '../Footer'
import Nav from '../Nav'
import Sidebar from '../Sidebar'
import swal from 'sweetalert'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { NavLink } from "reactstrap"
import '../css/main.min.css'

function EditJumlahPenduduk(props) {
    const api = 'http://127.0.0.1:8000/api';
    const { id } = useParams()
    console.log(id)

    const [jumlahPendudukInput, setJumlahPenduduk] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const getJumlahPenduduk = async () => {
        try {
            const jumlahPenduduk_id = id;
            setLoading(true)
            const res = await axios.get(api + `/jumlah-penduduk/edit/2`)
            setLoading(false)
            if (res.data.status === 200) {
                setJumlahPenduduk(res.data.jumlahpenduduk);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/jumlahpenduduk");
            }
        }
        catch (err) {
            setLoading(false)
            return navigate("/jumlahpenduduk");
        }
    }
    useEffect(() => {
        getJumlahPenduduk();
    }, [props])

    const changeValue = (e) => {
        e.persist();
        setJumlahPenduduk({ ...jumlahPendudukInput, [e.target.name]: e.target.value });
    }

    const updateJumlahPenduduk = (e) => {
        e.preventDefault();
        const jumlahPenduduk_id = id;
        const data = jumlahPendudukInput;
        axios.put(api + `/jumlah-penduduk/update/${jumlahPenduduk_id}`, {
            jumlah_penduduk: jumlahPendudukInput.jumlah_penduduk,
        })
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success")
                    setError([]);
                } else if (res.data.status === 422) {
                    swal("Data Perlu di Isi", "", "error")
                    setError(res.data.errors);
                } else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error")
                    return navigate("/")
                }
            })
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
                                        <NavLink href="/jumlahpenduduk"><button className='btn btn-primary mr-4'>Back</button></NavLink>
                                    </div>
                                    <div className="ibox-body">
                                        <form onSubmit={updateJumlahPenduduk}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-lg-12 col-6">
                                                        <div className="form-group">
                                                            <label>Jumlah Penduduk</label>
                                                            <input className="form-control" type="number"
                                                                id="jumlah_penduduk"
                                                                name="jumlah_penduduk"
                                                                onChange={changeValue}
                                                                value={jumlahPendudukInput.jumlah_penduduk}
                                                            />
                                                            <small className='text-danger'>{error.jumlah_penduduk}</small>
                                                        </div>
                                                        <button
                                                            type='submit' className='btn btn-primary btn-user btn-block'>
                                                            Update
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
            //                                 <li className="breadcrumb-item active" aria-current="page">EditJumlahPenduduk</li>
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
            //                                 <h3 className="">Update Jumlah Penduduk</h3>
            //                                 <NavLink href="/jumlahpenduduk"><button className='btn btn-primary'>Back</button></NavLink>
            //                             </div>
            //                             <form onSubmit={updateJumlahPenduduk}>
            //                                 <div className="card-body">
            //                                     <div className="row">
            //                                         <div className="col-lg-12 col-6">
            //                                             <div className="form-group">
            //                                                 <label>Jumlah Penduduk</label>
            //                                                 <input className="form-control" type="number"
            //                                                     id="jumlah_penduduk"
            //                                                     name="jumlah_penduduk"
            //                                                     onChange={changeValue}
            //                                                     value={jumlahPendudukInput.jumlah_penduduk}
            //                                                 />
            //                                                 <small className='text-danger'>{error.jumlah_penduduk}</small>
            //                                             </div>
            //                                             <button
            //                                                 type='submit' className='btn btn-primary btn-user btn-block'>
            //                                                 Submit
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

export default EditJumlahPenduduk;