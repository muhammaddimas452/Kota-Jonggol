import React, { PureComponent, useState, useEffect } from 'react'
import Footer from '../Footer'
import Nav from '../Nav'
import Sidebar from '../Sidebar'
import axios from 'axios'
import qs from 'querystring'
import { NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import '../css/main.min.css'


// class JumlahPenduduk extends PureComponent {
//     constructor(props) {
//         super(props)

//         this.state = {
//             jumlahpenduduk: [],
//             response: '',
//             display: 'none'

//         }
//     }

//     componentDidMount() {
//         axios.get(api + `/jumlah-penduduk`).then(res => {
//             this.setState({
//                 jumlahpenduduk: res
//             })
//         })
//         console.log(res)
//     }

//     render() {

export default function JumlahPenduduk(props) {
    const api = 'http://127.0.0.1:8000/api';

    const [loading, setLoading] = useState(false);
    const [jumlahPendudukInput, setJumlahPenduduk] = useState();
    const getJumlahPenduduk = async () => {
        try {
            setLoading(true)
            const res = await axios.get(api + `/jumlah-penduduk`)
            setLoading(false)
            console.log(res.data)
            setJumlahPenduduk(res.data)
        }
        catch (err) {
            setLoading(false)
        }
    }
    useEffect(() => {
        getJumlahPenduduk();
    }, [props])


    return (
        <div className='page-wrapper'>
            <Nav />
            <Sidebar />
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
                        </div>
                        <div className="ibox-body">
                            <table className="table table-striped table-bordered table-hover" id="example-table" cellSpacing={0} width="100%">
                                <thead>
                                    <tr>
                                        <th>Jumlah Penduduk</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Jumlah Penduduk</th>
                                        <th>Action</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    <tr>
                                        <td className='text-center'><h2>{jumlahPendudukInput}</h2></td>
                                        <td>
                                            <Link to={`/editjumlahpenduduk/2`}>
                                                {/* <Route path='/editartikel/:id' element={<EditArtikel />} id={artikel.id} /> */}
                                                <button className="btn btn-success ml-4">Edit</button>
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* END PAGE CONTENT*/}
                <footer className="page-footer">
                    <div className="font-13">2018 © <b>AdminCAST</b> - All rights reserved.</div>
                    <div className="to-top"><i className="fa fa-angle-double-up" /></div>
                </footer>
            </div>
        </div>

        // <div id="app">
        //     <Sidebar />
        //     <div id="main">
        //         <header className="mb-3">
        //             <a href="#" className="burger-btn d-block d-xl-none">
        //                 <i className="bi bi-justify fs-3" />
        //             </a>
        //         </header>
        //         <div className="page-heading">
        //             <div className="page-title">
        //                 <div className="row">
        //                     <div className="col-12 col-md-6 order-md-1 order-last">
        //                         <h3>DataTable</h3>
        //                         <p className="text-subtitle text-muted">For user to check they list</p>
        //                     </div>
        //                     <div className="col-12 col-md-6 order-md-2 order-first">
        //                         <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
        //                             <ol className="breadcrumb">
        //                                 <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
        //                                 <li className="breadcrumb-item active" aria-current="page">JumlahPenduduk</li>
        //                             </ol>
        //                         </nav>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //         <section className="section">
        //             <div className="card">

        //                 <div className="card-header d-sm-flex align-items-center justify-content-between">
        //                     <h3>Jumlah Penduduk</h3>
        //                 </div>
        //                 <div className="card-body">
        //                     <table className="table table-striped table-bordered">
        //                         <thead>
        //                             <tr>
        //                                 {/* <th>No</th> */}
        //                                 <th>Jumlah Penduduk</th>
        //                                 <th>Action</th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             <tr>
        //                                 <td className='text-center'><h2>{jumlahPendudukInput}</h2></td>
        //                                 <td>
        //                                     <Link to={`/editjumlahpenduduk/2`}>
        //                                         {/* <Route path='/editartikel/:id' element={<EditArtikel />} id={artikel.id} /> */}
        //                                         <button className="btn btn-success ml-3">Edit</button>
        //                                     </Link>
        //                                 </td>
        //                             </tr>
        //                         </tbody>
        //                     </table>
        //                 </div>
        //             </div>
        //         </section>
        //     </div>
        // </div>
    )
}


