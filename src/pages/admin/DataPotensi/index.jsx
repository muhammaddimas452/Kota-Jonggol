import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Nav from '../Nav'
import axios from '../../../api/axiosClient'
import { NavLink } from 'reactstrap'
import swal from 'sweetalert';
import '../css/main.min.css'
import '../vendors/bootstrap/dist/css/bootstrap.min.css'
import '../vendors/themify-icons/css/themify-icons.css'
import { Modal, Container, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import logo from '../assets/jonggol.png'


export default function DataPotensi(props) {

    const [potensi, setPotensi] = useState();
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();
    const deleteCategory = (e, potensi_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting"
        axios.delete(`/artikel-potensi/delete/${potensi_id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove()
            } else if (res.data.status === 500) {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Deleting"
            }
        });
    }
    const getPotensi = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/artikel-potensi`)
            setLoading(false)
            setPotensi(res.data)
        }
        catch (err) {
            setLoading(false)
        }
    }

    const [detailPotensi, setDetailPotensi] = useState([]);
    const readPotensi = async (id) => {
        try {
            const res = await axios.get(`/artikel-potensi/${id}`)
            if (res.data.status === 200) {
                setDetailPotensi(res.data.potensi);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/potensi");
            }
        }
        catch (err) {
            return navigate("/potensi");
        }
    }

    useEffect(() => {
        getPotensi();
    }, [props])

    const detail = (id) => {
        setModalShow(true)
        readPotensi(id)
    }

    return (
        <div className='page-wrapper'>
            <Nav />
            <div className="content-wrapper">
                {/* START PAGE CONTENT*/}
                <div className="page-heading">
                    <h1 className="page-title">Data Potensi</h1>
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
                            <div className="ibox-title">Data Potensi</div>
                            <NavLink href="/tambahpotensi"><button className='genric-btn info radius'>Tambah Data</button></NavLink>
                        </div>
                        <div className="ibox-body">
                            <div className="scroller" data-height="600">
                                
                                <Table responsive striped bordered hover>
                                    <thead>
                                        <tr>
                                            {/* <th>No</th> */}
                                            <th className=''>Judul Potensi</th>
                                            <th className='col-3'>Foto</th>
                                            <th className=''>Isi Potensi</th>
                                            <th className=''>Views</th>
                                            <th className='col-3'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                        {potensi?.map((potensi, index) => (
                                            <tr key={index}>
                                                {/* <th class="text-center">1</th> */}
                                                <td className="text-center">{potensi.nama_potensi}</td>
                                                <td className="text-center"><img className='responsive' style={{ width: 200, height: 'auto' }}
                                                    src={potensi.image} /></td>
                                                <dt className=""><p dangerouslySetInnerHTML={{ __html: potensi.isi_potensi.substr(0, 200) }} /></dt>
                                                <td className="text-center">{potensi.views}</td>
                                                <td className="text-center">
                                                    <a href={`/editpotensi/${potensi.id}`}><button className="genric-btn success radius">Edit</button></a>
                                                    <button className="genric-btn primary radius ml-3" onClick={() => detail(potensi.id)}>Detail</button>
                                                    <button className="genric-btn danger radius ml-3" onClick={(e) => deleteCategory(e, potensi.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="page-footer">
                    <div className="font-13">2018 © <b>AdminCAST</b> - All rights reserved.</div>
                    <div className="to-top mr-5"><FontAwesomeIcon icon={faArrowUp} className="text-dark" /></div>
                </footer>
            </div>
        </div>
    )
}