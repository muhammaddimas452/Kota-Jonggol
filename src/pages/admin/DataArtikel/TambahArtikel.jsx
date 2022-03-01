// import React, { useEffect, useState } from 'react';
// import Footer from '../Footer'
// import Nav from '../Nav'
// import Sidebar from '../Sidebar'
// import { Formik } from 'formik'
// import swal from 'sweetalert';
// import { tambahArtikel } from '../../../api/artikel'
// import { useNavigate } from "react-router-dom";
// import { NavLink } from "reactstrap"
// import axios from 'axios';

// import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// export default function TambahArtikel() {

// const initialState = {
//     nama_artikel: "",
//     isi_artikel: "",
//     response: "",
// };


// let editorState = EditorState.createEmpty();
// const [isiArtikel, setIsiArtikel] = useState(editorState);
// const onEditorStateChange = (editorState) => {
//     setIsiArtikel(editorState);
// }

// const [error, setError] = useState([]);
// const navigate = useNavigate();
// const onSubmit = async (values) => {
//     const result = await tambahArtikel(values);
//     console.log("result", result);
//     if (result?.data?.status === "Success") {
//         swal("Success", result.data.status, "success");
//         return navigate("/artikel");
//     }
//     else if (result.data?.status === 422) {
//         swal("Data Perlu di Isi", "", "error");
//         setError(result.data.errors);
//     }
//     else if (result?.data?.status === "Failed") {
//         swal("Error", result.data.status, "error");
//     }

// };


// return (
//     <div id="wrapper">
//         {/* Sidebar */}
//         <Sidebar />
//         {/* End of Sidebar */}
//         {/* Content Wrapper */}
//         <div id="content-wrapper" className="d-flex flex-column">
//             {/* Main Content */}
//             <div id="content">
//                 {/* Topbar */}
//                 <Nav />
//                 <div className="container-fluid">
//                     {/* Page Heading */}
//                     <div className='d-sm-flex align-items-center justify-content-between mb-4'>
//                         <h1 className="h3 mb-2 text-gray-800">Form</h1>
//                     </div>
//                     {/* DataTales Example */}
//                     <div className="card shadow">
//                         <div className="card-header d-sm-flex align-items-center justify-content-between">
//                             <h5 className="m-0 font-weight-bold text-primary">Tambah Artikel</h5>
//                             <NavLink href="/artikel"><button className='btn btn-primary'>Back</button></NavLink>
//                         </div>
//                         <Formik
//                             initialValues={initialState}
//                             enableReinitialize
//                             onSubmit={onSubmit}
//                         >
//                             {({
//                                 values,
//                                 handleChange,
//                                 handleBlur,
//                                 handleSubmit,
//                                 isSubmitting,
//                             }) => (
//                                 <form onSubmit={handleSubmit}>
//                                     <div className="card-body">
//                                         <div className="table-responsive">
//                                             <div>
//                                                 <div className="form-group">
//                                                     <label>Nama Artikel</label>
//                                                     <input className="form-control" type="text" placeholder="Masukkan Nama Artikel"
//                                                         id="nama_artikel"
//                                                         name="nama_artikel"
//                                                         onChange={handleChange}
//                                                         onBlur={handleBlur}
//                                                         value={values.nama_artikel}
//                                                         disabled={isSubmitting}
//                                                     />
//                                                     <small className='text-danger'>{error.nama_artikel}</small>
//                                                 </div>
//                                                 <div className="form-group">
//                                                     <label>Isi Artikel</label>
//                                                     <Editor
//                                                     editorState={isiArtikel}
//                                                     value={values.isi_artikel}
//                                                     toolbarClassName="toolbarClassName"
//                                                     wrapperClassName="wrapperClassName"
//                                                     editorClassName="editorClassName"
//                                                     onEditorStateChange={onEditorStateChange}

//                                                     />
//                                                     <textarea className="form-control" type="text" row="3"
//                                                     id="isi_artikel"
//                                                     name="isi_artikel"
//                                                     style={{display:"none"}}
//                                                     // onChange={handleChange}
//                                                     // onBlur={handleBlur}
//                                                     // value={values.isi_artikel} 
//                                                     disabled ref={(val) => values.isi_artikel = val} value={draftToHtml(convertToRaw(isiArtikel.getCurrentContent())) } 
//                                                     />
//                                                     <small className='text-danger'>{error.nama_artikel}</small>
//                                                 </div>
//                                             </div>
//                                             <button
//                                                 type='submit' className='btn btn-primary btn-user btn-block' onSubmit={handleSubmit}>
//                                                 Submit
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </form>
//                             )}
//                         </Formik>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     </div>
// )}


import React, { useState } from 'react';
import Footer from '../Footer'
import Nav from '../Nav'
import Sidebar from '../Sidebar'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate } from "react-router"
import { NavLink } from "reactstrap"
import axios from 'axios';
import swal from 'sweetalert';
import { tambahArtikel } from "../../../api/artikel";
import '../css/main.min.css'

export default function TambahArtikel() {
    const [values, setValues] = useState({
        nama_artikel: '',
    });
    const onChangeValue = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    let editorState = EditorState.createEmpty();
    const [isiArtikel, setIsiArtikel] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setIsiArtikel(editorState);
    }

    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        const result = await tambahArtikel(values);
        console.log(result)
        if (result?.data?.status === 200) {
            swal("Success", result.data.message, "success")
            return navigate("/artikel")
        } else if (result?.data?.status === 422) {
            swal("Data Perlu di Isi", "", "error")
            setError(result.data.errors);
        } else if (result?.data?.status === 404) {
            swal("Error", result.data.message, "error")
        }

    }
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
        //                         <h3>Add Data</h3>
        //                         <p className="text-subtitle text-muted">A page for user to add the data</p>
        //                     </div>
        //                     <div className="col-12 col-md-6 order-md-2 order-first">
        //                         <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
        //                             <ol className="breadcrumb">
        //                                 <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
        //                                 <li className="breadcrumb-item active" aria-current="page">TambahArtikel</li>
        //                             </ol>
        //                         </nav>
        //                     </div>
        //                 </div>
        //             </div>
        //             <section id="input-style">
        //                 <div className="row">
        //                     <div className="col-md-12">
        //                         <div className="card">
        //                             <div className="card-header d-sm-flex align-items-center justify-content-between">
        //                                 <h3 className="">Tambah Artikel</h3>
        //                                 <NavLink href="/artikel"><button className='btn btn-primary'>Back</button></NavLink>
        //                             </div>
        //                             <form onSubmit={onSubmit}>
        //                             <div className="card-body">
        //                                 <div className="row">
        //                                     <div className="col-lg-12 col-6">
        //                                         <div className="form-group">
        //                                             <label htmlFor="roundText">Judul Artikel</label>
        //                                             <input type="text" className="form-control mt-3" placeholder="Judul Artikel" 
        //                                              id="nama_artikel"
        //                                              name="nama_artikel"
        //                                              value={values.nama_artikel}
        //                                              onChange={onChangeValue}
        //                                              />
        //                                              <small className='text-danger'>{error.nama_artikel}</small>
        //                                         </div>
        //                                         <div className="form-group">
        //                                         <label>Isi Artikel</label>
        //                                         <Editor
        //                                             editorState={isiArtikel}
        //                                             toolbarClassName="toolbarClassName"
        //                                             wrapperClassName="wrapperClassName"
        //                                             editorClassName="editorClassName"
        //                                             onEditorStateChange={onEditorStateChange}
        //                                         />
        //                                         <textarea style={{ display: 'none' }} disabled ref={(val) => values.isi_artikel = val} value={draftToHtml(convertToRaw(isiArtikel.getCurrentContent()))} rows="3" />
        //                                         <small className='text-danger'>{error.isi_artikel}</small>
        //                                     </div>
        //                                     <button
        //                                     type='submit' className='btn btn-primary btn-user btn-block'>
        //                                     Tambah Data
        //                                 </button>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             </form>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </section>

        //         </div>

        //     </div>
        // </div>
        <div className='page-wrapper'>
            <Nav />
            <Sidebar />
            <div className="content-wrapper">
                <div className="page-heading">
                    <h1 className="page-title">Basic Form</h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html"><i className="la la-home font-20" /></a>
                        </li>
                        <li className="breadcrumb-item">Basic Form</li>
                    </ol>
                </div>
                <div className="page-content fade-in-up">
                    <div className="row">
                        <div className="col-md-12 col-12">
                            <div className="ibox">
                                <div className="ibox-head">
                                    <div className="ibox-title">Basic form</div>
                                    <div className="ibox-tools">
                                        <a className="ibox-collapse"><i className="fa fa-minus" /></a>
                                        <a className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-ellipsis-v" /></a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a className="dropdown-item">option 1</a>
                                            <a className="dropdown-item">option 2</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="ibox-body">
                                <form onSubmit={onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="roundText">Judul Artikel</label>
                                            <input type="text" className="form-control mt-3" placeholder="Judul Artikel"
                                                id="nama_artikel"
                                                name="nama_artikel"
                                                value={values.nama_artikel}
                                                onChange={onChangeValue}
                                            />
                                            <small className='text-danger'>{error.nama_artikel}</small>
                                        </div>
                                        <div className="form-group">
                                            <label>Isi Artikel</label>
                                            <Editor
                                                editorState={isiArtikel}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="wrapperClassName"
                                                editorClassName="editorClassName"
                                                onEditorStateChange={onEditorStateChange}
                                            />
                                            <textarea style={{ display: 'none' }} disabled ref={(val) => values.isi_artikel = val} value={draftToHtml(convertToRaw(isiArtikel.getCurrentContent()))} rows="3" />
                                            <small className='text-danger'>{error.isi_artikel}</small>
                                        </div>
                                        <button
                                            type='submit' className='btn btn-primary btn-user btn-block'>
                                            Tambah Data
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}