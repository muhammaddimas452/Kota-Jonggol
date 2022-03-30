import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from "react-redux";

const ForgotPassword = (props) => {
    const api = 'http://127.0.0.1:8000/api';

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [alert, setAlert] = useState('');

    const changeEmail = (e) => {
        setEmail(e.target.value)
        setError('')
    }

    const kirim = (e) => {
        e.preventDefault();
        if(!email){
            setError('Email wajib diisi');
        }else{
            axios.put(api + '/password/forgot-password', {email:email})
            .then(res => {
                setEmail('')
                setAlert('Link Reset Password Telah di Kirim, Silahkan cek Email Anda')
                setTimeout(() =>{
                    setAlert('')
                },3000)
            })
            console.log(kirim)
        }
    }

    const myStyle = {
        marginTop: "120px",
        position: "realtive",
    };

    return (
        <div className="container d-mt-5" style={myStyle}>
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card" style={{ borderRadius: '1rem' }}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-5 d-none d-md-block mt-5">
                                <img src="assets/img/email.jpg" alt="login form" className="image-fluid" style={{ width: 500 }} />
                            </div>
                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-lg-5 text-black">
                                    <form onSubmit={kirim}>
                                        <div className="d-flex align-items-center mb-3 pb-1">
                                            <img src="assets/img/logo/jonggol.png" alt="" style={{ width: 60, height: 70 }} />
                                            <span className="h1 fw-bold mb-0 ml-3">Admin Kota Jonggol</span>
                                        </div>
                                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>Masukkan Email Untuk Mendapatkan Link Reset Password</h5>
                                        {
                                            alert && (
                                                <p className='text-success'>{alert}</p>
                                            )
                                        }
                                        {
                                            error && (
                                                <p className='text-danger'>{error}</p>
                                            )
                                        }
                                        <div className="form-outline mb-4">
                                            <input type="email" className="form-control form-control-lg"
                                                id='email'
                                                name='email'
                                                value={email}
                                                onChange={changeEmail} 
                                                />
                                            <label className="form-label" htmlFor="email">Email address</label>
                                        </div>
                                        <div className="pt-1 mb-4">
                                        <button className="genric-btn primary btn-lg btn-block" type="submit">Send Email</button>
                                        </div>
                                    </form>
                                    <div className='text-center'>
                                        <p className="pb-lg-2" style={{ color: '#393f81' }}>Punya Akun?<a href="/login" style={{ color: '#393f81' }}> Login</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;