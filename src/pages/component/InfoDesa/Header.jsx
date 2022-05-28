import React, { useState, useEffect } from 'react'
import "../css/bootstrap.min.css";
import "../css/owl.carousel.min.css";
import "../css/ticker-style.css";
import "../css/flaticon.css"
import "../css/slicknav.css"
import "../css/animate.min.css"
import "../css/magnific-popup.css"
import "../css/fontawesome-all.min.css"
import "../css/themify-icons.css"
import "../css/slick.css"
import "../css/nice-select.css"
import "../css/style.css"
import "../css/css/style.css"
import logo from '../assets/jonggol.png'
import axios from '../../../api/axiosClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function Header(props) {
    const [artikel, setArtikel] = useState([]);
    const [potensi, setPotensi] = useState();

    const getArtikel = async () => {
        try {
            const res = await axios.get(`/artikel`,)
            setArtikel(res.data)
        }
        catch (err) {
        }
    }

    const getPotensi = async () => {
        try {
            const res = await axios.get(`/artikel-potensi`)
            setPotensi(res.data)
        }
        catch (err) {
        }
    }

    useEffect(() => {
        getArtikel();
        getPotensi();
    }, [props])

    return (
        <div>
            <header>
                <div className="header-area">
                    <div className="main-header ">
                        <div className="header-mid gray-bg">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="logo d-md-block ml-5">
                                        <a href="/home"><img src={logo} style={{ width: 70, height: 80 }} alt /></a>
                                    </div>
                                    <div className="header-banner ml-5 d-md-block">
                                        <h3>Website Desa Jonggol</h3>
                                        <h5>Kec. Jonggol, Kabupaten Bogor, Jawa Barat</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav className="navbar navbar-expand-lg navbar-green ftco_navbar bg-green ftco-navbar-light" id="ftco-navbar">
                            <div className="container">
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                                <FontAwesomeIcon icon={faBars} className='mr-2' /> Menu
                                </button>
                                <div className="collapse navbar-collapse" id="ftco-nav">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item font-weight-bold ml-3"><a href="/home" className="nav-link"><h6>Beranda</h6></a></li>
                                        <li className="nav-item dropdown font-weight-bold ml-3">
                                            <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><h6>Profile <FontAwesomeIcon icon={faCaretDown} className='mr-2' /></h6></a>
                                            <div className="dropdown-menu" aria-labelledby="dropdown04">
                                                {artikel?.map((artikel, index) => (
                                                    <a key={index} className="dropdown-item font-weight-bold " href={`/detail-profile/${artikel.id}`}>{artikel.nama_artikel}</a>
                                               ))}
                                                    <a className="dropdown-item font-weight-bold " href="/pemerintah">Pemerintah Desa</a>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown font-weight-bold ml-3">
                                            <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><h6>Informasi <FontAwesomeIcon icon={faCaretDown} className='mr-2' /></h6></a>
                                            <div className="dropdown-menu" aria-labelledby="dropdown04">
                                                <a className="dropdown-item font-weight-bold " href="/informasi-wilayah">Informasi Wilayah</a>
                                                <a className="dropdown-item font-weight-bold " href="/layanan-masyarakat">Informasi Layanan</a>
                                                <a className="dropdown-item font-weight-bold " href="/umkm">UMKM</a>
                                                <a className="dropdown-item font-weight-bold " href="/galeri">Galeri</a>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown font-weight-bold ml-3">
                                            <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><h6>Potensi <FontAwesomeIcon icon={faCaretDown} className='mr-2' /></h6></a>
                                            <div className="dropdown-menu" aria-labelledby="dropdown04">
                                                {potensi?.map((potensi, index) => (
                                                    <a key={index} className="dropdown-item font-weight-bold " href={`/detail-potensi/${potensi.id}`}>{potensi.nama_potensi}</a>
                                               ))}
                                            </div>
                                        </li>
                                        <li className="nav-item font-weight-bold ml-3"><a href="/kegiatan" className="nav-link"><h6>Kegiatan <FontAwesomeIcon className='mr-2' /></h6></a></li>
                                        <li className="nav-item font-weight-bold ml-3"><a href="/berita" className="nav-link"><h6>Berita</h6></a></li>
                                        <li className="nav-item font-weight-bold ml-3"><a href="/peta" className="nav-link"><h6>Peta</h6></a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    )
}