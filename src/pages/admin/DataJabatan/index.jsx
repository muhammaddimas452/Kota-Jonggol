import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Nav from '../Nav'
import axios from '../../../api/axiosClient'
import { NavLink } from 'reactstrap'
import swal from 'sweetalert';
import '../css/main.min.css'
import '../vendors/bootstrap/dist/css/bootstrap.min.css'
import '../vendors/themify-icons/css/themify-icons.css'
import { Modal, Col, Container, Row, Button, Table } from 'react-bootstrap'

export default function Jabatan(props) {
    const [jabatan, setJabatan] = useState();
    const navigate = useNavigate();
    const deleteCategory = (e, jabatan_id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting"
        axios.delete(`/jabatan/delete/${jabatan_id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove()
            } else if (res.data.status === 500) {
                swal("Success", res.data.message, "Success");
                thisClicked.innerText = "Deleting"
            }
        });
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
    }, [props])

    const [modalShow, setModalShow] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [detailJabatan, setDetailJabatan] = useState({});
    const readJabatan = async (id) => {
        try {
            const jabatan_id = id;
            const res = await axios.get(`/jabatan/edit/${jabatan_id}`)
            if (res.data.status === 200) {
                setDetailJabatan(res.data.jabatan);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                return navigate("/jabatan");
            }
        }
        catch (err) {
            return navigate("/jabatan");
        }
    }
    console.log(detailJabatan)

    const detail = (id) => {
        setUpdateModal(true)
        readJabatan(id)
    }

    return (
        <div className='page-wrapper'>
            <Nav />
            <div className="content-wrapper">
                {/* START PAGE CONTENT*/}
                <div className="page-heading">
                    <h1 className="page-title">DataTables</h1>

                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html"><i className="la la-home font-20" /></a>
                        </li>
                        <li className="breadcrumb-item">DataTables</li>
                    </ol>
                </div>
                <div className="page-content fade-in-up">
                    <div className="ibox">
                        <div className="ibox-head">
                            <div className="ibox-title">Data Table</div>
                            <NavLink onClick={() => setModalShow(true)}><button className='genric-btn info radius'>Tambah Data</button></NavLink>
                        </div>
                        <div className="ibox-body">
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        {/* <th>No</th> */}
                                        <th className='col-lg-2'>Nama Jabatan</th>
                                        <th className='col-lg-2'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jabatan?.map((jabatan, index) => (
                                        <tr key={index} >
                                            <td>{jabatan.nama_jabatan}</td>
                                            <td>
                                                <button className="genric-btn danger radius ml-3" onClick={(e) => deleteCategory(e, jabatan.id)}>Delete</button>
                                                <button onClick={() => detail(jabatan.id)} className="genric-btn success radius ml-3">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                <footer className="page-footer">
                    <div className="font-13">2018 © <b>AdminCAST</b> - All rights reserved.</div>
                    <div className="to-top"><i className="fa fa-angle-double-up" /></div>
                </footer>
                <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
                <UpdateModal show={updateModal} detail={detailJabatan} onHide={() => setUpdateModal(false)} />
            </div>
        </div>
    )
}

function UpdateModal(props) {
    const [nama, setNama] = useState();
    const [error, setError] = useState([]);

    const updateJabatan = (e) => {
        e.preventDefault();
        const jabatan_id = props.detail.id;
        axios.put(`/jabatan/update/${jabatan_id}`, {
            nama_jabatan: nama
        })
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success")
                    window.location.reload()
                    setError([]);
                } else if (res.data.status === 422) {
                    swal("Data Perlu di Isi", "", "error")
                    setError(res.data.errors);
                }else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error")
                }
            })
    }
    useEffect(() =>{
        setNama(props.detail.nama_jabatan)
    },[props])

        return (
            <div>
                <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Nama Jabatan
                        </Modal.Title>
                    </Modal.Header>
                    <div>
                        <form onSubmit={updateJabatan}>
                            <Modal.Body className="show-grid">
                                <Container>
                                    <div className="form-group">
                                        <label>Nama Jabatan</label>
                                        <input className="form-control" type="text"
                                            id="nama_jabatan"
                                            name="nama_jabatan"
                                            onChange={(e)=> setNama(e.target.value) }
                                            value={nama}
                                        />
                                         <small className='text-danger'>{error.nama_jabatan}</small>
                                    </div>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type='submit' className="genric-btn info radius small">Update</button>
                            </Modal.Footer>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }

function MydModalWithGrid(props) {
    const [jabatan, setJabatan] = useState({
        nama_jabatan: '',

    });
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e) => {
        e.persist();
        setJabatan({ ...jabatan, [e.target.name]: e.target.value })
    }

    const TambahJabatan = async (e) => {
        e.preventDefault();
        const result = await axios.post(`/jabatan/add`, {
            nama_jabatan: jabatan.nama_jabatan,
        })
        console.log(result)
        if (result?.data?.status === 200) {
            swal("Success", result.data.message, "success");
            window.location.reload()
            return navigate("/jabatan");
        }
        else if (result.data?.status === 422) {
            swal("Data Perlu di Isi", "", "error");
            setError(result.data.errors);
        }
        else if (result?.data?.status === 404) {
            swal("Error", result.data.message, "error");
        }
    }

    if (loading === true) {
        return (
            <div>loading</div>
        )
    } else {
        return (
            <div>
                <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Tambah Jabatan
                        </Modal.Title>
                    </Modal.Header>
                    <div>
                        <form onSubmit={TambahJabatan}>
                            <Modal.Body className="show-grid">
                                <Container>
                                    <div className="form-group">
                                        <label>Nama Jabatan</label>
                                        <input className="form-control" type="text"
                                            id="nama_jabatan"
                                            name="nama_jabatan"
                                            onChange={handleInput}
                                            value={jabatan.nama_jabatan}
                                        />
                                        <small className='text-danger'>{error.jumlah_penduduk}</small>
                                    </div>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type='submit' className="genric-btn info radius small">Tambah</button>
                            </Modal.Footer>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

