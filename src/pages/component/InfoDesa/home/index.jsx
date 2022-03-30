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
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-bootstrap';

export default function Home(props) {
    const api = 'http://127.0.0.1:8000/api'
    const [artikel, setArtikel] = useState([]);

    const [kegiatan, setKegiatan] = useState();
    const [jumlahPendudukInput, setJumlahPenduduk] = useState();
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
            const res = await axios.get(api + `/artikel/paginate?perpage=6`,)
            setArtikel(res.data.data.data)
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
    }, [props])


    return (
        <div>
            <Header />
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
                                                                            <img src={"http://localhost:8000/" + kegiatan.image} alt="" />
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
                                                    <div className="row justify-content-between align-items-end mb-15">
                                                        <div className="col-xl-4">
                                                            <div className="section-tittle mb-30 text-center">
                                                                <h2>Artikel Desa</h2>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-8 col-md-9">
                                                            <div className="properties__button">
                                                                <nav>
                                                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                                        {/* <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Lifestyle</a>
                                                                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Travel</a>
                                                                        <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Fashion</a>
                                                                        <a className="nav-item nav-link" id="nav-last-tab" data-toggle="tab" href="#nav-last" role="tab" aria-controls="nav-contact" aria-selected="false">Sports</a>
                                                                        <a className="nav-item nav-link" id="nav-Sports" data-toggle="tab" href="#nav-nav-Sport" role="tab" aria-controls="nav-contact" aria-selected="false">Technology</a> */}
                                                                    </div>
                                                                </nav>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="tab-content" id="nav-tabContent">
                                                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                                    <div className="row">
                                                                        {artikel?.map((artikel, index) => (
                                                                            console.log(artikel.id),
                                                                            <div key={index} className="col-xl-6 col-lg-6 col-md-6">
                                                                                <div className="whats-news-single mb-40 mb-40">
                                                                                    <div className="whates-img">
                                                                                        <img src={"http://localhost:8000/" + artikel.image} style={{ height:180}} />
                                                                                    </div>
                                                                                    <div className="whates-caption whates-caption2">
                                                                                        <h4><a href={`/detail/${artikel.id}`}>{artikel.nama_artikel}</a></h4>
                                                                                        <span>Di Update Pada {artikel.tanggal}</span>
                                                                                        <p dangerouslySetInnerHTML={{ __html: artikel.isi_artikel }} />
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