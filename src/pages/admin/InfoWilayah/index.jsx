import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Nav from '../Nav'
import axios from '../../../api/axiosClient'
import { NavLink } from 'reactstrap'
import swal from 'sweetalert';
import '../css/main.min.css'
import '../vendors/bootstrap/dist/css/bootstrap.min.css'
import '../vendors/themify-icons/css/themify-icons.css'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/jonggol.png'
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"


export default function DataInfoWilayah(props) {
    const [infoWilayah, setInfoWilayah] = useState();
    const [loading, setLoading] = useState(false);
    const deleteCategory = (e, infowilayah_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting"
        axios.delete(`/infowilayah/delete/${infowilayah_id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove()
            } else if (res.data.status === 500) {
                swal("Success", res.data.message, "Success");
                thisClicked.innerText = "Deleting"
            }
        });
    }
    const getInfoWilayah = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/infowilayah`,)
            setLoading(false)
            setInfoWilayah(res.data)
        }
        catch (err) {
            setLoading(false)
        }
    }
    useEffect(() => {
        getInfoWilayah();
    }, [props])

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
                    <h1 className="page-title">Data Wilayah</h1>

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
                            <div className="ibox-title">Data Wilayah</div>
                            <NavLink href="/tambahdatainfowilayah"><button className='genric-btn info radius'>Tambah Data</button></NavLink>
                        </div>
                        <div className="ibox-body">
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className=''>Nama Desa</th>
                                        <th className=''>RT</th>
                                        <th className=''>RW</th>
                                        <th className=''>Kepala Desa</th>
                                        <th className=''>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {infoWilayah?.map((infowilayah, index) => (
                                        <tr key={index}>
                                            <td className="text-center">{infowilayah.nama_desa}</td>
                                            <td className="text-center">{infowilayah.rt}</td>
                                            <td className="text-center">{infowilayah.rw}</td>
                                            <td className="text-center">{infowilayah.kepala_desa}</td>
                                            <td className="text-center">
                                                    <a href={`/editdatainfowilayah/${infowilayah.id}`}><button className="genric-btn success radius">Edit</button></a>
                                                <button className="genric-btn danger radius ml-3" onClick={(e) => deleteCategory(e, infowilayah.id)}>Delete</button>
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
                    <div className="to-top mr-5"><FontAwesomeIcon icon={faArrowUp} className="text-dark" /></div>
                </footer>
            </div>
        </div>
    )
}
}
