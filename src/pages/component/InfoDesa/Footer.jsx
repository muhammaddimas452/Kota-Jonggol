import React, { useState, useEffect } from 'react'
import axios from '../../../api/axiosClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";



export default function Footer(props) {
    const [populer, setPopuler] = useState();
    const [info, setInfo] =useState([]);
    const getPopuler = async () => {
        try {
            const res = await axios.get(`/artikel/mostview?perpage=3`,)
            setPopuler(res.data.data.data)
        }
        catch (err) {
        }
    }

    const getInfo = async () =>{
        
        try{
            const res = await axios.get('/info/edit/1')
            setInfo(res.data.info)
        }
        catch (err) {
        }      
    }

    useEffect(() => {
        getPopuler();
        getInfo();
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
                                                    <p className="info2"><FontAwesomeIcon icon={faLocationDot} className='mr-2' />{info.lokasi_desa}</p>
                                                    <p className="info2"><FontAwesomeIcon icon={faEnvelope} className='mr-2' />{info.email_desa}</p>
                                                    <p className="info2"><FontAwesomeIcon icon={faPhone} className='mr-2' />{info.nomor_hp1}</p>
                                                    <p className="info2"><FontAwesomeIcon icon={faPhone} className='mr-2' />{info.nomor_hp2}</p>
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
                                    <div className="footer-tittle">
                                            <h4>Kunjungi Sosmed Kami</h4>
                                        </div>
                                        <div className="banner text-center">
                                            {/* <img src={logo} style={{ width: 200, height: 'auto' }} alt /> */}
                                            <div class="social-media">
                                                <p class="mb-0 d-flex">
                                                    <a href={info.link_fb} class="text-white d-flex align-items-center justify-content-center p-4"><i class="ti-facebook"></i></a>
                                                    <a href={info.link_twitter} class="text-white d-flex align-items-center justify-content-center p-4"><i class="ti-twitter"></i></a>
                                                    <a href={info.link_ig} class="text-white d-flex align-items-center justify-content-center p-4"><i class="ti-instagram"></i></a>
                                                    <a href={info.link_yt} class="text-white d-flex align-items-center justify-content-center p-4"><i class="ti-youtube"></i></a>
                                                </p>
                                            </div>
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
                <div className="to-top mr-5"><FontAwesomeIcon icon={faArrowUp} className="text-dark" /></div>
            </footer>
        </div>
    )
}