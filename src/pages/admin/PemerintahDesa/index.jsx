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
    const { id } = useParams()
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
    const [picture, setPicture] = useState([]);
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
                            <table className="table table-striped table-bordered table-hover" id="example-table" cellSpacing={0} width="100%">
                                <thead>
                                    <tr>
                                        {/* <th>No</th> */}
                                        <th className="">Nama</th>
                                        <th className="">Jabatan</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        {/* <th>No</th> */}
                                        <th className="">Nama</th>
                                        <th className="">Jabatan</th>
                                        <th>Action</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {artikel?.map((artikel, index) => (
                                        <tr key={index}>
                                            <td>{artikel.nama_artikel}</td>
                                            <td></td>
                                            <td className='text-center'>
                                                <Link to={`/editartikel/${artikel.id}`}>
                                                    {/* <Route path='/editartikel/:id' element={<EditArtikel />} id={artikel.id} /> */}
                                                    <button className="genric-btn success radius">Edit</button>
                                                </Link>
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
            </div>
        </div>
    )
}