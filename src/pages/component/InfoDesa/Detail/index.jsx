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
import { Table } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import axios from 'axios'
import swal from 'sweetalert'

export default function Detail(props) {
    const api = 'http://127.0.0.1:8000/api';
    const { id } = useParams()

    const [artikel, setArtikel] = useState([]);
    const navigate = useNavigate();
    const getArtikel = async () => {
        try {
            const artikel_id = id;
            const res = await axios.get(api + `/artikel/${artikel_id}`)
            if (res.data.status === 200) {
                setArtikel(res.data.artikel);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/home");
            }
        }
        catch (err) {
            return navigate("/home");
        }
    }
    useEffect(() => {
        getArtikel();
    }, [props])

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
                                    <img className="img-fluid" src={"http://localhost:8000/" + artikel.image} alt />
                                </div>
                                <div className="blog_details">
                                    <h2>{artikel.nama_artikel}
                                    </h2>
                                    <ul className="blog-info-link mt-3 mb-4">
                                        <li><a href="#"><i className="fa fa-user" />{artikel.tanggal}</a></li>
                                        <li><a href="#"><i className="fa fa-eye" />{artikel.views}</a></li>
                                    </ul>
                                    <p className="excert" dangerouslySetInnerHTML={{ __html: artikel.isi_artikel }} />
                                    <p>
                                        MCSE boot camps have its supporters and its detractors. Some people do not understand why you
                                        should have to spend money on boot camp when you can get the MCSE study materials yourself at a
                                        fraction of the camp price. However, who has the willpower to actually sit through a
                                        self-imposed MCSE training. who has the willpower to actually
                                    </p>
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