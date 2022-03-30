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
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'

export default function Galeri(props) {
    const api = 'http://127.0.0.1:8000/api'
    const [artikel, setArtikel] = useState();
    const [kegiatan, setKegiatan] = useState();

    const getArtikel = async () => {
        try {
            const res = await axios.get(api + `/artikel`)
            console.log(res.data)
            setArtikel(res.data)
        }
        catch (err) {
        }
    }
   

    const getKegiatan = async () => {
        try {
            const res = await axios.get(api + `/kegiatan`)
            console.log(res.data)
            setKegiatan(res.data)
        }
        catch (err) {
        }
    }
    useEffect(() => {
        getArtikel();
        getKegiatan();
    }, [props])

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
                                <img style={{ height:200, width:450 }} src={"http://localhost:8000/" + kegiatan.image} alt="" />
                            </div>
                        </a>
                    </div>
                    ))}
                    {artikel?.map((artikel, index) => (
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6" key={index}>
                        <a href="" className="img-pop-up">
                            <div className="single-gallery-image">
                                <img style={{ height:200, width:450 }} src={"http://localhost:8000/" + artikel.image} alt="" />
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