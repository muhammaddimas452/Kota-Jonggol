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
import axios from 'axios'
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import { Modal, Col, Container, Row, Button, Table } from 'react-bootstrap'

export default function (props) {
    const api = 'http://127.0.0.1:8000/api'
    const [pemerintah, setPemerintah] = useState();
    const [detailModal, setDetailModal] = useState();
    const navigate = useNavigate();
    const getPemerintah = async () => {
        try {
            const res = await axios.get(api + `/pemerintahdesa`,)
            setPemerintah(res.data)
        }
        catch (err) {
        }
    }
    useEffect(() => {
        getPemerintah();
    }, [props])

    const [detailPemerintah, setDetailPemerintah] = useState([]);
    const [detailJabatan, setDetailJabatan] = useState([])
    const readPemerintah = async (id) => {
        try {
            const res = await axios.get(api + `/pemerintahdesa/${id}`)
            if (res.data.status === 200) {
                setDetailPemerintah(res.data.pemerintahdesa);
                setDetailJabatan(res.data.pemerintahdesa.jabatan);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/pemerintah");
            }
            console.log(res.data.pemerintahdesa)
            console.log(res.data.pemerintahdesa.jabatan)
        }
        catch (err) {
            return navigate("/pemerintah");
        }
    }

    const detail = (id) => {
        setDetailModal(true)
        readPemerintah(id)
    }

    return (
        <div>
            <Header />
            <main>
                <div className="team-area section-padding30">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                    <div className="container">
                                        <div className="row">
                                            <div className="">
                                                {/* Section Tittle */}
                                                <div className="section-tittles mb-70">
                                                    <span className='text-success'>Pemerintah Desa Jonggol </span>
                                                    <h2>Struktur Organisasi</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            {pemerintah?.map((pemerintah, index) => (
                                            <div key={index} className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                <div className="single-team mb-30">
                                                    <div className="team-img">
                                                        <img style={{ height:200, width:450 }} src={pemerintah.gambar_pemerintah} alt />
                                                    </div>
                                                    <div className="team-caption">
                                                        <h3><a onClick={() => detail(pemerintah.id)}>{pemerintah.nama}</a></h3>
                                                        <span className='text-dark font-weight-bold'>{pemerintah.jabatan.nama_jabatan}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4'>
                                    <Aside />
                                </div>
                            </div>
                        </div>
                    </div>
            </main>
            <Footer />
            <MydModalWithGrid show={detailModal} detail={detailPemerintah} onHide={() => setDetailModal(false)} />
        </div>
    )
}

function MydModalWithGrid(props) {

    return (
        <div>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Detail Pemerintah
                    </Modal.Title>
                </Modal.Header>
                <div>
                    <Modal.Body className="show-grid">
                        <Container>
                            <div className="card text-center">
                                <img className='responsive'
                                    src={"http://localhost:8000/" + props.detail.gambar_pemerintah} />
                                <div className="card-body">
                                    <h5 className="card-title">{props.detail.nama}</h5>
                                    <div className="text-muted card-subtitle"></div>
                                </div>
                                <div className="card-footer">
                                    {props.detail.nama_jabatan}
                                </div>
                            </div>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
}
