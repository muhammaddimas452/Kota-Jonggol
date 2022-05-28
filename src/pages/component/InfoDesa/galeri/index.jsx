import React, { useState, useEffect } from 'react';
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

// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import axios from '../../../../api/axiosClient'
import Header from '../Header'
import Footer from '../Footer'
import logo from '../../assets/jonggol.png'

export default function Galeri(props) {
    const [artikel, setArtikel] = useState();
    const [kegiatan, setKegiatan] = useState();
    const [loading, setLoading] = useState(false);

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
   

    const getKegiatan = async () => {
        try {
            const res = await axios.get(`/kegiatan`)
            setKegiatan(res.data)
        }
        catch (err) {
        }
    }
    useEffect(() => {
        getArtikel();
        getKegiatan();
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
            <div className="section-top-border">
            <div className='mt-20 text-center'>
                        <h2 className='font-weight-bold'>GALERI DESA JONGGOL</h2>
                    </div>
                <div className="row gallery-item p-5 ml-5">
                    {kegiatan?.map((kegiatan, index) => (
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6" key={index}>
                        <a href="" className="img-pop-up">
                            <div className="single-gallery-image" >
                                <img style={{ height:200, width:450 }} src={kegiatan.image} alt="" />
                            </div>
                        </a>
                    </div>
                    ))}
                    {artikel?.map((artikel, index) => (
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6" key={index}>
                        <a href="" className="img-pop-up">
                            <div className="single-gallery-image">
                                <img style={{ height:200, width:450 }} src={artikel.image} alt="" />
                            </div>
                        </a>
                    </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}
}