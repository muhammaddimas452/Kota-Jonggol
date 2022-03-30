import React from 'react';
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

import Header from '../Header'
import Footer from '../Footer'


export default function Peta() {
    return (
        <div>
            <Header />
            <main>
                <div className="gray-bg">
                    <div className='mt-20 text-center'>
                        <h2 className='font-weight-bold'>PETA LOKASI GEOGRAFIS DESA JONGGOL</h2>
                    </div>
                    <div className="">
                        <iframe className='col-lg-12 col-sm-12 mt-2 pl-5 pr-5 mb-5' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63429.309783856195!2d107.00892233512408!3d-6.4795862499880315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69bc0d7468736b%3A0x401576d14fed560!2sJonggol%2C%20Kec.%20Jonggol%2C%20Kabupaten%20Bogor%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1646205215963!5m2!1sid!2sid"
                        style={{height:500, border: 0 }} allowFullScreen loading="lazy" />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}