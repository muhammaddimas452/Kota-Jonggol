import React, { useEffect, useState } from 'react';
import Nav from '../Nav'
import swal from 'sweetalert';
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { NavLink } from "reactstrap"
import logo from '../assets/jonggol.png'
import axios from '../../../api/axiosClient'
import '../css/main.min.css'

export default function EditKegiatan() {

    const { id } = useParams()
    const [kegiatanInput, setKegiatan] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false)
    const [picture, setPicture] = useState([]);
    const navigate = useNavigate();

    const getKegiatan = async () => {
        try {
            const kegiatan_id = id;
            setLoading(true)
            const res = await axios.get(`/kegiatan/edit/${kegiatan_id}`)
            console.log(res)
            setLoading(false)
            if (res.data.status === 200) {
                setKegiatan(res.data.kegiatan);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/kegiatan");
            }
        }
        catch (err) {
            setLoading(false)
            return navigate("/kegiatan");
        }
    }

    useEffect(() => {

        getKegiatan();

    }, [])


    const handleInput = (e) => {
        e.persist();
        setKegiatan({ ...kegiatanInput, [e.target.name]: e.target.value })
    }
    const handleImage = (e) => {
        e.persist();
        setPicture({ image: e.target.files[0] })
    }

    const updateKegiatan = async (e) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Proccess...."
        const formData = new FormData();
        formData.append('image', picture.image)
        formData.append('tanggal', kegiatanInput.tanggal)
        formData.append('nama_kegiatan', kegiatanInput.nama_kegiatan)
        formData.append('status', kegiatanInput.status)

        const kegiatan_id = id;
        const res = await axios.post(`/kegiatan/update/${kegiatan_id}`, formData)
        if (res.data.status === 200) {
            swal("Success", res.data.message, "success")
            return navigate("/kegiatan")
        } else if (res.data.status === 422) {
            swal("Data Perlu di Isi", "", "error")
            thisClicked.innerText = "Proccess...."
            setError(res.data.errors);
        }
    }

        return (
            <div className='page-wrapper'>
                <Nav />
      
                <div className="content-wrapper">
                    <div className="page-heading">
                        <h1 className="page-title">Edit Data Kegaiatan</h1>
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
                                        <div className="ibox-title">Edit Data Kegaiatan</div>
                                        <NavLink href="/data-kegiatan"><button className='genric-btn info radius mr-4'>Back</button></NavLink>
                                    </div>
                                    <div className="ibox-body">
                                        <form>
                                        <input type="hidden" name='_method' value="PUT" />
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-lg-12 col-6">
                                                        <div className="form-group">
                                                            <label>Pelaksanaan Kegiatan</label>
                                                            <input className="form-control" type="date" placeholder="Masukkan Nama Artikel"
                                                                id="tanggal"
                                                                name="tanggal"
                                                                onChange={handleInput}
                                                                value={kegiatanInput.tanggal}
                                                            />
                                                            <small className='text-danger'>{error.tanggal}</small>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Nama Kegiatan</label>
                                                            <input className="form-control" type="text" row="3" placeholder='Isi Nama Kegiatan'
                                                                id="nama_kegiatan"
                                                                name="nama_kegiatan"
                                                                onChange={handleInput}
                                                                value={kegiatanInput.nama_kegiatan}
                                                            />
                                                            <small className='text-danger'>{error.nama_kegiatan}</small>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Tambahkan Gambar</label>
                                                            <input type="file"
                                                                className='form-control'
                                                                style={{ border: "none" }}
                                                                name="image"
                                                                onChange={handleImage}
                                                            />
                                                            <img className='mt-3 ml-3' style={{ width: 150, height: 100 }} src={kegiatanInput.image} alt="" />
                                                            <small className='text-danger'>{error.image}</small>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Keterangan</label>
                                                            <div className="radio">
                                                                {(() => {
                                                                    if (kegiatanInput.status === 1) {
                                                                        return (
                                                                            <label>
                                                                                <input type="radio" name="status" id="status" onChange={handleInput} value="1" checked />Sudah Dilaksanakan
                                                                            </label>
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <label>
                                                                                <input type="radio" name="status" id="status" onChange={handleInput} value="1" />Sudah Dilaksanakan
                                                                            </label>
                                                                        )
                                                                    }
                                                                })()}
                                                            </div>
                                                            <div className="radio">
                                                                {(() => {
                                                                    if (kegiatanInput.status === 0) {
                                                                        return (
                                                                            <label>
                                                                                <input type="radio" name="status" id="status" onChange={handleInput} value="0" checked />Belum Dilaksakan
                                                                            </label>
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <label>
                                                                                <input type="radio" name="status" id="status" onChange={handleInput} value="0" />Belum Dilaksakan
                                                                            </label>
                                                                        )
                                                                    }
                                                                })()}
                                                            </div>
                                                            <small className='text-danger'>{error.status}</small>
                                                        </div>
                                                        <button
                                                            onClick={updateKegiatan} className='genric-btn info radius btn-user btn-block'>
                                                            Update Data
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
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
