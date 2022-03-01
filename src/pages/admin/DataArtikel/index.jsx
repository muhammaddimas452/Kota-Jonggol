import React, { PureComponent } from 'react'
import Footer from '../Footer'
import Nav from '../Nav'
import Sidebar from '../Sidebar'
import axios from 'axios'
import { NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import '../css/main.min.css'
import '../vendors/bootstrap/dist/css/bootstrap.min.css'
// import '../vendors/font-awesome/css/font-awesome.min.css'
import '../vendors/themify-icons/css/themify-icons.css'






const api = 'http://127.0.0.1:8000/api'

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



class DataArtikel extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            artikel: [],
            response: '',
            display: 'none'

        }
    }

    componentDidMount() {
        axios.get(api + `/artikel`).then(res => {
            this.setState({
                artikel: res.data
            })
        })
    }

    render() {
        return (
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
            //                                 <li className="breadcrumb-item active" aria-current="page">DataArtikel</li>
            //                             </ol>
            //                         </nav>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>

            //         <section className="section">
            //             <div className="card">

            //                 <div className="card-header d-sm-flex align-items-center justify-content-between">
            //                 <h3>Artikel</h3>
            //                 <NavLink href="/tambahartikel"><button className='btn btn-primary mr-4'>Tambah Data</button></NavLink>
            //                 </div>
            //                 <div className="card-body">
            //                     <table className="table table-striped table-bordered">
            //                         <thead>
            //                             <tr>
            //                                 {/* <th>No</th> */}
            //                                 <th>Nama Artikel</th>
            //                                 <th>Isi Artikel</th>
            //                                 <th>Action</th>
            //                             </tr>
            //                         </thead>
            //                         <tbody>
            //                             {this.state.artikel.map(artikel =>
            //                                 <tr key={artikel.id}>
            //                                     <td>{artikel.nama_artikel}</td>
            //                                     <td dangerouslySetInnerHTML={{ __html: artikel.isi_artikel }} />
            //                                     <td>
            //                                         <Link to={`/editartikel/${artikel.id}`}>
            //                                             {/* <Route path='/editartikel/:id' element={<EditArtikel />} id={artikel.id} /> */}
            //                                             <button className="btn btn-success">Edit</button>
            //                                         </Link>
            //                                         <button className="btn btn-danger" onClick={(e) => deleteCategory(e, artikel.id)}>Delete</button>
            //                                     </td>
            //                                 </tr>
            //                             )}
            //                         </tbody>
            //                     </table>
            //                 </div>
            //             </div>
            //         </section>
            //     </div>
            // </div>
            <div className='page-wrapper'>
                <Nav/>
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
                                <NavLink href="/tambahartikel"><button className='btn btn-primary'>Tambah Data</button></NavLink>
                            </div>
                            <div className="ibox-body">
                                <table className="table table-striped table-bordered table-hover" id="example-table" cellSpacing={0} width="100%">
                                    <thead>
                                        <tr>
                                            {/* <th>No</th> */}
                                            <th className='col-2'>Judul Artikel</th>
                                            <th className='col-6'>Isi Artikel</th>
                                            <th className='col-2'>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            {/* <th>No</th> */}
                                            <th>Judul Artikel</th>
                                            <th>Isi Artikel</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                    {this.state.artikel.map(artikel =>
                                            <tr key={artikel.id}>
                                                <td>{artikel.nama_artikel}</td>
                                                <td dangerouslySetInnerHTML={{ __html: artikel.isi_artikel }} />
                                                <td>
                                                    <Link to={`/editartikel/${artikel.id}`}>
                                                        {/* <Route path='/editartikel/:id' element={<EditArtikel />} id={artikel.id} /> */}
                                                        <button className="btn btn-success ">Edit</button>
                                                    </Link>
                                                    <button className="btn btn-danger ml-3" onClick={(e) => deleteCategory(e, artikel.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        )}
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
}

export default DataArtikel;
