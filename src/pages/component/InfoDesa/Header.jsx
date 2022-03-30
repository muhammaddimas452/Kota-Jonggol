import React from 'react'
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

import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'


export default function Header() {
    return (
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
                                    <input type="text" className="form-control pl-3" placeholder="Search" />
                                    <button type="submit" placeholder className="form-control search"><span className="fa fa-search" /></button>
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
                                            <a className="dropdown-item font-weight-bold " href="/sejarah">Sejarah Desa</a>
                                            <a className="dropdown-item font-weight-bold " href="/visimisi">Visi Dan Misi</a>
                                            <a className="dropdown-item font-weight-bold " href="/pemerintah">Pemerintah Desa</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                </div>
            </div>
        </header>
    )
}