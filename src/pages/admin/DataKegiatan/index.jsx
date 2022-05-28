import React, { useState, PureComponent } from 'react'
import Nav from '../Nav'
import axios from '../../../api/axiosClient'
import { NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import {Table} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import logo from '../assets/jonggol.png'
import '../css/main.min.css'
import '../css/main.css'

const deleteKegiatan = (e, kegiatan_id) => {
    e.preventDefault();
    

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting"

    axios.delete(`/kegiatan/delete/${kegiatan_id}`).then(res => {
        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");
            thisClicked.closest("tr").remove()
        } else if (res.data.status === 500) {
            swal("Success", res.data.message, "Success");
            thisClicked.innerText = "Deleting"
        }
    });
}



class DataKegiatan extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            kegiatan: [],
            response: '',
            display: 'none'

        }
    }

    componentDidMount() {
        axios.get(`/kegiatan`).then(res => {
            this.setState({
                kegiatan: res.data
            })
        })
    }

    render() {
        return (
            <div className='page-wrapper'>
                <Nav />
                <div className="content-wrapper">
                    <div className="page-heading">
                        <h1 className="page-title">Data Kegiatan</h1>
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
                                <div className="ibox-title">Data Kegiatan</div>
                                <NavLink href="/tambahkegiatan"><button className='genric-btn info radius mr-4'>Tambah Data</button></NavLink>
                            </div>
                            <div className="ibox-body">
                                <Table responsive striped bordered hover>
                                        <thead>
                                            <tr>
                                              <th>Tanggal</th>
                                              <th>Nama Kegiatan</th>
                                              <th>Foto</th>
                                              <th>Keterangan</th>
                                              <th>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.kegiatan.map(kegiatan =>
                                            <tr key={kegiatan.id}>
                                                {/* <th class="text-center">1</th> */}
                                                <td className="text-center">{kegiatan.tanggal}</td>
                                                <td className="text-center">{kegiatan.nama_kegiatan}</td>
                                                <td className="text-center">
                                                <img className='responsive' style={{ width:150, height: 'auto' }}
                                                        src={kegiatan.image} />
                                                </td>
                                                <td className="text-center">{kegiatan.status == 0 ? "Belum Dilaksanakan" : "Sudah Dilaksakan"}</td>
                                                <td className="text-center">
                                                <Link to={`/editkegiatan/${kegiatan.id}`}>
                                                        {/* <Route path='/editartikel/:id' element={<EditArtikel />} id={artikel.id} /> */}
                                                        <button className="genric-btn success radius">Edit</button>
                                                    </Link>
                                                    <button className="genric-btn danger radius ml-3" onClick={(e) => deleteKegiatan(e, kegiatan.id)}>Delete</button>
                                                </td>
                                            </tr>
                                             )}
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

export default DataKegiatan;
