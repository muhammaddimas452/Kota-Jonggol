import React, { useEffect, useState } from 'react'
import axios from '../../../api/axiosClient'
import Nav from '../Nav'
import swal from 'sweetalert'
import logo from '../assets/jonggol.png'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { NavLink } from "reactstrap"
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../css/main.min.css'

function EditBerita(props) {
    const { id } = useParams()

    const [beritaInput, setBerita] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [picture, setPicture] = useState([]);
    const navigate = useNavigate();

    const getBerita = async () => {
        try {
            const berita_id = id;
            setLoading(true)
            const res = await axios.get(`/berita/edit/${berita_id}`)
            setLoading(false)
            if (res.data.status === 200) {
                setBerita(res.data.berita);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/data-berita");
            }
            console.log(res)
        }
        catch (err) {
            setLoading(false)
            return navigate("/data-berita");
        }
        
    }
    useEffect(() => {

        getBerita();

    }, [props])

    const handleInput = (e) => {
        e.persist();
        setBerita({ ...beritaInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        e.persist();
        setPicture({ image: e.target.files[0] })
    }

    let editorState = EditorState.createEmpty();
    const [isiBerita, setIsiBerita] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setIsiBerita(editorState);
    }

    const updateBerita = async (e) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Proccess...."
        const formData = new FormData();
        formData.append('image', picture.image)
        formData.append('nama_berita', beritaInput.nama_berita)
        formData.append('isi_berita', beritaInput.isi_berita.value)

        const berita_id = id;
        const data = beritaInput;
        const result = await axios.post(`/berita/update/${berita_id}/?_method=PUT`, formData)
        if (result.data.status === 200) {
            swal("Success", result.data.message, "success")
            return navigate("/data-berita")
        } else if (result.data.status === 422) {
            swal("Data Perlu di Isi", "", "error")
            thisClicked.innerText = "Proccess...."
            setError(result.data.errors);
        } else if (result.data.status === 404) {
            swal("Error", result.data.message, "error")
            return navigate("/data-berita")
        }
    }

    if (loading === true) {
        return (
            <div id="preloader-active">
            <div className="preloader d-flex align-items-center justify-content-center">
                <div className="preloader-inner position-relative">
                    <div className="preloader-circle" />
                    <div className="preloader-img pere-text">
                        <img src={logo} alt />
                    </div>
                </div>
            </div>
        </div>
        )
    } else {
        return (
            <div className='page-wrapper'>
                <Nav />
                <div className="content-wrapper">
                    <div className="page-heading">
                        <h1 className="page-title">Edit Data Berita</h1>
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
                                        <div className="ibox-title">Edit Data Berita</div>
                                        <NavLink href="/data-berita"><button className='genric-btn info radius mr-4'>Back</button></NavLink>
                                    </div>
                                    <div className="ibox-body">
                                        <form>
                                            <div className="form-group">
                                                <label>Judul Berita</label>
                                                <input type="text" className="form-control mt-3" placeholder="Judul Berita"
                                                    id="nama_berita"
                                                    name="nama_berita"
                                                    onChange={handleInput}
                                                    value={beritaInput.nama_berita}
                                                />
                                                <small className='text-danger'>{error.nama_berita}</small>
                                            </div>
                                            <div className="form-group">
                                                <label>Tambahkan Gambar</label>
                                                <input type="file"
                                                    className='form-control'
                                                    style={{ border: "none" }}
                                                    name="image"
                                                    onChange={handleImage}
                                                />
                                                <img className='mt-3 ml-3' style={{ width: 150, height: 100 }} src={beritaInput.image} alt="" />
                                                <small className='text-danger'>{error.image}</small>
                                            </div>
                                            <div className="form-group">
                                                <label>Isi Berita</label>
                                                <Editor
                                                    editorState={isiBerita}
                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperClassName"
                                                    editorClassName="editorClassName"
                                                    onEditorStateChange={onEditorStateChange}
                                                />
                                                <textarea style={{ display: 'none' }} disabled ref={(val) => beritaInput.isi_berita = val} value={draftToHtml(convertToRaw(isiBerita.getCurrentContent()))} rows="3" ></textarea>
                                                <small className='text-danger'>{error.isi_berita}</small>
                                            </div>
                                            <button
                                                onClick={updateBerita} className='genric-btn info radius btn-user btn-block'>
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

export default EditBerita;
