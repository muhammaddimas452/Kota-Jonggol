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

import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'


export default function Header() {
    return (
        <header>
            <div className="header-area">
                <div className="main-header ">
                    <div className="header-mid gray-bg">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="logo d-none d-md-block ml-4">
                                    <a href="/home"><img src="assets/img/logo/jonggol.png" style={{ width: 80, height: 85 }} alt /></a>
                                </div>
                                <div className="header-banner ml-5 d-md-block">
                                    <h3>Website Jonggol</h3>
                                    <h5>Kec. Jonggol Kabupaten Bogor Jawa Barat</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='m-1'>
                        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
                            <Container>
                                <Navbar.Brand className='sticky-logo ml-2' href="#home"><img src="assets/img/logo/jonggol.png" className='ml-4' style={{ width: 50, height: 50 }} alt /></Navbar.Brand>
                                <Navbar.Toggle className='ml-4' aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto col-sm-8 col-lg-8 col-xl-8 col-md-8 m-3">
                                        <Navbar.Brand className='font-weight-bold ml-3' href="/home">BERANDA</Navbar.Brand>
                                        <Navbar.Brand className='font-weight-bold ml-3' href="/informasi">INFORMASI WILAYAH</Navbar.Brand>
                                        <Navbar.Brand className='font-weight-bold ml-3' href="/peta">PETA</Navbar.Brand>
                                        <Navbar.Brand className='font-weight-bold ml-3' href="/galeri">GALERI</Navbar.Brand>  
                                        <NavDropdown className='font-weight-bold ml-3' title="PAGE" id="collasible-nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">Sejarah Desa</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">Visi Dan Misi</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Pemerintah Desa</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>    
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>
                </div>
            </div>
        </header>
    )
}