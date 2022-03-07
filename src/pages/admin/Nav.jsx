import React, { Component, useEffect, useState } from 'react'
import jonggol from './assets/img/jonggol.png'
// import './assets/js/app.min.js'
// import './assets/vendors/jquery/dist/jquery.min.js'
// import './assets/vendors/popper.js/dist/umd/popper.min.js'
// // import './assets/vendors/bootstrap/dist/js/bootstrap.min.js'
// // import './assets/vendors/metisMenu/dist/metisMenu.min.js'
// import './assets/vendors/jquery-slimscroll/jquery.slimscroll.min.js'
// import './assets/vendors/chart.js/dist/Chart.min.js'
// // import './assets/vendors/jvectormap/jquery-jvectormap-2.0.3.min.js'
// // import './assets/vendors/jvectormap/jquery-jvectormap-world-mill-en.js'
// // import './assets/vendors/jvectormap/jquery-jvectormap-us-aea-en.js'

import axios from 'axios'
import swal from 'sweetalert'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { Modal, Col, Container, Row, Button } from 'react-bootstrap'
import './css/main.min.css'

export default function Nav(props) {
    const [modalShow, setModalShow] = useState(false);
    return (
        <div>
            <header className="header">
                <div className="page-brand">
                    <a className="link" href="/dashboard">
                        <span className="brand">Kota
                            <span className="brand-tip ml-1">Jonggol</span>
                        </span>
                        <span className="brand-mini">KJ</span>
                    </a>
                </div>
                <div className="flexbox flex-1">
                    {/* START TOP-LEFT TOOLBAR*/}
                    <ul className="nav navbar-toolbar">
                        <li>
                            <a className="nav-link sidebar-toggler js-sidebar-toggler"><i className="ti-menu" /></a>
                        </li>
                        <li>
                            <form className="navbar-search" action="javascript:;">
                                <div className="rel">
                                    <span className="search-icon"><i className="ti-search" /></span>
                                    <input className="form-control" placeholder="Search here..." />
                                </div>
                            </form>
                        </li>
                    </ul>
                </div>
            </header>
            <nav className="page-sidebar" id="sidebar">
                <div id="sidebar-collapse">
                    <div className="admin-block d-flex">
                        <div>
                            <img src={jonggol} width="45px" />
                        </div>
                        <div className="admin-info">
                            <div className="font-strong">Muhammad Dimas</div><small>Admin Kota Jonggol</small></div>
                    </div>
                    <ul className="side-menu metismenu">
                        <li>
                            <a className="active" href="/dashboard"><i className="sidebar-item-icon fa fa-th-large" />
                                <span className="nav-label">Dashboard</span>
                            </a>
                        </li>
                        <li className="heading">Data Desa</li>
                        <li>
                            <a href="/artikel"><i className="sidebar-item-icon fa fa-table" />
                                <span className="nav-label">Data Artikel</span></a>
                        </li>
                        <li>
                            <a href="/kegiatan"><i className="sidebar-item-icon fa fa-table" />
                                <span className="nav-label">Data Kegiatan</span></a>
                        </li>
                        <li>
                            <a href="/pemerintahdesa"><i className="sidebar-item-icon fa fa-table" />
                                <span className="nav-label">Pemerintah Desa</span></a>
                        </li>
                        <li>
                            <a href=''><i className="sidebar-item-icon ti-pencil-alt" />
                                <span className="nav-label">Menu</span><i className="fa fa-angle-left arrow" /></a>
                            <ul className="nav-2-level collapse">
                                <li>
                                    <a className='text-white' onClick={() => setModalShow(true)}>Jumlah Penduduk</a>
                                </li>
                                <li>
                                    <a href="javascript:;">?</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
            </nav>
        </div>
    )
}

function MydModalWithGrid(props) {
    const api = 'http://127.0.0.1:8000/api';
    const { id } = useParams()
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
                setError(res.data.errors);
            }
        }
        catch (err) {
            setLoading(false)
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
        axios.put(api + `/jumlah-penduduk/update/2`, {
            jumlah_penduduk: jumlahPendudukInput.jumlah_penduduk,
        })
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success")
                    setError([]);
                } else if (res.data.status === 422) {
                    swal("Data Perlu di Isi", "", "error")
                    setError(res.data.errors);
                }else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error")
                }
                console.log(res)
            })
    }

    if (loading === true) {
        return (
            <div>loading</div>
        )
    } else {
        return (
            <div>
                <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Jumlah Penduduk
                        </Modal.Title>
                    </Modal.Header>
                    <div>
                        <form onSubmit={updateJumlahPenduduk}>
                            <Modal.Body className="show-grid">
                                <Container>
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
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type='submit' className="genric-btn info radius small">Update</button>
                            </Modal.Footer>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}