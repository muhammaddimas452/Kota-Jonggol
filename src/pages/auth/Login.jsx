import React from 'react'
import { Formik } from "formik"
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ErrorMessage from "../../components/templates/ErrorMessage";
import { ButtonGroup } from 'reactstrap';

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email().required("Wajib di isi"),
    password: Yup.string()
        .min(8, "Password minimal 8 Karakter")
        .required("wajib di isi"),
});

const Login = () => {

    const [errorBE, setErrorBE] = React.useState({});
    const initialState = {
        email: "",
        password: "",
    };

    const isLoading = useSelector((state) => state.auth.isLoading);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmit = async (values) => {
        const result = await dispatch(authLogin(values));
        console.log("result", result);
        if (result.status === "error") {
            setErrorBE(result);
            alert(result?.msg)
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
                    <div className="card" style={{ borderRadius: '1rem',marginbottom:50 }}>
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
                                                <div className="form-outline mb-4">
                                                    <input type="email" name="email" id="email" className="form-control form-control-lg" placeholder='Email'
                                                        error={errors.email && touched.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                        disabled={isSubmitting} 
                                                        />
                                                    <label className="form-label ml-1" htmlFor="email">Email Address</label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input type="password" name="password" id="password" className="form-control form-control-lg" placeholder='Password'
                                                        error={errors.password && touched.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.password}
                                                        disabled={isSubmitting}
                                                    />
                                                    <label className="form-label ml-1" htmlFor="password">Password</label>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button className="genric-btn primary btn-lg btn-block" type="submit">Login</button>
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