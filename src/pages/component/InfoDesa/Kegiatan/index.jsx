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
import { Carousel } from 'react-bootstrap';
import logo from '../../assets/jonggol.png'

export default function Berita(props) {
    const [kegiatanDone, setKegiatanDone] = useState([]);
    const [kegiatanNot, setKegiatanNot] = useState([]);
    const moment = require('moment');
    const [loading, setLoading] = useState(false);

    const getKegiatanDone = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/kegiatan-done/paginate?perpage=6`,)
            setLoading(false)
            setKegiatanDone(res.data.data.data)
        }
        catch (err) {
            setLoading(false)
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

    useEffect(() => {
        getKegiatanDone();
        getKegiatanNot();
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
            <main>
                <div className="trending-area fix pt-25 gray-bg mb-5">
                    <div className="container">
                        <div className="trending-main">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="weekly2-news-area pb-30 gray-bg">
                                        <div className="weekly2-wrapper">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="slider-wrapper">
                                                        <div className="row">
                                                            <div className="col-xl-12 col-md-12">
                                                                <div className="section-tittle mb-30 text-center">
                                                                    <h3>Kegiatan Akan Datang</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="weekly2-news-active d-flex">
                                                                    <div className="scroller" data-height="580">
                                                                        <div className='row'>
                                                                            {kegiatanNot?.map((not, index) => (
                                                                                <div key={index} className="weekly2-single ml-5 col-xl-5 col-lg-4 col-sm-4 col-xs-5">
                                                                                    <div className="weekly2-img">
                                                                                        <img src={not.image} alt />
                                                                                    </div>
                                                                                    <div className="weekly2-caption">
                                                                                        <h4><a href="/kegiatan">{not.nama_kegiatan}</a></h4>
                                                                                        <p>Di Laksanakan Pada {not.tanggal}</p>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly2-news-area pb-30 gray-bg">
                                        <div className="weekly2-wrapper">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="slider-wrapper">
                                                        <div className="row">
                                                            <div className="col-xl-12 col-md-12">
                                                                <div className="section-tittle mb-30 text-center">
                                                                    <h3>Kegiatan Selesai</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="weekly2-news-active d-flex">
                                                                    <div className="scroller" data-height="580">
                                                                        <div className='row'>
                                                                            {kegiatanDone?.map((done, index) => (
                                                                                <div key={index} className="weekly2-single ml-5 col-xl-5 col-lg-4 col-sm-4 col-xs-5">
                                                                                    <div className="weekly2-img">
                                                                                        <img src={done.image} alt />
                                                                                    </div>
                                                                                    <div className="weekly2-caption">
                                                                                        <h4><a href="/kegiatan">{done.nama_kegiatan}</a></h4>
                                                                                        <p>Di Laksanakan Pada {done.tanggal}</p>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
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
                </div>
            </main>
            <Footer />
        </div>
    )
}
}