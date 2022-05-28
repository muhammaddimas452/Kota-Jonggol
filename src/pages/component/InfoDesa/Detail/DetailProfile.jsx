import React, { Component, useState, useEffect } from 'react'
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
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import axios from '../../../../api/axiosClient'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/jonggol.png'

export default function DetailProfile(props) {
    const { id } = useParams()
    const [loading, setLoading] = useState(false);
    const moment = require('moment');
    const [artikel, setArtikel] = useState([]);
    const navigate = useNavigate();
    const getArtikel = async () => {
        try {
            const artikel_id = id;
            setLoading(true)
            const res = await axios.get(`/artikel/${artikel_id}`)
            setLoading(false)
            if (res.data.status === 200) {
                setArtikel(res.data.artikel);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/home");
            }
        }
        catch (err) {
            setLoading(false)
            return navigate("/home");
        }
    }
    useEffect(() => {
        getArtikel();
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
    return(
        <div>
        <Header />
        <main>
            <div className="blog_area single-post-area gray-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mt-5">
                            <div className="single-post">
                                <div className="feature-img">
                                    <img className="img-fluid" src={artikel.image} alt />
                                </div>
                                <div className="blog_details">
                                    <h1 className='font-weight-bold'>{artikel.nama_artikel}</h1>
                                    <ul className="blog-info-link mt-3 mb-4">
                                        <li><a href="#"><FontAwesomeIcon icon={faUser} className='mr-2' />Admin</a></li>
                                        <li><a href="#"><FontAwesomeIcon icon={faPen} className='mr-2' />{moment(artikel.created_at).fromNow()}</a></li>
                                        <li><a href="#"><FontAwesomeIcon icon={faEye} className='mr-2' />{artikel.views}</a></li>
                                    </ul>
                                    <div className='quotes'> 
                                    <p className=" about-pera1" dangerouslySetInnerHTML={{ __html: artikel.isi_artikel }} />
                                    </div>
                                    <div className="quote-wrapper">
                                        <div className="quotes">
                                            MCSE boot camps have its supporters and its detractors. Some people do not understand why you
                                            should have to spend money on boot camp when you can get the MCSE study materials yourself at
                                            a fraction of the camp price. However, who has the willpower to actually sit through a
                                            self-imposed MCSE training.
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>
                        <div className='col-lg-4 mt-5'>
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
}