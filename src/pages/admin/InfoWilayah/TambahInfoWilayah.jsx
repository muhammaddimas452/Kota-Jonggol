import React, { useState } from 'react';
import Nav from '../Nav'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate } from "react-router"
import axios from '../../../api/axiosClient'
import swal from 'sweetalert';
import '../css/main.min.css'

export default function TambahArtikel() {
    
    const [infoWilayah, setInfoWilayah] = useState({
        nama_desa: '',
        rt: '',
        rw: '',
        kepala_desa: ''
    })
    const navigate = useNavigate();
    const [error, setError] = useState([]);
    const changeValue = (e) => {
        e.persist();
        setInfoWilayah({ ...infoWilayah, [e.target.name]: e.target.value })
    }

    const TambahInfoWilayah = async (e) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Proccess...."
        const result = await axios.post(`/infowilayah/add`, {
            nama_desa: infoWilayah.nama_desa,
            rt: infoWilayah.rt,
            rw: infoWilayah.rw,
            kepala_desa: infoWilayah.kepala_desa,
        })
        console.log(result)
        if (result?.data?.status === 200) {
            swal("Success", result.data.message, "success");
            return navigate("/datainfowilayah");
        }
        else if (result.data?.status === 422) {
            swal("Data Perlu di Isi", "", "error");
            thisClicked.innerText = "Proccess...."
            setError(result.data.errors);
        }
        else if (result?.data?.status === 404) {
            swal("Error", result.data.message, "error");
        }
    }
    return (
        <div className='page-wrapper'>
            <Nav />
            <div className="content-wrapper">
                <div className="page-heading">
                    <h1 className="page-title">Tambah Data Wilayah</h1>
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
                                    <div className="ibox-title">Tambah Data Wilayah</div>
                                </div>
                                <div className="ibox-body">
                                    <form>
                                        <div className="form-group col-8">
                                            <label>Nama Desa</label>
                                            <input className="form-control" type="text" placeholder="Masukkan Nama Desa"
                                                id="nama_desa"
                                                name="nama_desa"
                                                onChange={changeValue}
                                                value={infoWilayah.nama_desa}
                                            />
                                            <small className='text-danger'>{error.nama_desa}</small>
                                        </div>
                                        <div className='row col-12'>
                                        <div className="form-group col-4">
                                            <label htmlFor="roundText">RT</label>
                                            <input type="number" className="form-control mt-3" placeholder="RT"
                                                id="rt"
                                                name="rt"
                                                value={infoWilayah.rt}
                                                onChange={changeValue}
                                            />
                                            <small className='text-danger'>{error.rt}</small>
                                        </div>
                                        <div className="form-group col-4">
                                            <label htmlFor="roundText">RW</label>
                                            <input type="number" className="form-control mt-3" placeholder="RW"
                                                id="rw"
                                                name="rw"
                                                value={infoWilayah.rw}
                                                onChange={changeValue}
                                            />
                                            <small className='text-danger'>{error.rw}</small>
                                        </div>
                                        </div>
                                        <div className="form-group col-8">
                                            <label htmlFor="roundText">Kepala Desa</label>
                                            <input type="text" className="form-control mt-3" placeholder="Masukkan Nama Kepala Desa"
                                                id="kepala_desa"
                                                name="kepala_desa"
                                                value={infoWilayah.kepala_desa}
                                                onChange={changeValue}
                                            />
                                            <small className='text-danger'>{error.kepala_desa}</small>
                                        </div>
                                        <button
                                            onClick={TambahInfoWilayah} className='genric-btn info radius btn-user btn-block'>
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