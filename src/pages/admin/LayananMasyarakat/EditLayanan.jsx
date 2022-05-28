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
import logo from '../assets/jonggol.png'

function EditLayanan(props) {
    const { id } = useParams()

    const [layananInput, setLayanan] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [picture, setPicture] = useState([]);
    const navigate = useNavigate();

    const getLayanan = async () => {
        try {
            const layanan_id = id;
            setLoading(true)
            const res = await axios.get(`/layanan/edit/${layanan_id}`)
            setLoading(false)
            if (res.data.status === 200) {
                setLayanan(res.data.layanan);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/layanan");
            }
            console.log(res)
        }
        catch (err) {
            setLoading(false)
            return navigate("/layanan");
        }
        
    }
    useEffect(() => {

        getLayanan();

    }, [props])

    const handleInput = (e) => {
        e.persist();
        setLayanan({ ...layananInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        e.persist();
        setPicture({ image: e.target.files[0] })
    }

    let editorState = EditorState.createEmpty();
    const [isiLayanan, setIsiLayanan] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setIsiLayanan(editorState);
    }

    const updateLayanan = async (e) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Proccess...."
        const formData = new FormData();
        formData.append('image', picture.image)
        formData.append('nama_layanan', layananInput.nama_layanan)
        formData.append('isi_layanan', layananInput.isi_layanan.value)

        const layanan_id = id;
        const data = layananInput;
        const result = await axios.post(`/layanan/update/${layanan_id}/?_method=PUT`, formData)
        if (result.data.status === 200) {
            swal("Success", result.data.message, "success")
            return navigate("/layanan")
        } else if (result.data.status === 422) {
            swal("Data Perlu di Isi", "", "error")
            thisClicked.innerText = "Proccess...."
            setError(result.data.errors);
        } else if (result.data.status === 404) {
            swal("Error", result.data.message, "error")
            return navigate("/layanan")
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
                        <h1 className="page-title">Edit Data Layanan Masyarakat</h1>
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
                                        <div className="ibox-title">Edit Data Layanan Masyarakat</div>
                                        <NavLink href="/layanan"><button className='genric-btn info radius mr-4'>Back</button></NavLink>
                                    </div>
                                    <div className="ibox-body">
                                        <form>
                                            <div className="form-group">
                                                <label>Judul Layanan</label>
                                                <input type="text" className="form-control mt-3" placeholder="Judul Layanan"
                                                    id="nama_layanan"
                                                    name="nama_layanan"
                                                    onChange={handleInput}
                                                    value={layananInput.nama_layanan}
                                                />
                                                <small className='text-danger'>{error.nama_layanan}</small>
                                            </div>
                                            <div className="form-group">
                                                <label>Tambahkan Gambar</label>
                                                <input type="file"
                                                    className='form-control'
                                                    style={{ border: "none" }}
                                                    name="image"
                                                    onChange={handleImage}
                                                />
                                                <img className='mt-3 ml-3' style={{ width: 150, height: 100 }} src={layananInput.image} alt="" />
                                                <small className='text-danger'>{error.image}</small>
                                            </div>
                                            <div className="form-group">
                                                <label>Isi Layanan</label>
                                                <Editor
                                                    editorState={isiLayanan}
                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperClassName"
                                                    editorClassName="editorClassName"
                                                    onEditorStateChange={onEditorStateChange}
                                                />
                                                <textarea style={{ display: 'none' }} disabled ref={(val) => layananInput.isi_layanan = val} value={draftToHtml(convertToRaw(isiLayanan.getCurrentContent()))} rows="3" ></textarea>
                                                <small className='text-danger'>{error.isi_layanan}</small>
                                            </div>
                                            <button
                                                onClick={updateLayanan} className='genric-btn info radius btn-user btn-block'>
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

export default EditLayanan;
