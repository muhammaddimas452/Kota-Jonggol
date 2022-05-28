import React, { useEffect, useState } from 'react'
import jonggol from './assets/img/jonggol.png'
import axios from '../../api/axiosClient'
import swal from 'sweetalert'
import { useNavigate } from "react-router-dom";
import { Modal, Container, Row } from 'react-bootstrap'
import './css/main.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge } from "@fortawesome/free-solid-svg-icons";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
    const [modalShow, setModalShow] = useState(false);
    const [modalSetting, setModalSetting] = useState(false);
    const [modalImage, setModalImage] = useState(false);
    const [modalText, setModalText] = useState(false);
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
                            <a className="nav-link sidebar-toggler js-sidebar-toggler" data-toggle="collapse"><i className="ti-menu" /></a>
                        </li>
                    </ul>
                    {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="ti-menu" />
                                </button> */}
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
                            <a className="" href="/dashboard"><FontAwesomeIcon className='sidebar-item-icon' icon={faGauge} />
                                <span className="nav-label">Dashboard</span>
                            </a>
                        </li>
                        <li className="heading">Data Desa</li>
                        <li>
                            <a href="/artikel"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable} />
                                <span className="nav-label">Data Artikel Profile</span></a>
                        </li>
                        <li>
                            <a href="/potensi"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable} />
                                <span className="nav-label">Data Potensi</span></a>
                        </li>
                        <li>
                            <a href="/data-umkm"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable} />
                                <span className="nav-label">Data UMKM</span></a>
                        </li>
                        <li>
                            <a href="/layanan"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable} />
                                <span className="nav-label">Data Layanan</span></a>
                        </li>
                        <li>
                            <a href="/data-berita"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable} />
                                <span className="nav-label">Data Berita</span></a>
                        </li>
                        <li>
                            <a href="/datainfowilayah"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable} />
                                <span className="nav-label">Info Wilayah</span></a>
                        </li>
                        <li>
                            <a href="/pemerintahdesa"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable} />
                                <span className="nav-label">Pemerintah Desa</span></a>
                        </li>
                        <li>
                            <a href="/jabatan"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable} />
                                <span className="nav-label">Data Jabatan</span></a>
                        </li>
                        <li>
                            <a href="/data-kegiatan"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable} />
                                <span className="nav-label">Data Kegiatan</span></a>
                        </li>
                        <li>
                            <a href="/kegiatan-rutin"><FontAwesomeIcon className='sidebar-item-icon' icon={faTable} />
                                <span className="nav-label">Data Kegiatan Rutin</span></a>
                        </li>
                        <li>
                            <a className='text-white' onClick={() => setModalShow(true)}><FontAwesomeIcon className='sidebar-item-icon' icon={faSquarePen} />
                                <span className="nav-label">Edit Jumlah Penduduk</span></a>
                        </li>
                        <li>
                            <a className='text-white' onClick={() => setModalSetting(true)}><FontAwesomeIcon className='sidebar-item-icon' icon={faSquarePen} />
                                <span className="nav-label">Pengaturan Info</span></a>
                        </li>
                        <li>
                            <a className='text-white' onClick={() => setModalImage(true)}><FontAwesomeIcon className='sidebar-item-icon' icon={faSquarePen} />
                                <span className="nav-label">Edit Foto Beranda</span></a>
                        </li>
                        <li>
                            <a className='text-white' onClick={() => setModalText(true)}><FontAwesomeIcon className='sidebar-item-icon' icon={faSquarePen} />
                                <span className="nav-label">Edit Text Beranda</span></a>
                        </li>
                        {/* <li>
                            <a href=''><FontAwesomeIcon className='sidebar-item-icon' icon={faSquarePen} />
                                <span className="nav-label">Menu</span><i className="fa fa-angle-left arrow" /></a>
                            <ul className="nav-2-level collapse">
                                <li>
                                    <a className='text-white' onClick={() => setModalShow(true)}>Edit Jumlah Penduduk</a>
                                </li>
                                <li>
                                    <a className='text-white' onClick={() => setModalSetting(true)}>Pengaturan Info</a>
                                </li>
                                <li>
                                    <a className='text-white' onClick={() => setModalImage(true)}>Edit Foto Beranda</a>
                                </li>
                                <li>
                                    <a className='text-white' onClick={() => setModalText(true)}>Edit Text Beranda</a>
                                </li>
                            </ul>
                        </li> */}
                        <li>
                            <a href="javascript:;"><i className="sidebar-item-icon fa fa-sitemap" />
                                <span className="nav-label">Menu Levels</span><i className="fa fa-angle-left arrow" /></a>
                            <ul className="nav-2-level collapse">
                                <li>
                                    <a href="javascript:;">Level 2</a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <span className="nav-label">Level 2</span><i className="fa fa-angle-left arrow" /></a>
                                    <ul className="nav-3-level collapse">
                                        <li>
                                            <a href="javascript:;">Level 3</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">Level 3</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="" onClick={logOut}><FontAwesomeIcon className='sidebar-item-icon' icon={faRightFromBracket} />
                                <span className="nav-label">Log Out</span></a>
                        </li>
                    </ul>
                </div>
                <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
                <ModalSetting show={modalSetting} onHide={() => setModalSetting(false)} />
                <ModalImage show={modalImage} onHide={() => setModalImage(false)} />
                <ModalText show={modalText} onHide={() => setModalText(false)} />
            </nav>
        </div>
    )
}

function MydModalWithGrid(props) {
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
                } else if (res.data.status === 404) {
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
                        <form>
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
                                <button onClick={updateJumlahPenduduk} className="genric-btn info radius small">Update</button>
                            </Modal.Footer>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

function ModalSetting(props) {
    const [setting, setSetting] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false)

    const getSetting = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/info/edit/1`)
            setLoading(false)
            if (res.data.status === 200) {
                setSetting(res.data.info);
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
        getSetting();
    }, [props])

    const changeValue = (e) => {
        e.persist();
        setSetting({ ...setting, [e.target.name]: e.target.value });
    }

    const updateSetting = (e) => {
        e.preventDefault();
        axios.put(`/info/update/1`, {
            lokasi_desa: setting.lokasi_desa,
            email_desa: setting.email_desa,
            nomor_hp1: setting.nomor_hp1,
            nomor_hp2: setting.nomor_hp2,
            link_fb: setting.link_fb,
            link_twitter: setting.link_twitter,
            link_ig: setting.link_ig,
            link_yt: setting.link_yt,
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
                <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter font-bold">
                            Update Info
                        </Modal.Title>
                    </Modal.Header>
                    <div>
                        <form>
                            <Modal.Body className="show-grid">
                                <Container>
                                    <div className="form-group">
                                        <label className='font-bold'>Lokasi Desa</label>
                                        <input className="form-control input-rounded" type="text"
                                            id="lokasi_desa"
                                            name="lokasi_desa"
                                            onChange={changeValue}
                                            value={setting.lokasi_desa}
                                        />
                                        <small className='text-danger'>{error.lokasi_desa}</small>
                                    </div>
                                    <div className="form-group">
                                        <label className='font-bold'>Email Desa</label>
                                        <input className="form-control input-rounded" type="text"
                                            id="email_desa"
                                            name="email_desa"
                                            onChange={changeValue}
                                            value={setting.email_desa}
                                        />
                                        <small className='text-danger'>{error.email_desa}</small>
                                    </div>
                                    <div className='row'>
                                        <div className="col-sm-6 form-group">
                                            <label className='font-bold'>Nomor Hp 1</label>
                                            <input className="form-control input-rounded" type="number"
                                                id="nomor_hp1"
                                                name="nomor_hp1"
                                                onChange={changeValue}
                                                value={setting.nomor_hp1}
                                            />
                                            <small className='text-danger'>{error.nomor_hp1}</small>
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label className='font-bold'>Nomor Hp 2</label>
                                            <input className="form-control input-rounded" type="number"
                                                id="nomor_hp2"
                                                name="nomor_hp2"
                                                onChange={changeValue}
                                                value={setting.nomor_hp2}
                                            />
                                            <small className='text-danger'>{error.nomor_hp2}</small>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-sm-6 form-group">
                                            <label className='font-bold'>Link Facebook</label>
                                            <input className="form-control input-rounded" type="text"
                                                id="link_fb"
                                                name="link_fb"
                                                onChange={changeValue}
                                                value={setting.link_fb}
                                            />
                                            <small className='text-danger'>{error.link_fb}</small>
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label className='font-bold'>Link Twitter</label>
                                            <input className="form-control input-rounded" type="text"
                                                id="link_twitter"
                                                name="link_twitter"
                                                onChange={changeValue}
                                                value={setting.link_twitter}
                                            />
                                            <small className='text-danger'>{error.link_twitter}</small>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-sm-6 form-group">
                                            <label className='font-bold'>Link Instagram</label>
                                            <input className="form-control input-rounded" type="text"
                                                id="link_ig"
                                                name="link_ig"
                                                onChange={changeValue}
                                                value={setting.link_ig}
                                            />
                                            <small className='text-danger'>{error.link_ig}</small>
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label className='font-bold'>Link Youtube</label>
                                            <input className="form-control input-rounded" type="text"
                                                id="link_yt"
                                                name="link_yt"
                                                onChange={changeValue}
                                                value={setting.link_yt}
                                            />
                                            <small className='text-danger'>{error.link_yt}</small>
                                        </div>
                                    </div>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={updateSetting} className="genric-btn info radius small">Update</button>
                            </Modal.Footer>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

function ModalText(props) {
    const [text, setText] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false)

    const getText = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/text-beranda/edit/1`)
            setLoading(false)
            if (res.data.status === 200) {
                setText(res.data.textberanda);
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
        getText();
    }, [props])

    const changeValue = (e) => {
        e.persist();
        setText({ ...text, [e.target.name]: e.target.value });
    }

    const updateText = (e) => {
        e.preventDefault();
        axios.put(`/text-beranda/update/1`, {
            text_1: text.text_1,
            text_2: text.text_2,
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
                <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter font-bold">
                            Update Text Beranda
                        </Modal.Title>
                    </Modal.Header>
                    <div>
                        <form>
                            <Modal.Body className="show-grid">
                                <Container>
                                    <div className="form-group">
                                        <label className='font-bold'>Judul Text</label>
                                        <input className="form-control" type="text"
                                            id="text_1"
                                            name="text_1"
                                            onChange={changeValue}
                                            value={text.text_1}
                                        />
                                        <small className='text-danger'>{error.text_1}</small>
                                    </div>
                                    <div className="form-group">
                                        <label className='font-bold'>Isi Text</label>
                                        <textarea class="form-control" rows={3}
                                            id="text_2"
                                            name="text_2"
                                            onChange={changeValue}>
                                            {text.text_2}
                                        </textarea>
                                        <small className='text-danger'>{error.text_2}</small>
                                    </div>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={updateText} className="genric-btn info radius small">Update</button>
                            </Modal.Footer>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

function ModalImage(props) {
    const [image, setImage] = useState();
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleClose = () => ModalImage(false);

    const getImage = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/foto-beranda`)
            setLoading(false)
            setImage(res.data);
        }
        catch (err) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getImage();
    }, [props])

    const [picture, setPicture] = useState([]);

    const handleImage = (e) => {
        e.persist();
        setPicture({ image: e.target.files[0] })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Proccess...."
        const formData = new FormData();
        formData.append('image', picture.image)

        const result = await axios.post(`/foto-beranda/add`, formData)
        console.log(result)
        if (result?.data?.status === 200) {
            swal("Success", result.data.message, "success")
            window.location.reload()
        } else if (result?.data?.status === 422) {
            swal("Data Perlu di Isi", "", "error")
            thisClicked.innerText = "Proccess...."
            setError(result.data.errors);
        } 
    }

    if (loading === true) {
        return (
            <div>loading</div>
        )
    } else {
        return (
            <div>
                <Modal {...props} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter font-bold">
                            Foto Beranda
                        </Modal.Title>
                    </Modal.Header>
                    <div>
                        <form>
                            <Modal.Body className="show-grid">
                                <Container>
                                    <Row>
                                    <div className='col-lg-8'>
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
                                    </div>
                                    <div className='col-lg-4'>
                                    <button onClick={onSubmit} className="genric-btn info radius mt-4">Tambah Gambar</button>
                                    </div>
                                    </Row>
                                    <div className='row'>
                                    {image?.map((image, index) => (
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6" key={index}>
                                            <div className="single-gallery-image" >
                                            <img className='responsive' style={{ width: 200, height: 150 }}
                                            src={image.image} />
                                            </div>
                                        </div>
                                    ))}    
                                    </div>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={handleClose} className="genric-btn info radius small">Close</button>
                            </Modal.Footer>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}