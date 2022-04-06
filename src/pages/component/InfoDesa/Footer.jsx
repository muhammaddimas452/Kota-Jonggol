import React, { useState, useEffect } from 'react'
import logo from '../assets/jonggol.png'
import axios from '../../../api/axiosClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";


export default function Footer(props) {
    const [populer, setPopuler] = useState();
    const getPopuler = async () => {
        try {
            const res = await axios.get(`/artikel/mostview?perpage=3`,)
            setPopuler(res.data.data.data)
        }
        catch (err) {
        }
    }

    useEffect(() => {
        getPopuler();
    }, [props])

    return (
        <div>
            <footer>
                {/* Footer Start*/}
                <div className="footer-main footer-bg">
                    <div className="footer-area footer-padding">
                        <div className="container">
                            <div className="row d-flex justify-content-between">
                                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                                    <div className="single-footer-caption mb-50">
                                    <div className="footer-tittle">
                                            <h4>Info Lebih Lanjut</h4>
                                        </div>
                                        <div className="single-footer-caption mb-30">
                                            <div className="footer-tittle">
                                                <div className="footer-pera">
                                                    <p className="info1"><FontAwesomeIcon icon={faEnvelope} className='mr-2' />Kec. Jonggol Kabupaten Bogor Jawa Barat</p>
                                                    <p className="info2"><FontAwesomeIcon icon={faLocationDot} className='mr-2' />Email: ????</p>
                                                    <p className="info2"><FontAwesomeIcon icon={faPhone} className='mr-2' />Phone: +95 (0) 123 456 789 </p>
                                                    <p className="info2"><FontAwesomeIcon icon={faPhone} className='mr-2' />Cell: +95 (0) 123 456 789</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                                    <div className="single-footer-caption mb-50">
                                        <div className="footer-tittle">
                                            <h4>Artikel Populer</h4>
                                        </div>
                                        {/* Popular post */}
                                        {populer?.map((populer, index) => (
                                        <div key={index} className="whats-right-single mb-20">
                                            <div className="whats-right-img">
                                                <img src={populer.image} style={{width:100, height:'auto'}} alt="post" />
                                            </div>
                                            <div className="whats-right-cap">
                                                <h4><a href={`/detail/${populer.id}`}>{populer.nama_artikel}</a></h4>
                                                <p>Admin  | {populer.tanggal}</p>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-3">
                                    <div className="single-footer-caption mb-50">
                                        <div className="banner text-center">
                                            <img src={logo} style={{ width: 200, height: 'auto' }} alt />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom-area footer-bg">
                        <div className="container">
                            <div className="footer-border">
                                <div className="row d-flex align-items-center">
                                    <div className="col-xl-12 ">
                                        <div className="footer-copy-right text-center">
                                            <p> Copyright © All rights reserved</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="to-top mr-5"><i className="fa fa-angle-double-up" /></div>
            </footer>
        </div>
    )
}