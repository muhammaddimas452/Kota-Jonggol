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
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-solid-svg-icons";

export default function Header(props) {
    const api = 'http://127.0.0.1:8000/api'
    const [artikel, setArtikel] = useState([]);

    const getArtikel = async () => {
        try {
            const res = await axios.get(api + `/artikel/paginate?perpage=6`,)
            setArtikel(res.data.data.data)
        }
        catch (err) {
        }
    }

    useEffect(() => {
        getArtikel();
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
                                    <span className="fa fa-bars" /> Menu
                                </button>
                                <form action="#" className="searchform order-lg-last">
                                    <div className="form-group d-flex">
                                    </div>
                                </form>
                                <div className="collapse navbar-collapse" id="ftco-nav">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item font-weight-bold "><a href="/home" className="nav-link"><h6>Beranda</h6></a></li>
                                        <li className="nav-item font-weight-bold "><a href="/informasi" className="nav-link"><h6>Informasi Wilayah</h6></a></li>
                                        <li className="nav-item font-weight-bold "><a href="/pemerintah" className="nav-link"><h6>Pemerintah Desa</h6></a></li>
                                        <li className="nav-item font-weight-bold "><a href="/peta" className="nav-link"><h6>Peta</h6></a></li>
                                        <li className="nav-item font-weight-bold "><a href="/galeri" className="nav-link"><h6>Galeri</h6></a></li>
                                        <li className="nav-item dropdown font-weight-bold ">
                                            <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><h6>Page</h6></a>
                                            <div className="dropdown-menu" aria-labelledby="dropdown04">
                                                {artikel?.map((artikel, index) => (
                                                    <a key={index} className="dropdown-item font-weight-bold " href={`/detail/${artikel.id}`}>{artikel.nama_artikel}</a>
                                                    // {/* <a className="dropdown-item font-weight-bold " href="/visimisi">Visi Dan Misi</a>
                                                    // <a className="dropdown-item font-weight-bold " href="/pemerintah">Pemerintah Desa</a> */}
                                                ))}
                                            </div>
                                        </li>
                                        <li className="nav-item font-weight-bold">
                                        <div class="mt-2 ml-5 col d-flex justify-content-end">
                                            <div class="social-media">
                                                <p class="mb-0 d-flex">
                                                    <a href="#" class="text-white d-flex align-items-center justify-content-center"><i class="ti-facebook"></i></a>
                                                    <a href="#" class="text-white d-flex align-items-center justify-content-center"><i class="ti-twitter"></i></a>
                                                    <a href="#" class="text-white d-flex align-items-center justify-content-center"><i class="ti-instagram"></i></a>
                                                    <a href="#" class="text-white d-flex align-items-center justify-content-center"><i class="ti-youtube"></i></a>
                                                </p>
                                            </div>
                                        </div>
                                        </li>
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