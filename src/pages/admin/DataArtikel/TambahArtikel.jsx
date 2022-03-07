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
    const api = "http://127.0.0.1:8000/api"
    const [values, setValues] = useState({
        nama_artikel: '',
        isi_artikel: '',
    });

    const [picture, setPicture] = useState([]);

    const handleImage = (e) => {
        e.persist();
        setPicture({ image: e.target.files[0] })
    }

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
        const formData = new FormData();
        formData.append('image', picture.image)
        formData.append('tanggal', values.tanggal)
        formData.append('nama_artikel', values.nama_artikel)
        formData.append('isi_artikel', values.isi_artikel.value)

        const result = await axios.post(api + `/artikel/add`, formData)
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
        <div className='page-wrapper'>
            <Nav />]
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
                                </div>
                                <div className="ibox-body">
                                    <form onSubmit={onSubmit}>
                                        <div className="form-group">
                                            <label>Tanggal</label>
                                            <input className="form-control" type="date" placeholder="Masukkan Nama Artikel"
                                                id="tanggal"
                                                name="tanggal"
                                                onChange={onChangeValue}
                                                value={values.tanggal}
                                            />
                                            <small className='text-danger'>{error.tanggal}</small>
                                        </div>
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
                                            <label>Tambahkan Gambar</label>
                                            <input type="file"
                                                className='form-control'
                                                style={{ border: "none" }}
                                                name="image"
                                                onChange={handleImage}
                                            />
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
                                            <textarea style={{ display: 'none' }} disabled ref={(val) => values.isi_artikel = val} value={draftToHtml(convertToRaw(isiArtikel.getCurrentContent()))} rows="3" />
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