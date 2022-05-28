import React, { useEffect, useState } from 'react'
import axios from '../../../api/axiosClient'
import Nav from '../Nav'
import swal from 'sweetalert'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { NavLink } from "reactstrap"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../css/main.min.css'
import logo from '../assets/jonggol.png'

function EditInfoWilayah(props) {
    const { id } = useParams()
    console.log(id)

    const [infoWilayah, setInfoWilayah] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getInfoWilayah = async () => {
        try {
            const infowilayah_id = id;
            setLoading(true)
            const res = await axios.get(`/infowilayah/edit/${infowilayah_id}`)
            setLoading(false)
            console.log(res)
            if (res.data.status === 200) {
                setInfoWilayah(res.data.infowilayah);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                setError(res.data.errors);
            }
        }
        catch (err) {
            setLoading(false)
        }
    }
    useEffect(() => {
        getInfoWilayah();
    }, [props])

    const changeValue = (e) => {
        e.persist();
        setInfoWilayah({ ...infoWilayah, [e.target.name]: e.target.value });
    }

    const updateInfoWilayah = (e) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Proccess...."
        const infowilayah_id = id;
        axios.put(`/infowilayah/update/${infowilayah_id}`, {
            nama_desa: infoWilayah.nama_desa,
            rt: infoWilayah.rt,
            rw: infoWilayah.rw,
            kepala_desa: infoWilayah.kepala_desa,
        })
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success")
                    return navigate("/datainfowilayah")
                } else if (res.data.status === 422) {
                    swal("Data Perlu di Isi", "", "error")
                    thisClicked.innerText = "Proccess...."
                    setError(res.data.errors);
                } else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error")
                }
                console.log(res)
            })
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
                    <h1 className="page-title">Edit Data Wilayah</h1>
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
                                    <div className="ibox-title">Edit Data Wilayah</div>
                                    <NavLink href="/datainfowilayah"><button className='genric-btn info radius mr-4'>Back</button></NavLink>
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
                                            onClick={updateInfoWilayah} className='genric-btn info radius btn-user btn-block'>
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

export default EditInfoWilayah;
