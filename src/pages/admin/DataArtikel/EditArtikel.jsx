// import React, {Component, useEffect, useState} from 'react'
// import axios from 'axios'
// import Footer from '../Footer'
// import Nav from '../Nav'
// import Sidebar from '../Sidebar'
// import swal from 'sweetalert'
// import { useParams } from 'react-router'
// import { useNavigate } from "react-router-dom";
// import { NavLink} from "reactstrap"

// function EditArtikel(props)
// {
//     const api = 'http://127.0.0.1:8000/api';
//     const {id} = useParams()
//     console.log(id)

//     const [artikelInput, setArtikel] = useState([]);
//     const [error, setError] = useState([]);
//     const navigate = useNavigate();
//     useEffect(() => { 
//         const artikel_id =  id;
//         axios.get(api +  `/artikel/edit/${artikel_id}`).then(res=>{
//             if(res.data.status === 200){
//                 setArtikel(res.data.artikel);
//             }else if(res.data.status === 404){
//                 swal("Error",res.data.message,"error");
//                 return navigate("/artikel");
//             }
//         })

//     },[props])

//     const handleInput = (e) => {
//         e.persist();
//         setArtikel({...artikelInput, [e.target.name]: e.target.value});
//     }

//     const updateArtikel = (e) => {
//         e.preventDefault();
//         const artikel_id =  id;
//         const data = artikelInput;
//         console.log(data)
//         console.log(e)
//         axios.put(api + `/artikel/update/${artikel_id}`, data).then(res=>{
//             if(res.data.status === 200){
//                 swal("Success", res.data.message, "success")
//                 setError([]);

//             }else if (res.data.status === 422){
//                 swal("Data Perlu di Isi", "", "error")
//                 setError(res.data.errors);
//             }else if(res.data.status === 404){
//                 swal("Error", res.data.message, "error")
//                 return navigate("/artikel")
//             }
//         })
//     }

//         return(
//             <div id="wrapper">
//             {/* Sidebar */}
//             <Sidebar />
//             {/* End of Sidebar */}
//             {/* Content Wrapper */}
//             <div id="content-wrapper" className="d-flex flex-column">
//                 {/* Main Content */}
//                 <div id="content">
//                     {/* Topbar */}
//                     <Nav />
//                     <div className="container-fluid">
//                         {/* Page Heading */}
//                         <div className='d-sm-flex align-items-center justify-content-between mb-4'>
//                             <h1 className="h3 mb-2 text-gray-800">Form</h1>
//                         </div>
//                         {/* DataTales Example */}
//                         <div className="card shadow mb-4">
//                             <div className="card-header d-sm-flex align-items-center justify-content-between mb-4">
//                                 <h6 className="m-0 font-weight-bold text-primary">Edit Artikel</h6>
//                                 <NavLink href="/artikel"><button className='btn btn-primary'>Back</button></NavLink>
//                             </div>
//                                     <form className='user' onSubmit={updateArtikel}>
//                                         <div className="card-body">
//                                             <div className="table-responsive">
//                                                 <div>
//                                                     <div className="form-group">
//                                                         <label>Nama Artikel</label>
//                                                         <input className="form-control" type="text"
//                                                         id="nama_artikel"
//                                                         name="nama_artikel"
//                                                         onChange={handleInput}
//                                                         value={artikelInput.nama_artikel}
//                                                         />
//                                                         <small className='text-danger'>{error.nama_artikel}</small>
//                                                     </div>
//                                                     <div className="form-group">
//                                                         <label>Isi Artikel</label>
//                                                         <textarea className="form-control" type="text" rows="3"
//                                                         id="isi_artikel"
//                                                         name="isi_artikel"
//                                                         onChange={handleInput}
//                                                         value={artikelInput.isi_artikel}
//                                                         />
//                                                         <small className='text-danger'>{error.isi_artikel}</small>
//                                                     </div>
//                                                 </div>
//                                                 <button
//                                                     type='submit' className='btn btn-primary btn-user btn-block'>
//                                                      Update
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </form>
//                         </div>
//                     </div>
//                 </div>
//                 <Footer />
//             </div>
//         </div>
//         )
//         }

// export default EditArtikel;

import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import Footer from '../Footer'
import Nav from '../Nav'
import Sidebar from '../Sidebar'
import swal from 'sweetalert'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { NavLink } from "reactstrap"
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../css/main.min.css'

function EditArtikel(props) {
    const api = 'http://127.0.0.1:8000/api';
    const { id } = useParams()
    console.log(id)

    const [artikelInput, setArtikel] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [picture, setPicture] = useState([]);
    const navigate = useNavigate();

    const getArtikel = async () => {
        try {
            const artikel_id = id;
            setLoading(true)
            const res = await axios.get(api + `/artikel/edit/${artikel_id}`)
            setLoading(false)
            if (res.data.status === 200) {
                setArtikel(res.data.artikel);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/artikel");
            }
        }
        catch (err) {
            setLoading(false)
            return navigate("/artikel");
        }
    }
    useEffect(() => {

        getArtikel();

    }, [props])

    const handleInput = (e) => {
        e.persist();
        setArtikel({ ...artikelInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        e.persist();
        setPicture({ image: e.target.files[0] })
        console.log(picture.image)
    }

    let editorState = EditorState.createEmpty();
    const [isiArtikel, setIsiArtikel] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setIsiArtikel(editorState);
    }

    const updateArtikel = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', picture.image)
        formData.append('tanggal', artikelInput.tanggal)
        formData.append('nama_artikel', artikelInput.nama_artikel)
        formData.append('isi_artikel', artikelInput.isi_artikel.value)

        const artikel_id = id;
        const data = artikelInput;
        const result = await axios.post(api + `/artikel/update/${artikel_id}/?_method=PUT`, formData)
        if (result.data.status === 200) {
            swal("Success", result.data.message, "success")
            setError([]);
        } else if (result.data.status === 422) {
            swal("Data Perlu di Isi", "", "error")
            setError(result.data.errors);
        } else if (result.data.status === 404) {
            swal("Error", result.data.message, "error")
            return navigate("/artikel")
        }
    }

    if (loading === true) {
        return (
            <div>loading</div>
        )
    } else {
        return (
            <div className='page-wrapper'>
                <Nav />
                <div className="content-wrapper">
                    <div className="page-heading">
                        <h1 className="page-title">Basic Form</h1>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href=""><i className="la la-home font-20" /></a>
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
                                        <NavLink href="/artikel"><button className='genric-btn info radius mr-4'>Back</button></NavLink>
                                    </div>
                                    <div className="ibox-body">
                                        <form onSubmit={updateArtikel}>
                                            <div className="form-group">
                                                <label>Tanggal</label>
                                                <input className="form-control" type="date"
                                                    id="tanggal"
                                                    name="tanggal"
                                                    onChange={handleInput}
                                                    value={artikelInput.tanggal}
                                                />
                                                <small className='text-danger'>{error.tanggal}</small>
                                            </div>
                                            <div className="form-group">
                                                <label>Judul Artikel</label>
                                                <input type="text" className="form-control mt-3" placeholder="Judul Artikel"
                                                    id="nama_artikel"
                                                    name="nama_artikel"
                                                    onChange={handleInput}
                                                    value={artikelInput.nama_artikel}
                                                />
                                                <small className='text-danger'>{error.nama_artikel}</small>
                                            </div>
                                            <div className="form-group">
                                                <label>Tambahkan Gambar</label>
                                                <input type="file"
                                                    className='form-control'
                                                    style={{ border: "none" }}
                                                    name="image"
                                                    onChange={handleImage}
                                                />
                                                <img className='mt-3 ml-3' style={{ width: 150, height: 100 }} src={"http://localhost:8000/" + artikelInput.image} alt="" />
                                                <small className='text-danger'>{error.image}</small>
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
                                                <textarea style={{ display: 'none' }} disabled ref={(val) => artikelInput.isi_artikel = val} value={draftToHtml(convertToRaw(isiArtikel.getCurrentContent()))} rows="3" />
                                                <small className='text-danger'>{error.isi_artikel}</small>
                                            </div>
                                            <button
                                                type='submit' className='genric-btn info radius btn-user btn-block'>
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
}

export default EditArtikel;
