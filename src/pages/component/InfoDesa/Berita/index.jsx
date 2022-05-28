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
import logo from '../../assets/jonggol.png'

export default function Berita(props) {
    const [berita, setBerita] = useState();
    const [populer, setPopuler] = useState();
    const moment = require('moment');
    const [loading, setLoading] = useState(false);

    const getBerita = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/berita`)
            setLoading(false)
            setBerita(res.data)
        }
        catch (err) {
            setLoading(false)
        }
    }

    const getPopuler =  async () => {
        try {
            const res = await axios.get(`/berita/mostview?perpage=2`)
            setPopuler(res.data.data.data)
        }
        catch (err) {
        }
    }

    useEffect(() => {
        getBerita();
        getPopuler();
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
                                    <div className="whats-news-area">
                                        <div className="row">
                                            <div className="col-12">    
                                                <div className="whats-news-wrapper">
                                                    <div className="row mb-15">
                                                        <div className="col-xl-12 col-md-12">
                                                            <div className="section-tittle mb-30 text-center">
                                                                <h3>Berita Terkini</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="tab-content" id="nav-tabContent">
                                                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                                    <div className="row">
                                                                        <div className="col-xl-7 col-lg-7 col-xs-6 col-sm-6">
                                                                        {populer?.map((populer, index) => (
                                                                            <div key={index} className="whats-news-single mb-40 mb-40">
                                                                                <div className="whates-img">
                                                                                    <img src={populer.image} alt />
                                                                                </div>
                                                                                <div className="whates-caption">
                                                                                    <h4><a href={`/detail-berita/${populer.id}`}>{populer.nama_berita}</a></h4>
                                                                                    <span>by Admin   -   {moment(populer.created_at).fromNow()}</span>
                                                                                    <p dangerouslySetInnerHTML={{ __html: populer.isi_berita.substr(0, 300) }} />
                                                                                </div>
                                                                            </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className="col-xl-5 col-lg-5 col-xs-6 col-sm-6">
                                                                            <div className="row">
                                                                                <div className="">
                                                                                {berita?.map((berita, index) => (
                                                                                    <div key={index} className="whats-right-single mb-20">
                                                                                        <div className="whats-right-img col-lg-6 col-xs-6 col-sm-6">
                                                                                            <img src={berita.image} />
                                                                                        </div>
                                                                                        <div className="whats-right-cap col-lg-6 col-xs-6 col-sm-6">
                                                                                            <span className="colorb">By Admin</span>
                                                                                            <h4><a href={`/detail-berita/${berita.id}`}>{berita.nama_berita}</a></h4>
                                                                                            <p>{moment(berita.created_at).fromNow()}</p>
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