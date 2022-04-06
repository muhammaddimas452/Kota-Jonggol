import React, { Component, useEffect, useState } from 'react'
import jonggol from './assets/img/jonggol.png'
import axios from '../../api/axiosClient'
import swal from 'sweetalert'
import { Navigate, useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { Modal, Col, Container, Row, Button } from 'react-bootstrap'
import './css/main.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge } from "@fortawesome/free-solid-svg-icons";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Nav(props) {
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.clear()
        return navigate("/login")
    }
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
                            <a className="" href="/dashboard"><FontAwesomeIcon className='sidebar-item-icon' icon={faGauge}  />
                                <span className="nav-label">Dashboard</span>
                            </a>
                        </li>
                        <li className="heading">Data Desa</li>
                        <li>
                            <a href="/artikel"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable}  />
                                <span className="nav-label">Data Artikel</span></a>
                        </li>
                        <li>
                            <a href="/kegiatan"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable}  />
                                <span className="nav-label">Data Kegiatan</span></a>
                        </li>
                        <li>
                            <a href="/pemerintahdesa"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable}  />
                                <span className="nav-label">Pemerintah Desa</span></a>
                        </li>
                        <li>
                            <a href="/jabatan"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable}  />
                                <span className="nav-label">Data Jabatan</span></a>
                        </li>
                        <li>
                            <a href="/datainfowilayah"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable}  />
                                <span className="nav-label">Info Wilayah</span></a>
                        </li>
                        <li>
                            <a href=''><FontAwesomeIcon className='sidebar-item-icon' icon={faSquarePen}  />
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
                        <li>
                            <a href="" onClick={logOut}><FontAwesomeIcon className='sidebar-item-icon' icon={faRightFromBracket}  />
                                <span className="nav-label">Log Out</span></a>
                        </li>
                    </ul>
                </div>
                <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
            </nav>
        </div>
    )
}

function MydModalWithGrid(props) {
    const { id } = useParams()
    const [jumlahPendudukInput, setJumlahPenduduk] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false)

    const getJumlahPenduduk = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/jumlah-penduduk/edit/1`)
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
        axios.put(`/jumlah-penduduk/update/1`, {
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