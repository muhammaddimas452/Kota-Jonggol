import React, { useEffect, useState } from 'react'
import axios from '../../../api/axiosClient'
import Nav from '../Nav'
import swal from 'sweetalert'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { NavLink } from "reactstrap"
import '../css/main.min.css'

function EditJumlahPenduduk(props) {
    const { id } = useParams()

    const [jumlahPendudukInput, setJumlahPenduduk] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const getJumlahPenduduk = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/jumlah-penduduk/edit/2`)
            setLoading(false)
            if (res.data.status === 200) {
                setJumlahPenduduk(res.data.jumlahpenduduk);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/jumlahpenduduk");
            }
        }
        catch (err) {
            setLoading(false)
            return navigate("/jumlahpenduduk");
        }
    }
    useEffect(() => {
        getJumlahPenduduk();
    }, [props])

    const changeValue = (e) => {
        e.persist();
        setJumlahPenduduk({ ...jumlahPendudukInput, [e.target.name]: e.target.value });
    }

    const updateJumlahPenduduk = (e) => {
        e.preventDefault();
        const jumlahPenduduk_id = id;
        const data = jumlahPendudukInput;
        axios.put(`/jumlah-penduduk/update/${jumlahPenduduk_id}`, {
            jumlah_penduduk: jumlahPendudukInput.jumlah_penduduk,
        })
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success")
                    setError([]);
                } else if (res.data.status === 422) {
                    swal("Data Perlu di Isi", "", "error")
                    setError(res.data.errors);
                } else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error")
                    return navigate("/")
                }
            })
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
                        <h1 className="page-title">Basic Form</h1>
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
                                        <div className="ibox-title">Basic form</div>
                                        <NavLink href="/jumlahpenduduk"><button className='btn btn-primary mr-4'>Back</button></NavLink>
                                    </div>
                                    <div className="ibox-body">
                                        <form onSubmit={updateJumlahPenduduk}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-lg-12 col-6">
                                                        <div className="form-group">
                                                            <label>Jumlah Penduduk</label>
                                                            <input className="form-control" type="number"
                                                                id="jumlah_penduduk"
                                                                name="jumlah_penduduk"
                                                                onChange={changeValue}
                                                                value={jumlahPendudukInput.jumlah_penduduk}
                                                            />
                                                            <small className='text-danger'>{error.jumlah_penduduk}</small>
                                                        </div>
                                                        <button
                                                            type='submit' className='btn btn-primary btn-user btn-block'>
                                                            Update
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

}

export default EditJumlahPenduduk;