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

import Header from '../Header';
import Footer from '../Footer';
import Aside from '../Aside';
import axios from '../../../../api/axiosClient'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-bootstrap';
import logo from '../../assets/jonggol.png';
import bg from '../../assets/section_bg02.jpg'

export default function Home(props) {
    const [artikel, setArtikel] = useState([]);
    const [kegiatan, setKegiatan] = useState();
    const [kegiatanDone, setKegiatanDone] = useState([]);
    const [kegiatanNot, setKegiatanNot] = useState([]);
    const [jumlahPendudukInput, setJumlahPenduduk] = useState();
    const [image, setImage] = useState();
    const [text, setText] = useState([]);
    const [loading, setLoading] = useState(false);
    const moment = require('moment');
    const getJumlahPenduduk = async () => {
        try {
            const res = await axios.get(`/jumlah-penduduk`)
            setJumlahPenduduk(res.data)
        }
        catch (err) {
        }
    }

    const getArtikel = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/artikel`)
            setLoading(false)
            setArtikel(res.data)
        }
        catch (err) {
            setLoading(false)
        }
    }

    const getKegiatanDone = async () => {
        try {
            const res = await axios.get(`/kegiatan-done/paginate?perpage=6`,)
            setKegiatanDone(res.data.data.data)
        }
        catch (err) {
        }
    }

    const getKegiatanNot = async () => {
        try {
            const res = await axios.get(`/kegiatan-not/paginate?perpage=6`,)
            setKegiatanNot(res.data.data.data)
        }
        catch (err) {
        }
    }

    const getKegiatan = async () => {
        try {
            const res = await axios.get(`/kegiatan`)
            setKegiatan(res.data)
        }
        catch (err) {
        }
    }

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

    const getText = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/text-beranda/edit/1`)
            setLoading(false)
            if (res.data.status === 200) {
                setText(res.data.textberanda);
            } else if (res.data.status === 404) {

            }
        }
        catch (err) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getJumlahPenduduk();
        getArtikel();
        getKegiatan();
        getKegiatanDone();
        getKegiatanNot();
        getImage();
        getText();
    }, [props])

    if (loading === true) {
        return (
            <div id="preloader-active">
                <div className="preloader d-flex align-items-center justify-content-center">
                    <div className="preloader-inner position-relative">
                        <div className="preloader-circle" />
                        <div className="preloader-img pere-text">
                            <img src={logo} alt />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Header />
                <div className="support-company-area pt-110 pb-110 pl-75 pr-75 section-bg fix bg-dark">
                    <div className="">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-6">
                                <Carousel fade={true} pause={false} controls={false} indicators={false} >
                                {image?.map((image, index) => (
                                        <Carousel.Item interval={5000} key={index.id}>
                                            <div className="support-location-img">
                                                <img src={image.image} alt style={{height:450}} />
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="right-caption">
                                    {/* Section Tittle */}
                                    <div className="section-tittles section-tittles2 mb-50">
                                        <h2 className=''>{text.text_1}</h2>
                                    </div>
                                    <div className="support-caption">
                                        <p className="pera-top">{text.text_2}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <main>
                    <div className="trending-area fix pt-25 gray-bg mb-5">
                        <div className="container">
                            <div className="trending-main">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="trending-area fix">
                                            <div className="trending-main">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <Carousel fade={true} pause={false} controls={false} indicators={false} >
                                                            {kegiatan?.map((kegiatan, index) => (
                                                                <Carousel.Item interval={5000} key={index.id}>
                                                                    <div className="single-slider">
                                                                        <div className="trending-top mb-30">
                                                                            <div className="trend-top-img">
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
                                        <div className="whats-news-area">
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
                                                                        <div className="scroller" data-height="800">
                                                                            <div className="row">
                                                                                {artikel?.map((artikel, index) => (
                                                                                    <div key={index} className="col-xl-6 col-lg-6 col-md-6">
                                                                                        <div className="whats-news-single mb-40 mb-40">
                                                                                            <div className="whates-img">
                                                                                                <img src={artikel.image} style={{ height: 180 }} />
                                                                                            </div>
                                                                                            <div className="whates-caption whates-caption2">
                                                                                                <h4><a href={`/detail-profile/${artikel.id}`}>{artikel.nama_artikel}</a></h4>
                                                                                                <span>Di Update {moment(artikel.updated_at).fromNow()}</span>
                                                                                                <p dangerouslySetInnerHTML={{ __html: artikel.isi_artikel.substr(0, 300) }} />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
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
                                    <div className='col-lg-4'>
                                        <Aside />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}