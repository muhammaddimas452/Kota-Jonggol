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
import { Table } from 'react-bootstrap'
import axios from '../../../../api/axiosClient'

export default function Informasi(props) {
    const [jumlahPenduduk, setJumlahPenduduk] = useState();
    const [infoWilayah, setInfoWilayah] = useState();

    const getJumlahPenduduk = async () => {
        try{
            const res = await axios.get(`/jumlah-penduduk`)
            setJumlahPenduduk(res.data)
        }
        catch (err) {
        }
    }
    const getInfoWilayah = async () => {
        try {
            const res = await axios.get(`/infowilayah`,)
            setInfoWilayah(res.data)
        }
        catch (err) {
        }
    }

    useEffect(() => {
        getJumlahPenduduk();
        getInfoWilayah();
    }, [props])

    return (
        <div>
            <Header />
            <main>
                <div class="gray-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="section-top-border">
                                    <h2 className="mb-30">Data Informasi Wilayah</h2>
                                    <Table responsive striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Nama Desa</th>
                                                <th>RT</th>
                                                <th>RW</th>
                                                <th>Nama Kepala/Ketua</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {infoWilayah?.map((infowilayah, index) => (
                                            <tr>
                                                <td className="text-center">{infowilayah.nama_desa}</td>
                                                <td className="text-center">{infowilayah.rt}</td>
                                                <td className="text-center">{infowilayah.rw}</td>
                                                <td className="text-center">{infowilayah.kepala_desa}</td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <Table responsive striped bordered hover className='mt-30'>
                                        <thead>
                                            <tr>
                                                <th className="text-center"><h1>JUMLAH PENDUDUK</h1></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className="text-center"><h1>{jumlahPenduduk}</h1></th>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            <div className='col-lg-4' style={{ marginTop: 110 }}>
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