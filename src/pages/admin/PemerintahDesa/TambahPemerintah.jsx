import React, { useState, useEffect } from 'react';
import Nav from '../Nav'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate } from "react-router"
import axios from '../../../api/axiosClient'
import swal from 'sweetalert';
import '../css/main.min.css'

export default function TambahArtikel(props) {
    const [values, setValues] = useState({
        nama: '',
        jabatan_id: ''
    });

    const [picture, setPicture] = useState([]);

    const handleImage = (e) => {
        e.persist();
        setPicture({ gambar_pemerintah: e.target.files[0] })
    }

    const onChangeValue = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Proccess...."
        const formData = new FormData();
        formData.append('gambar_pemerintah', picture.gambar_pemerintah)
        formData.append('nama', values.nama)
        formData.append('jabatan_id', values.jabatan_id)

        const result = await axios.post(`/pemerintahdesa/add`, formData)
        if (result?.data?.status === 200) {
            swal("Success", result.data.message, "success")
            return navigate("/pemerintahdesa")
        } else if (result?.data?.status === 422) {
            swal("Data Perlu di Isi", "", "error")
            thisClicked.innerText = "Proccess...."
            setError(result.data.errors);
        } else if (result?.data?.status === 404) {
            swal("Error", result.data.message, "error")
        }
    }
    const [jabatan, setJabatan] = useState();

    const getJabatan = async () => {
        try {
            const res = await axios.get(`/jabatan`)
            setJabatan(res.data)
        }
        catch (err) {
        }
    }
    useEffect(() => {
        getJabatan();
    }, [props])
    return (
        <div className='page-wrapper'>
            <Nav />
            <div className="content-wrapper">
                <div className="page-heading">
                    <h1 className="page-title">Tambah Data Pemerintah Desa</h1>
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
                                    <div className="ibox-title">Tambah Data Pemerintah Desa</div>
                                </div>
                                <div className="ibox-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Nama</label>
                                            <input className="form-control" type="text" placeholder="Masukkan Nama"
                                                id="nama"
                                                name="nama"
                                                onChange={onChangeValue}
                                                value={values.nama}
                                            />
                                            <small className='text-danger'>{error.nama}</small>
                                        </div>
                                        <div class="form-group">
                                            <label>Jabatan</label>
                                            <select class="form-control" id='jabatan_id' name='jabatan_id' 
                                                onChange={onChangeValue}
                                                value={values.jabatan_id}>
                                                <option value="">Pilih Jabatan</option>
                                                {jabatan?.map((jabatans, index) => (   
                                                <option key={index} value={jabatans.id}>{jabatans.nama_jabatan}</option>
                                                ))}
                                            </select>
                                            <small className='text-danger'>{error.jabatan_id}</small>
                                        </div>
                                        <div className="form-group">
                                            <label>Tambahkan Gambar</label>
                                            <input type="file"
                                                className='form-control'
                                                style={{ border: "none" }}
                                                name="gambar_pemerintah"
                                                onChange={handleImage}
                                            />
                                            <small className='text-danger'>{error.gambar_pemerintah}</small>
                                        </div>

                                        <button
                                            onClick={onSubmit} className='genric-btn info radius btn-user btn-block'>
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