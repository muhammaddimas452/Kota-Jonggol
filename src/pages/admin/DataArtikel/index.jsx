import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Nav from '../Nav'
import axios from 'axios'
import { NavLink } from 'reactstrap'
import swal from 'sweetalert';
import '../css/main.min.css'
import '../vendors/bootstrap/dist/css/bootstrap.min.css'
import '../vendors/themify-icons/css/themify-icons.css'
import { Modal, Container, Table } from 'react-bootstrap'


export default function DataArtikel(props) {
    const api = 'http://127.0.0.1:8000/api'
    const [artikel, setArtikel] = useState();
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();
    const deleteCategory = (e, artikel_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting"
        axios.delete(api + `/artikel/delete/${artikel_id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove()
            } else if (res.data.status === 500) {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Deleting"
            }
        });
    }
    const getArtikel = async () => {
        try {
            const res = await axios.get(api + `/artikel`)
            setArtikel(res.data)
            console.log(res.data)
        }
        catch (err) {
        }
    }
    const [detailArtikel, setDetailArtikel] = useState([]);
    const readArtikel = async (id) => {
        try {
            const res = await axios.get(api + `/artikel/${id}`)
            if (res.data.status === 200) {
                setDetailArtikel(res.data.artikel);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/artikel");
            }
        }
        catch (err) {
            return navigate("/artikel");
        }
    }

    useEffect(() => {
        getArtikel();
    }, [props])

    const detail = (id) => {
        setModalShow(true)
        readArtikel(id)
    }

    return (
        <div className='page-wrapper'>
            <Nav />
            <div className="content-wrapper">
                {/* START PAGE CONTENT*/}
                <div className="page-heading">
                    <h1 className="page-title">DataTables</h1>

                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html"><i className="la la-home font-20" /></a>
                        </li>
                        <li className="breadcrumb-item">DataTables</li>
                    </ol>
                </div>
                <div className="page-content fade-in-up">
                    <div className="ibox">
                        <div className="ibox-head">
                            <div className="ibox-title">Data Table</div>
                            <NavLink href="/tambahartikel"><button className='genric-btn info radius'>Tambah Data</button></NavLink>
                        </div>
                        <div className="ibox-body">
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        {/* <th>No</th> */}
                                        <th className=''>Tanggal</th>
                                        <th className=''>Judul Artikel</th>
                                        <th className=''>Foto</th>
                                        <th className=''>Isi Artikel</th>
                                        <th className=''>Views</th>
                                        <th className=''>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {artikel?.map((artikel, index) => (
                                        console.log(artikel.id),
                                        <tr key={index}>
                                            {/* <th class="text-center">1</th> */}
                                            <td className="text-center">{artikel.tanggal}</td>
                                            <td className="text-center">{artikel.nama_artikel}</td>
                                            <td className="text-center"><img className='responsive' style={{ width: 200, height: 'auto' }}
                                                src={"http://localhost:8000/" + artikel.image} /></td>
                                            <td dangerouslySetInnerHTML={{ __html: artikel.isi_artikel }} />
                                            <td className="text-center">{artikel.views}</td>
                                            <td className="text-center">
                                                <a href={`/editartikel/${artikel.id}`}><button className="genric-btn success radius">Edit</button></a>
                                                <button className="genric-btn primary radius ml-3" onClick={() => detail(artikel.id)}>Detail</button>
                                                <button className="genric-btn danger radius ml-3" onClick={(e) => deleteCategory(e, artikel.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                <footer className="page-footer">
                    <div className="font-13">2018 © <b>AdminCAST</b> - All rights reserved.</div>
                    <div className="to-top"><i className="fa fa-angle-double-up" /></div>
                </footer>
                <MydModalWithGrid show={modalShow} detail={detailArtikel} onHide={() => setModalShow(false)} />
            </div>
        </div>
    )
}

function MydModalWithGrid(props) {

    return (
        <div>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Detail
                    </Modal.Title>
                </Modal.Header>
                <div>
                    <Modal.Body className="show-grid">
                        <Container>
                            <div class="card">
                                <img className='responsive'
                                    src={"http://localhost:8000/" + props.detail.image} />
                                <div class="card-body">
                                    <h5 class="card-title">{props.detail.nama_artikel}</h5>
                                    <div class="text-muted card-subtitle"></div>
                                    <div dangerouslySetInnerHTML={{ __html: props.detail.isi_artikel }} />
                                </div>
                                <div class="card-footer">
                                    <span class="pull-right text-muted font-13">{props.detail.tanggal}</span>
                                </div>
                            </div>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <button type='button' className="genric-btn info radius small">Back</button> */}
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
}
