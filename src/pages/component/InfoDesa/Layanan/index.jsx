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

export default function Layanan(props) {
    const [loading, setLoading] = useState(false);
    const [layanan, setLayanan] = useState();
    const moment = require('moment');

    const getLayanan = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/layanan`)
            setLoading(false)
            setLayanan(res.data)
        }
        catch (err) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getLayanan();
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
                                                                    <h3>Layanan Masyarakat</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="tab-content" id="nav-tabContent">
                                                                    <div className="tab-pane fade show active" id="nav-artikel" role="tabpanel" aria-labelledby="nav-artikel-tab">
                                                                        <div className="scroller" data-height="800">
                                                                            <div className="row">
                                                                            {layanan?.map((layanan, index) => (
                                                                                <div key={index} className="card-deck ml-2 col-xl-6 col-lg-6 col-md-6 mt-3">
                                                                                    <div className="card whats-news-single">
                                                                                        <div className='whates-img'>
                                                                                        <img className="card-img-top" src={layanan.image} />
                                                                                        </div>
                                                                                        <div className="card-body">
                                                                                        <h3 className='font-weight-bold'><a href={`/detail-layanan-masyarakat/${layanan.id}`}>{layanan.nama_layanan}</a></h3>
                                                                                            <div class="text-muted card-subtitle mt-1">By admin</div>
                                                                                            <p dangerouslySetInnerHTML={{ __html: layanan.isi_layanan.substr(0, 300) }} />
                                                                                        </div>
                                                                                        <div className="card-footer">
                                                                                            <span className="pull-right text-muted font-13">Di Update pada {moment(layanan.updated_at).fromNow()}</span>
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