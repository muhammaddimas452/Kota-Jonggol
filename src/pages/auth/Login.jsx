import React, { useState } from 'react'
import { Formik } from "formik"
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const Login = () => {

    const initialState = {
        email: "",
        password: "",
    };

    const [isRevealPwd, setIsRevealPwd] = useState(false);

    const [error, setError] = useState('');
    const isLoading = useSelector((state) => state.auth.isLoading);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmit = async (values) => {
        const result = await dispatch(authLogin(values));
        if (result.status === "error") {
            setError("Email Atau Password Salah");
        }
        if (result.status === "success") {
            return navigate("/dashboard");
        }
    };

    const myStyle = {
        marginTop: "120px",
        position: "realtive",
    };

    return (
        <div className="container" style={myStyle}>
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card" style={{ borderRadius: '1rem', marginbottom: 50 }}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-5 d-none d-md-block">
                                <img src="assets/img/admin.jpg" alt="login form" className="image-fluid" style={{ width: 500 }} />
                            </div>
                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-lg-5 text-black">
                                    <Formik
                                        initialValues={initialState}
                                        enableReinitialize
                                        onSubmit={onSubmit}
                                    >
                                        {({
                                            values,
                                            errors,
                                            touched,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            setFieldValue,
                                            isSubmitting,
                                        }) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <img src="assets/img/logo/jonggol.png" alt="" style={{ width: 60, height: 70 }} />
                                                    <span className="h1 fw-bold mb-0 ml-3">Admin Kota Jonggol</span>
                                                </div>
                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>Sign into your account</h5>
                                                {
                                                    error && (
                                                        <p className='text-danger'>{error}</p>
                                                    )
                                                }
                                                <div className="form-outline mb-4">
                                                    <label className="form-label ml-1" htmlFor="email">Email Address</label>
                                                    <input type="email" name="email" id="email" className="form-control form-control-lg" placeholder='Email'
                                                        error={errors.email && touched.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                        disabled={isSubmitting}
                                                    />
                                                    <small className='text-danger'>{error.email}</small>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label ml-1" htmlFor="password">Password</label>
                                                    <div className="input-group-icon right">
                                                        <div className="input-icon"><FontAwesomeIcon
                                                            title={isRevealPwd ? "Hide password" : "Show password"}
                                                            onClick={() => setIsRevealPwd(prevState => !prevState)}
                                                            icon={isRevealPwd ? faEyeSlash : faEye} className='mt-3' /></div>
                                                        <input className="form-control form-control-lg" name="password" id="password"
                                                            type={isRevealPwd ? "text" : "password"} placeholder="Password"
                                                            error={errors.password && touched.password}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.password}
                                                            disabled={isSubmitting}
                                                            FontAwesomeIcon={faEye} />
                                                    </div>
                                                    <small className='text-danger'>{error.password}</small>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button className="genric-btn primary btn-lg btn-block" type="submit">{isLoading ? "Process ..." : "Login"}</button>
                                                </div>
                                                <div className='text-center'>
                                                    <p className="pb-lg-2" style={{ color: '#393f81' }}><a href="/forgotpassword" style={{ color: '#393f81' }}>Forgot Password</a></p>
                                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;