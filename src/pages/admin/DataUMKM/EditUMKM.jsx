import React, { useEffect, useState } from 'react'
import axios from '../../../api/axiosClient'
import Nav from '../Nav'
import swal from 'sweetalert'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { NavLink } from "reactstrap"
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../css/main.min.css'

function EditUmkm(props) {
    const { id } = useParams()

    const [umkmInput, setUmkm] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [picture, setPicture] = useState([]);
    const navigate = useNavigate();

    const getUmkm = async () => {
        try {
            const umkm_id = id;
            setLoading(true)
            const res = await axios.get(`/data-umkm/edit/${umkm_id}`)
            setLoading(false)
            if (res.data.status === 200) {
                setUmkm(res.data.artikel);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/data-umkm");
            }
            console.log(res)
        }
        catch (err) {
            setLoading(false)
            return navigate("/data-umkm");
        }
        
    }
    useEffect(() => {

        getUmkm();

    }, [props])

    const handleInput = (e) => {
        e.persist();
        setUmkm({ ...umkmInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        e.persist();
        setPicture({ image: e.target.files[0] })
    }

    let editorState = EditorState.createEmpty();
    const [isiUmkm, setIsiUmkm] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setIsiUmkm(editorState);
    }

    const updateUmkm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', picture.image)
        formData.append('nama_usaha', umkmInput.nama_usaha)
        formData.append('isi_usaha', umkmInput.isi_usaha.value)

        const umkm_id = id;
        const data = umkmInput;
        const result = await axios.post(`/data-umkm/update/${umkm_id}/?_method=PUT`, formData)
        if (result.data.status === 200) {
            swal("Success", result.data.message, "success")
            setError([]);
        } else if (result.data.status === 422) {
            swal("Data Perlu di Isi", "", "error")
            setError(result.data.errors);
        } else if (result.data.status === 404) {
            swal("Error", result.data.message, "error")
            return navigate("/data-umkm")
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
                        <h1 className="page-title">Edit Data UMKM</h1>
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
                                        <div className="ibox-title">Edit Data UMKM</div>
                                        <NavLink href="/data-umkm"><button className='genric-btn info radius mr-4'>Back</button></NavLink>
                                    </div>
                                    <div className="ibox-body">
                                        <form onSubmit={updateUmkm}>
                                            <div className="form-group">
                                                <label>Judul Usaha</label>
                                                <input type="text" className="form-control mt-3" placeholder="Judul Usaha"
                                                    id="nama_usaha"
                                                    name="nama_usaha"
                                                    onChange={handleInput}
                                                    value={umkmInput.nama_usaha}
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
                                                <img className='mt-3 ml-3' style={{ width: 150, height: 100 }} src={umkmInput.image} alt="" />
                                                <small className='text-danger'>{error.image}</small>
                                            </div>
                                            <div className="form-group">
                                                <label>Isi Usaha</label>
                                                <Editor
                                                    editorState={isiUmkm}
                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperClassName"
                                                    editorClassName="editorClassName"
                                                    onEditorStateChange={onEditorStateChange}
                                                />
                                                <textarea style={{ display: 'none' }} disabled ref={(val) => umkmInput.isi_usaha = val} value={draftToHtml(convertToRaw(isiUmkm.getCurrentContent()))} rows="3" ></textarea>
                                                <small className='text-danger'>{error.isi_usaha}</small>
                                            </div>
                                            <button
                                                type='submit' className='genric-btn info radius btn-user btn-block'>
                                                Update Data
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

export default EditUmkm;
