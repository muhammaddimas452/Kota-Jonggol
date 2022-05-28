import React, { useState } from 'react';
import Nav from '../Nav'
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import axios from '../../../api/axiosClient'
import '../css/main.min.css'

export default function TambahKegiatanRutin() {

    const [kegiatanInput, setKegiatan] = useState({
        tanggal_kegiatan: "",
        nama_kegiatan: "",
        status: "",

    });
    const [picture, setPicture] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setKegiatan({ ...kegiatanInput, [e.target.name]: e.target.value })
    }
    const handleImage = (e) => {
        e.persist();
        setPicture({ image: e.target.files[0] })
    }

    const navigate = useNavigate();
    const [error, setError] = useState([]);
    const submitKegiatan = async (e) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Proccess...."
        const formData = new FormData();
        formData.append('image', picture.image)
        formData.append('tanggal_kegiatan', kegiatanInput.tanggal_kegiatan)
        formData.append('nama_kegiatan', kegiatanInput.nama_kegiatan)
        formData.append('status', kegiatanInput.status)

        const res = await axios.post(`/kegiatan-rutin/add`, formData)
        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");
            setError([]);
            return navigate("/kegiatan-rutin");
        }
        else if (res.data.status === 422) {
            swal("Data Perlu di Isi", "", "error");
            thisClicked.innerText = "Proccess...."
            setError(res.data.errors);
        }
    }

    return (
        <div className='page-wrapper'>
            <Nav />
            <div className="content-wrapper">
                <div className="page-heading">
                    <h1 className="page-title">Tambah Data Kegiatan Rutin</h1>
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
                                    <div className="ibox-title">Tambah Data Kegiatan Rutin</div>
                                </div>
                                <div className="ibox-body">
                                    <form>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-12 col-6">
                                                    <div className="form-group">
                                                        <label>Pelaksanaan Kegiatan</label>
                                                        <input className="form-control" type="date" placeholder="Masukkan Nama Artikel"
                                                            id="tanggal_kegiatan"
                                                            name="tanggal_kegiatan"
                                                            onChange={handleInput}
                                                            value={kegiatanInput.tanggal_kegiatan}
                                                        />
                                                        <small className='text-danger'>{error.tanggal_kegiatan}</small>
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
                                                        <small className='text-danger'>{error.image}</small>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Keterangan</label>
                                                        <div className="radio">
                                                            <label>
                                                                <input type="radio" name="status" id="status" onChange={handleInput} value="1" />Sudah Dilaksanakan
                                                            </label>
                                                        </div>
                                                        <div className="radio">
                                                            <label>
                                                                <input type="radio" name="status" id="status" onChange={handleInput} value="0" />Belum Dilaksanakan
                                                            </label>
                                                        </div>
                                                        <small className='text-danger'>{error.status}</small>
                                                    </div>
                                                    <button
                                                        onClick={submitKegiatan} className='genric-btn info radius btn-user btn-block'>
                                                        Tambah Data
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