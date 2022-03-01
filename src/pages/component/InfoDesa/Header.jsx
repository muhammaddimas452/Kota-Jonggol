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


export default function Header() {
    return (
        <header>
            {/* Header Start */}
            <div className="header-area">
                <div className="main-header ">
                    <div className="header-top black-bg d-none d-sm-block">
                        <div className="container">
                            <div className="col-xl-12">
                                <div className="row d-flex justify-content-between align-items-center">
                                    <div className="header-info-left">
                                        <ul>
                                            <li className="title"><span className="flaticon-energy" /> trending-title</li>
                                            <li>Class property employ ancho red multi level mansion</li>
                                        </ul>
                                    </div>
                                    <div className="header-info-right">
                                        <ul className="header-date">
                                            <li><span className="flaticon-calendar" /> +880166 253 232</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-mid gray-bg">
                        <div className="container">
                            <div className="row align-items-center">
                                {/* Logo */}
                                {/* <div className="col-xl-3 col-lg-3 col-md-3 d-none d-md-block"> */}
                                    <div className="logo d-none d-md-block">
                                        <a href="/home"><img src="assets/img/logo/jonggol.png" style={{ width: 100, height: 100 }} alt /></a>
                                    </div>
                                {/* </div>
                                <div className="col-xl-9 col-lg-9 col-md-9"> */}
                                    <div className="header-banner ml-5">
                                        <h3>Website Jonggol</h3>
                                        <h5>Kec. Jonggol Kabupaten Bogor Jawa Barat</h5>
                                    </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="header-bottom header-sticky">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-xl-8 col-lg-8 col-md-12 header-flex">
                                    {/* sticky */}
                                    <div className="sticky-logo">
                                        <a href="/home"><img src="assets/img/logo/jonggol.png" style={{ width: 80, height: 80 }} alt /></a>
                                    </div>
                                    {/* Main-menu */}
                                    <div className="main-menu d-none d-md-block">
                                        <nav>
                                            <ul id="navigation">
                                                <li><a href="/home">Beranda</a></li>
                                                <li><a href="/informasi">Informasi Wilayah</a></li>
                                                <li><a href="/peta">Peta</a></li>
                                                <li><a href="/galeri">Galeri</a></li>
                                                <li><a href="#">Pages</a>
                                                    <ul className="submenu">
                                                        <li><a href="blog.html">Blog</a></li>
                                                        <li><a href="blog_details.html">Blog Details</a></li>
                                                        <li><a href="elements.html">Element</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="contact.html">Contact</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4">
                                    <div className="header-right f-right d-none d-lg-block">
                                        {/* Heder social */}
                                        <ul className="header-social">
                                            <li><a href="https://www.fb.com/sai4ull"><i className="fab fa-facebook-f" /></a></li>
                                            <li><a href="#"><i className="fab fa-twitter" /></a></li>
                                            <li><a href="#"><i className="fab fa-instagram" /></a></li>
                                            <li> <a href="#"><i className="fab fa-youtube" /></a></li>
                                        </ul>
                                        {/* Search Nav */}
                                        
                                    </div>
                                </div>
                                {/* Mobile Menu */}
                                <div className="col-12">
                                    <div className="mobile_menu d-block d-md-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Header End */}
        </header>
    )
}