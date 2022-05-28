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


export default function DataUMKM(props) {

    const [umkm, setUmkm] = useState();
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();
    const deleteCategory = (e, umkm_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting"
        axios.delete(`/data-umkm/delete/${umkm_id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove()
            } else if (res.data.status === 500) {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Deleting"
            }
        });
    }
    const getUmkm = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/data-umkm`)
            setLoading(false)
            setUmkm(res.data)
        }
        catch (err) {
            setLoading(false)
        }
    }

    const [detailUmkm, setDetailUmkm] = useState([]);
    const readUmkm = async (id) => {
        try {
            const res = await axios.get(`/data-umkm/${id}`)
            if (res.data.status === 200) {
                setDetailUmkm(res.data.umkm);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/data-umkm");
            }
        }
        catch (err) {
            return navigate("/data-umkm");
        }
    }

    useEffect(() => {
        getUmkm();
    }, [props])

    const detail = (id) => {
        setModalShow(true)
        readUmkm(id)
    }

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
    return (
        <div className='page-wrapper'>
            <Nav />
            <div className="content-wrapper">
                {/* START PAGE CONTENT*/}
                <div className="page-heading">
                    <h1 className="page-title">Data UMKM</h1>
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
                            <div className="ibox-title">Data UMKM</div>
                            <NavLink href="/tambah-data-umkm"><button className='genric-btn info radius'>Tambah Data</button></NavLink>
                        </div>
                        <div className="ibox-body">
                            <div className="scroller" data-height="600">
                                
                                <Table responsive striped bordered hover>
                                    <thead>
                                        <tr>
                                            {/* <th>No</th> */}
                                            <th className=''>Judul Usaha</th>
                                            <th className='col-3'>Foto</th>
                                            <th className=''>Isi Usaha</th>
                                            <th className=''>Views</th>
                                            <th className='col-3'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                        {umkm?.map((umkm, index) => (
                                            <tr key={index}>
                                                {/* <th class="text-center">1</th> */}
                                                <td className="text-center">{umkm.nama_usaha}</td>
                                                <td className="text-center"><img className='responsive' style={{ width: 200, height: 'auto' }}
                                                    src={umkm.image} /></td>
                                                <dt className=""><p dangerouslySetInnerHTML={{ __html: umkm.isi_usaha.substr(0, 200) }} /></dt>
                                                <td className="text-center">{umkm.views}</td>
                                                <td className="text-center">
                                                    <a href={`/edit-data-umkm/${umkm.id}`}><button className="genric-btn success radius">Edit</button></a>
                                                    <button className="genric-btn primary radius ml-3" onClick={() => detail(umkm.id)}>Detail</button>
                                                    <button className="genric-btn danger radius ml-3" onClick={(e) => deleteCategory(e, umkm.id)}>Delete</button>
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
}