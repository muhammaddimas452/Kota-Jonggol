import React, { Component, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import Footer from '../Footer'
import Nav from '../Nav'
import Sidebar from '../Sidebar'
import axios from 'axios'
import { NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import '../css/main.min.css'
import '../vendors/bootstrap/dist/css/bootstrap.min.css'
import '../vendors/themify-icons/css/themify-icons.css'
import { Modal, Col, Container, Row, Button } from 'react-bootstrap'


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
                swal("Success", res.data.message, "Success");
                thisClicked.innerText = "Deleting"
            }
        });
    }
    const getArtikel = async () => {
        try {
            const res = await axios.get(api + `/artikel`,)
            console.log(res.data)
            setArtikel(res.data)
        }
        catch (err) {
        }
    }
    const [detailArtikel, setDetailArtikel] = useState([]);
    const readArtikel = async (id) => {
        console.log(id)
        try {
            // const artikel_id = id;
            const res = await axios.get(api + `/artikel/${id}`)
            if (res.data.status === 200) {
                setDetailArtikel(res.data.artikel);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/artikel");
            }
            console.log(detailArtikel)
        }
        catch (err) {
            return navigate("/artikel");
        }
    }

    useEffect(() => {
        getArtikel();
    }, [props])

    const detail = (id) =>{
        setModalShow(true)
        readArtikel(id)
    }


    // class DataArtikel extends PureComponent {
    //     constructor(props) {
    //         super(props)

    //         this.state = {
    //             artikel: [],
    //             response: '',
    //             display: 'none'

    //         }
    //     }

    //     componentDidMount() {
    //         axios.get(api + `/artikel`).then(res => {
    //             this.setState({
    //                 artikel: res.data
    //             })
    //         })
    //     }

    //     render() {
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
                            <table responsive className="table table-striped table-bordered table-hover" id="example-table" cellSpacing={0} width="100%">
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
                                <tfoot>
                                    <tr>
                                       {/* <th>No</th> */}
                                        <th className=''>Tanggal</th>
                                        <th className="">Judul Artikel</th>
                                        <th className=''>Foto</th>
                                        <th className="">Isi Artikel</th>
                                        <th className="">Views</th>
                                        <th className=''>Action</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {artikel?.map((artikel, index) => (
                                        <tr key={index}>
                                            <td>{artikel.tanggal}</td>
                                            <td>{artikel.nama_artikel}</td>
                                            <td className='text-center'>
                                                <img className='responsive' style={{ width: 150, height: 'auto' }}
                                                    src={"http://localhost:8000/" + artikel.image} />
                                            </td>
                                            <td dangerouslySetInnerHTML={{ __html: artikel.isi_artikel }} />
                                            <td>{artikel.views}</td>
                                            <td className='text-center'>
                                                <Link to={`/editartikel/${artikel.id}`}>
                                                    {/* <Route path='/editartikel/:id' element={<EditArtikel />} id={artikel.id} /> */}
                                                    <button className="genric-btn success radius">Edit</button>
                                                </Link>
                                                <button className="genric-btn primary radius ml-3" onClick={() => detail(artikel.id) }>Detail</button>
                                                <button className="genric-btn danger radius ml-3" onClick={(e) => deleteCategory(e, artikel.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
    // const api = 'http://127.0.0.1:8000/api';
    // const { id } = useParams()
    // const [artikelInput, setArtikel] = useState([]);
    // const [picture, setPicture] = useState([]);
    // const navigate = useNavigate();

    // const getArtikel = async () => {
    //     try {
    //         const artikel_id = id;
    //         const res = await axios.get(api + `/artikel/edit/${artikel_id}`)
    //         if (res.data.status === 200) {
    //             setArtikel(res.data.artikel);
    //         } else if (res.data.status === 404) {
    //             swal("Error", res.data.message, "error");
    //             return navigate("/artikel");
    //         }
    //     }
    //     catch (err) {
    //         return navigate("/artikel");
    //     }
    // }
    // useEffect(() => {

    //     getArtikel();

    // }, [props])
    // console.log(props.detail)

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
                                {/* <img class="card-img-top" src="./assets/img/image.png" /> */}
                                <img className='responsive'
                                src={"http://localhost:8000/" + props.detail.image} />
                                <div class="card-body">
                                    <h5 class="card-title">{props.detail.nama_artikel}</h5>
                                    <div class="text-muted card-subtitle"></div>
                                    <div dangerouslySetInnerHTML={{ __html: props.detail.isi_artikel }} />
                                </div>
                                <div class="card-footer">
                                    <span class="pull-right text-muted font-13">Jan 2</span>
                                </div>
                            </div>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type='button' className="genric-btn info radius small">Back</button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
}
