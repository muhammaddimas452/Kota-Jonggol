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
import "../../css/style.css"

import Header from '../Header';
import Footer from '../Footer';
import Aside from '../Aside';
import axios from '../../../../api/axiosClient'
import logo from '../../assets/jonggol.png'

export default function UMKM(props) {
    const [umkm, setUmkm] = useState();
    const moment = require('moment');
    const [loading, setLoading] = useState(false);

    const getUmkm = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/data-umkm`)
            setLoading(false)
            setUmkm(res.data)
        }
        catch (err) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUmkm();
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
                                            <div className="col-lg-12">
                                                <div className="whats-news-wrapper">
                                                    <div className="row mb-15">
                                                        <div className="col-xl-12 col-md-12">
                                                            <div className="section-tittle mb-30 text-center">
                                                                <h3>Data UMKM (Usaha Mikro Kecil dan Menengah)</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="tab-content" id="nav-tabContent">
                                                                <div className="tab-pane fade show active" id="nav-artikel" role="tabpanel" aria-labelledby="nav-artikel-tab">
                                                                    <div className="scroller" data-height="800">
                                                                        <div className="row">
                                                                            {umkm?.map((umkm, index) => (
                                                                                <div key={index} className="col-xl-6 col-lg-6 col-md-6">
                                                                                    <div className="whats-news-single mb-40">
                                                                                        <div className="whates-img">
                                                                                            <img src={umkm.image} style={{ height: 180 }} />
                                                                                        </div>
                                                                                        <div className="whates-caption whates-caption2 font-weight-bold">
                                                                                            <h4><a href={`/detail-umkm/${umkm.id}`}>{umkm.nama_usaha}</a></h4>
                                                                                            <span>Di Update {moment(umkm.updated_at).fromNow()} 
                                                                                            
                                                                                            </span>
                                                                                            <p dangerouslySetInnerHTML={{ __html: umkm.isi_usaha.substr(0, 300) }} />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
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