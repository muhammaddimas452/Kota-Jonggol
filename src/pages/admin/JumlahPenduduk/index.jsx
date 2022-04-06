import React, { useState, useEffect } from 'react'
import Nav from '../Nav'
import axios from '../../../api/axiosClient'
import { Link } from 'react-router-dom'
import '../css/main.min.css'

export default function JumlahPenduduk(props) {

    const [loading, setLoading] = useState(false);
    const [jumlahPendudukInput, setJumlahPenduduk] = useState();
    const getJumlahPenduduk = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/jumlah-penduduk`)
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
    )
}


