import React, { useState } from 'react'
import { Formik } from "formik"
import { useSelector } from "react-redux";
import { resetPassword } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from 'react-router'
import swal from 'sweetalert';

export default function ResetPassword  (props) {
    // const [errorBE, setErrorBE] = React.useState({});
    // const initialState = {
    //     token: props.token,
    //     password: "",
    //     confirmPassword: "",
    // };

    // const isLoading = useSelector((state) => state.auth.isLoading);
    // const navigate = useNavigate();
    // const dispatch = useDispatch();


    // const onSubmit = async (values) => {
    //     const result = await dispatch(resetPassword(values));
    //     console.log("result", result);
    //     if (result.status === "Failed") {
    //         setErrorBE(result);
    //         alert(result?.msg)
    //     }
    //     if (result.status === "Success") {
    //         return navigate("/login");
    //     }
    // };

    const api = 'http://127.0.0.1:8000/api';

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

    const changePassword = (e) => {
        const value = e.target.value
        setPassword(value)
        if (!value) {
            setErrorPassword("Password tidak boleh kosong")
        } else {
            setErrorPassword("")
        }
    }

    const changeConfirmPassword = (e) => {
        const value = e.target.value
        setConfirmPassword(value)
        if (!value) {
            setErrorConfirmPassword("Konfirmasi Password tidak boleh kosong")
        } else if (password !== value) {
            setErrorConfirmPassword("Konfirmasi Password Tidak Cocok")
        } else {
            setErrorConfirmPassword("")
        }
    }
    const { token } = useParams()
    const simpan = () => {
        const data = {
            password: password,
            token: token
        }
        console.log(data)
        axios.put(api + `/password/reset/`, data)
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success")
                } else if (res.data.status === 500) {
                    swal("Error", res.data.message, "error")
                }
            })
    }
    const myStyle = {
        marginTop: "120px",
        position: "realtive",
    };

    return (
        <div className="container z-depth-5" style={myStyle}>
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card" style={{ borderRadius: '1rem'}}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-5 d-none d-md-block" style={{marginTop:100}}>
                                <img src="assets/img/forgotpw.png" alt="login form" className="image-fluid" style={{ width: 500 }} />
                            </div>
                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-lg-5 text-black">
                                    <form onSubmit={simpan}>
                                        <div className="d-flex align-items-center mb-3 pb-1">
                                            <img src="assets/img/logo/jonggol.png" alt="" style={{ width: 60, height: 70 }} />
                                            <span className="h1 fw-bold mb-0 ml-3">Admin Kota Jonggol</span>
                                        </div>
                                        <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>Ganti Password</h3>
                                        <div className="form-outline mb-4">
                                            <input type="email" className="form-control form-control-lg"
                                                id='email'
                                                name='email'
                                                value={password}
                                                onChange={changePassword} />
                                            <label className="form-label" htmlFor="email">Password</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="email" className="form-control form-control-lg"
                                                id='email'
                                                name='email'
                                                value={confirmPassword}
                                                onChange={changeConfirmPassword} />
                                            <label className="form-label" htmlFor="email">Konfirmasi Password</label>
                                        </div>
                                        <div className="pt-1 mb-4">
                                            <button className="btn btn-dark btn-lg btn-block" type="button">Reset Password</button>
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