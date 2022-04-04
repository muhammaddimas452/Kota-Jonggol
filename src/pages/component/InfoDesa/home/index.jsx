import React, { useState, useEffect } from 'react'
import "../../css/bootstrap.min.css";
import "../../css/owl.carousel.min.css";
import "../../css/ticker-style.css";
import "../../css/flaticon.css"
import "../../css/slicknav.css"
import "../../css/animate.min.css"
import "../../css/magnific-popup.css"
import "../../css/fontawesome-all.min.css"
import "../../css/themify-icons.css"
import "../../css/slick.css"
import "../../css/nice-select.css"
import "../../css/style.css"
import logo from '../../assets/jonggol.png'

import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

import Header from '../Header';
import Footer from '../Footer';
import Aside from '../Aside';
import axios from 'axios';
import { useParams } from 'react-router';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-bootstrap';

export default function Home(props) {
    const api = 'http://127.0.0.1:8000/api'
    const [artikel, setArtikel] = useState([]);
    const [paginate, setPaginate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState();
    const [totalPage, setTotalPage] = useState([]);
    const [kegiatan, setKegiatan] = useState();
    const [kegiatanDone, setKegiatanDone] = useState([]);
    const [kegiatanNot, setKegiatanNot] = useState([]);
    const [search, setSearch] = useState("");
    const [jumlahPendudukInput, setJumlahPenduduk] = useState();
    const moment = require('moment');
    const getJumlahPenduduk = async () => {
        try {
            const res = await axios.get(api + `/jumlah-penduduk`)
            setJumlahPenduduk(res.data)
        }
        catch (err) {
        }
    }

    const getArtikel = async () => {
        try {
            const res = await axios.get(api + `/artikel/paginate?perpage=1&page=${page}`,)
            setPaginate(res.data.data.data)
            setLastPage(res.data.data.last_page)
            setPage(res.data.data.current_page)
            setTotalPage(res.data.data.links.label)
        }
        catch (err) {
        }
    }

    const getKegiatanDone = async () => {
        try {
            const res = await axios.get(api + `/kegiatan-done/paginate?perpage=6`,)
            setKegiatanDone(res.data.data.data)
        }
        catch (err) {
        }
    }

    const getKegiatanNot = async () => {
        try {
            const res = await axios.get(api + `/kegiatan-not/paginate?perpage=6`,)
            setKegiatanNot(res.data.data.data)
        }
        catch (err) {
        }
    }

    const getKegiatan = async () => {
        try {
            const res = await axios.get(api + `/kegiatan`)
            setKegiatan(res.data)
        }
        catch (err) {
        }
    }

    useEffect(() => {
        getJumlahPenduduk();
        getArtikel();
        getKegiatan();
        getKegiatanDone();
        getKegiatanNot();
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
                                        <input
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                            }}
                                            type="text"
                                            className="form-control pl-3"
                                            placeholder="Cari Artikel"
                                        />
                                        <button type="button" placeholder className="form-control search"><span className="fa fa-search" /></button>
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
                                    </ul>
                                </div>
                            </div>
                        </nav>

                    </div>
                </div>
            </header>
            <main>
                <div className="trending-area fix pt-25 gray-bg mb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="trending-area fix">
                                    <div className="container">
                                        <div className="trending-main">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <Carousel fade={true} pause={false} controls={false} indicators={false} >
                                                        {kegiatan?.map((kegiatan, index) => (
                                                            <Carousel.Item interval={5000} key={index.id}>
                                                                <div className="single-slider">
                                                                    <div className="trending-top mb-30">
                                                                        <div className="trend-top-img">
                                                                            {/* <img src="assets/img/trending/trending_top2.jpg" alt /> */}
                                                                            <img src={kegiatan.image} alt="" />
                                                                            <div className="trend-top-cap pt-5">
                                                                                <span className="bgg" data-animation="fadeInUp" data-delay=".2s" data-duration="1000ms">{kegiatan.status == 0 ? "Belum Dilaksanakan" : "Sudah Dilaksakan"}</span>
                                                                                <h2><a href="latest_news.html" data-animation="fadeInUp" data-delay=".4s" data-duration="1000ms">{kegiatan.nama_kegiatan}</a></h2>
                                                                                <p data-animation="fadeInUp" data-delay=".6s" data-duration="1000ms">{kegiatan.tanggal}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Carousel.Item>
                                                        ))}
                                                    </Carousel>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="whats-news-area">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="whats-news-wrapper">
                                                    <div className="row mb-15">
                                                        <div className="col-xl-12 col-md-12">
                                                            <div className="section-tittle mb-30">
                                                                <h3>Artikel dan Kegiatan Desa</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-15">
                                                        <div className="col-xl-12 col-md-12">
                                                            <div className="">
                                                                <nav>
                                                                    <div className="nav nav-tabs font-weight-bold" id="nav-tab" role="tablist">
                                                                        <a className="nav-item nav-link font-weight-bold" id="nav-artikel-tab" data-toggle="tab" href="#nav-artikel" role="tab" aria-controls="nav-artikel" aria-selected="true">Artikel</a>
                                                                        <a className="nav-item nav-link font-weight-bold" id="nav-not-tab" data-toggle="tab" href="#nav-not" role="tab" aria-controls="nav-profile" aria-selected="false">Kegiatan Akan Datang</a>
                                                                        <a className="nav-item nav-link font-weight-bold" id="nav-done-tab" data-toggle="tab" href="#nav-done" role="tab" aria-controls="nav-contact" aria-selected="false">Kegiatan Selesai</a>
                                                                    </div>
                                                                </nav>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="tab-content" id="nav-tabContent">
                                                                <div className="tab-pane fade show active" id="nav-artikel" role="tabpanel" aria-labelledby="nav-artikel-tab">
                                                                    <div className="row">
                                                                        {paginate?.filter((artikel) => {
                                                                            if (search == "") {
                                                                                return artikel
                                                                            } else if (artikel.nama_artikel.toLowerCase().includes(search.toLowerCase())) {
                                                                                return artikel
                                                                            }
                                                                        }).map((artikel, index) => (
                                                                            <div key={index} className="col-xl-6 col-lg-6 col-md-6">
                                                                                <div className="whats-news-single mb-40 mb-40">
                                                                                    <div className="whates-img">
                                                                                        <img src={artikel.image} style={{ height: 180 }} />
                                                                                    </div>
                                                                                    <div className="whates-caption whates-caption2">
                                                                                        <h4><a href={`/detail/${artikel.id}`}>{artikel.nama_artikel}</a></h4>
                                                                                        <span>Di Update {moment(artikel.updated_at).fromNow()}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className="single-wrap">
                                                                        <nav aria-label="Page navigation example">
                                                                            <ul className="pagination justify-content-start">
                                                                                {/* <li className="page-item"><a className="page-link" href="#">
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="15px">
                                                                                                        <path fillRule="evenodd" fill="rgb(221, 221, 221)" d="M8.142,13.118 L6.973,14.135 L0.127,7.646 L0.127,6.623 L6.973,0.132 L8.087,1.153 L2.683,6.413 L23.309,6.413 L23.309,7.856 L2.683,7.856 L8.142,13.118 Z" />
                                                                                                    </svg>
                                                                                                </a></li> */}
                                                                                <li className="page-item"><a className="page-link" href="#">{page}</a></li>
                                                                                {/* <li className="page-item"><a className="page-link" href="#">
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40px" height="15px">
                                                                                                        <path fillRule="evenodd" fill="rgb(255, 11, 11)" d="M31.112,13.118 L32.281,14.136 L39.127,7.646 L39.127,6.624 L32.281,0.132 L31.167,1.154 L36.571,6.413 L0.491,6.413 L0.491,7.857 L36.571,7.857 L31.112,13.118 Z" />
                                                                                                    </svg>
                                                                                                </a></li> */}
                                                                            </ul>
                                                                        </nav>
                                                                    </div>
                                                                    {/* {(() => {
                                                            if (lastPage === 4) {
                                                                return (
                                                                    <div className="flex justify-center items-center sm-max:mt-5">
                                                                        <div className="text-2xl text-gray-400 mx-3">
                                                                            <MdOutlineNavigateBefore />
                                                                        </div>
                                                                        <div className="bg-gray-200 p-3 w-12 h-12 text-center shadow-inner shadow-slate-300 font-bahnschrift rounded-md">{page}</div>
                                                                        <div className="text-2xl text-gray-400 font-bold mx-3">
                                                                            <MdOutlineNavigateNext />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            } else {
                                                                return (
                                                                    <div className="flex justify-center items-center sm-max:mt-5">
                                                                        {page === 1 ? (
                                                                            <div className="text-2xl text-gray-400 mx-3">
                                                                                <MdOutlineNavigateBefore />
                                                                            </div>
                                                                        ) : (
                                                                            <div className="text-2xl text-blue-400 mx-3">
                                                                                <MdOutlineNavigateBefore />
                                                                            </div>
                                                                        )}
                                                                        <div className="bg-gray-200 p-3 w-12 h-12 text-center  font-bahnschrift rounded-md">{page}</div>
                                                                        {lastPage === page ? (
                                                                            <div className="text-2xl text-gray-400 font-bold mx-3">
                                                                                <MdOutlineNavigateNext />
                                                                            </div>
                                                                        ) : (
                                                                            <div className="text-2xl text-blue-400 font-bold mx-3">
                                                                                <MdOutlineNavigateNext />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )
                                                            }
                                                        })()} */}
                                                                </div>
                                                                <div className="tab-pane" id="nav-not" role="tabpanel" aria-labelledby="nav-not-tab">
                                                                    <div className="row">
                                                                        {kegiatanNot?.map((not, index) => (
                                                                            <div key={index} className="col-xl-6 col-lg-6 col-md-6">
                                                                                <div className="whats-news-single mb-40 mb-40">
                                                                                    <div className="whates-img">
                                                                                        <img src={not.image} style={{ height: 180 }} />
                                                                                    </div>
                                                                                    <div className="whates-caption whates-caption2">
                                                                                        <h4><a href="">{not.nama_kegiatan}</a></h4>
                                                                                        <span>Di Buat {moment(not.created_at).fromNow()}</span>
                                                                                        <p>Di Laksanakan Pada {not.tanggal}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="tab-pane" id="nav-done" role="tabpanel" aria-labelledby="nav-done-tab">
                                                                    <div className="row">
                                                                        {kegiatanDone?.map((done, index) => (
                                                                            <div key={index} className="col-xl-6 col-lg-6 col-md-6">
                                                                                <div className="whats-news-single mb-40 mb-40">
                                                                                    <div className="whates-img">
                                                                                        <img src={done.image} style={{ height: 180 }} />
                                                                                    </div>
                                                                                    <div className="whates-caption whates-caption2">
                                                                                        <h4><a href=''>{done.nama_kegiatan}</a></h4>
                                                                                        <span>Di buat pada {moment(done.created_at).fromNow()}</span>
                                                                                        <p>Di Laksanakan Pada {done.tanggal}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='justify-content-center d-flex'>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <Aside />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}