import React, { useState, useEffect } from 'react';
import Nav from '../Nav'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate } from "react-router"
import { useParams } from 'react-router'
import { NavLink } from "reactstrap"
import axios from '../../../api/axiosClient'
import swal from 'sweetalert';
import '../css/main.min.css'
import logo from '../assets/jonggol.png'

export default function EditPemerintah(props) {

    const [values, setValues] = useState([]);
    const [jabatan, setJabatan] = useState();
    const { id } = useParams()
    const [picture, setPicture] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPemerintah = async () => {
        try {
            const pemerintah_id = id;
            setLoading(true)
            const res = await axios.get(`/pemerintahdesa/edit/${pemerintah_id}`)
            setLoading(false)
            if (res.data.status === 200) {
                setValues(res.data.pemerintahdesa);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/pemerintahdesa");
            }
        }
        catch (err) {
            setLoading(false)
            return navigate("/pemerintahdesa");
        }
    }
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
        getPemerintah();
    }, [props])

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
    const updatePemerintah = async (e) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Proccess...."
        const formData = new FormData();
        formData.append('gambar_pemerintah', picture.gambar_pemerintah)
        formData.append('nama', values.nama)
        formData.append('jabatan_id', values.jabatan_id)

        const pemerintah_id = id;
        const result = await axios.post(`/pemerintahdesa/update/${pemerintah_id}`, formData)
        // console.log(result)
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

    return (
        <div className='page-wrapper'>
            <Nav />
            <div className="content-wrapper">
                <div className="page-heading">
                    <h1 className="page-title">Edit Data Pemerintah Desa</h1>
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
                                    <div className="ibox-title">Edit Data Pemerintah Desa</div>
                                    <NavLink href="/pemerintahdesa"><button className='genric-btn info radius mr-4'>Back</button></NavLink>
                                </div>
                                <div className="ibox-body">
                                    <form>
                                    <input type="hidden" name='_method' value="PUT" />
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
                                        <div className="form-group">
                                            <label>Jabatan</label>
                                            <select className="form-control" id='jabatan_id' name='jabatan_id' 
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
                                            <img className='mt-3 ml-3' style={{ width: 150, height: 150 }} src={values.gambar_pemerintah} alt="" />
                                            <small className='text-danger'>{error.gambar_pemerintah}</small>
                                        </div>

                                        <button
                                            onClick={updatePemerintah} className='genric-btn info radius btn-user btn-block'>
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