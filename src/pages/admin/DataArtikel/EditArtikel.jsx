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

function EditArtikel(props) {
    const { id } = useParams()

    const [artikelInput, setArtikel] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [picture, setPicture] = useState([]);
    const navigate = useNavigate();

    const getArtikel = async () => {
        try {
            const artikel_id = id;
            setLoading(true)
            const res = await axios.get(`/artikel/edit/${artikel_id}`)
            setLoading(false)
            if (res.data.status === 200) {
                setArtikel(res.data.artikel);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/artikel");
            }
            console.log(res)
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
    }

    let editorState = EditorState.createEmpty();
    const [isiArtikel, setIsiArtikel] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setIsiArtikel(editorState);
    }

    const updateArtikel = async (e) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Proccess...."
        const formData = new FormData();
        formData.append('image', picture.image)
        formData.append('tanggal', artikelInput.tanggal)
        formData.append('nama_artikel', artikelInput.nama_artikel)
        formData.append('isi_artikel', artikelInput.isi_artikel.value)

        const artikel_id = id;
        const data = artikelInput;
        const result = await axios.post(`/artikel/update/${artikel_id}`, formData)
        if (result.data.status === 200) {
            swal("Success", result.data.message, "success")
            return navigate("/artikel")
        } else if (result.data.status === 422) {
            swal("Data Perlu di Isi", "", "error")
            thisClicked.innerText = "Proccess...."
            setError(result.data.errors);
        } else if (result.data.status === 404) {
            swal("Error", result.data.message, "error")
            return navigate("/artikel")
        }
    }
        return (
            <div className='page-wrapper'>
                <Nav />
                <div className="content-wrapper">
                    <div className="page-heading">
                        <h1 className="page-title">Edit Data Artikel</h1>
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
                                        <div className="ibox-title">Edit Data Artikel</div>
                                        <NavLink href="/artikel"><button className='genric-btn info radius mr-4'>Back</button></NavLink>
                                    </div>
                                    <div className="ibox-body">
                                        <form>
                                        <input type="hidden" name='_method' value="PUT" />
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
                                                <img className='mt-3 ml-3' style={{ width: 150, height: 100 }} src={artikelInput.image} alt="" />
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
                                                <textarea style={{ display: 'none' }} disabled ref={(val) => artikelInput.isi_artikel = val} value={draftToHtml(convertToRaw(isiArtikel.getCurrentContent()))} rows="3" ></textarea>
                                                <small className='text-danger'>{error.isi_artikel}</small>
                                            </div>
                                            <button
                                                onClick={updateArtikel} className='genric-btn info radius btn-user btn-block'>
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

export default EditArtikel;
