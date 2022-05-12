import React, { useState } from 'react';
import Nav from '../Nav'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate } from "react-router"
import axios from '../../../api/axiosClient'
import swal from 'sweetalert';
import '../css/main.min.css'

export default function TambahPotensi() {
    const [values, setValues] = useState({
        nama_potensi: '',
        isi_potensi: '',
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
    const [isiPotensi, setIsiPotensi] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setIsiPotensi(editorState);
    }

    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', picture.image)
        formData.append('nama_potensi', values.nama_potensi)
        formData.append('isi_potensi', values.isi_potensi.value)

        const result = await axios.post(`/artikel-potensi/add`, formData)
        console.log(result)
        if (result?.data?.status === 200) {
            swal("Success", result.data.message, "success")
            return navigate("/potensi")
        } else if (result?.data?.status === 422) {
            swal("Data Perlu di Isi", "", "error")
            setError(result.data.errors);
        } 
    }
    return (
        <div className='page-wrapper'>
            <Nav />
            <div className="content-wrapper">
                <div className="page-heading">
                    <h1 className="page-title">Tambah Data Potensi</h1>
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
                                    <div className="ibox-title">Tambah Data Potensi</div>
                                </div>
                                <div className="ibox-body">
                                    <form onSubmit={onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="roundText">Judul Potensi</label>
                                            <input type="text" className="form-control mt-3" placeholder="Judul Potensi"
                                                id="nama_potensi"
                                                name="nama_potensi"
                                                value={values.nama_potensi}
                                                onChange={onChangeValue}
                                            />
                                            <small className='text-danger'>{error.nama_potensi}</small>
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
                                            <label>Isi Potensi</label>
                                            <Editor
                                                editorState={isiPotensi}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="wrapperClassName"
                                                editorClassName="editorClassName"
                                                onEditorStateChange={onEditorStateChange}
                                            />
                                            <textarea style={{ display: 'none' }} disabled ref={(val) => values.isi_potensi = val} 
                                            value={draftToHtml(convertToRaw(isiPotensi.getCurrentContent()))} rows="3" />
                                            <small className='text-danger'>{error.isi_potensi}</small>
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