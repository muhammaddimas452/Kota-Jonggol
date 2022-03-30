import React, { PureComponent } from 'react'
import Nav from '../Nav'
import axios from 'axios'
import { NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import {Table} from 'react-bootstrap'

import '../css/main.min.css'
import '../css/main.css'


const api = 'http://127.0.0.1:8000/api'

const deleteKegiatan = (e, kegiatan_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting"

    axios.delete(api + `/kegiatan/delete/${kegiatan_id}`).then(res => {
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
        axios.get(api + `/kegiatan`).then(res => {
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
                                <NavLink href="/tambahkegiatan"><button className='genric-btn info radius mr-4'>Tambah Data</button></NavLink>
                            </div>
                            <div className="ibox-body">
                                <Table responsive striped bordered hover>
                                        <thead>
                                            <tr>
                                              <th>Tanggal</th>
                                              <th>Kegiatan</th>
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
                                                        src={"http://localhost:8000/" + kegiatan.image} />
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
                        <div className="to-top"><i className="fa fa-angle-double-up" /></div>
                    </footer>
                </div>
            </div>
        )
    }
}

export default DataKegiatan;
