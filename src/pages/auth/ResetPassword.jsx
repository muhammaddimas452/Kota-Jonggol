import React, { useState } from 'react'
import axios from '../../api/axiosClient';
import { useParams } from 'react-router'
import jonggol from '../admin/assets/img/jonggol.png'
import forgotpw from '../admin/assets/img/forgotpw.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";


export default function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [alert, setAlert] = useState('')

    const changePassword = (e) => {
        const value = e.target.value
        setPassword(value);
        if (!value) {
            setErrorPassword('Password tidak boleh kosong')
        } else {
            setErrorPassword('')
        }
    }

    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [isRevealCPwd, setIsRevealCPwd] = useState(false);

    const changeConfirmPassword = (e) => {
        const value = e.target.value
        setConfirmPassword(value);
        if (!value) {
            setErrorConfirmPassword('Konfirmasi Password tidak boleh kosong')
        } else if (password !== value) {
            setErrorConfirmPassword('Konfirmasi Password Tidak Cocok')
        } else {
            setErrorConfirmPassword('')
        }
    }

    const simpan = (e) => {
        e.preventDefault();
        const data = {
            token: token,
            password: password,
            password_confirmation: confirmPassword
        }
        axios.put('/password/reset', data)
            .then(res => {
                if (res) {
                    setPassword('')
                    setConfirmPassword('')
                    setAlert('Password Behasil Di Ganti')
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
                    <div className="card" style={{ borderRadius: '1rem' }}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-5 d-none d-md-block" style={{ marginTop: 100 }}>
                                <img src={forgotpw} alt="login form" className="image-fluid" style={{ width: 500 }} />
                            </div>
                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-lg-5 text-black">
                                    <form onSubmit={simpan}>
                                        <div className="d-flex align-items-center mb-3 pb-1">
                                            <img src={jonggol} alt="" style={{ width: 60, height: 70 }} />
                                            <span className="h1 fw-bold mb-0 ml-3">Admin Kota Jonggol</span>
                                        </div>
                                        <h3 className="fw-normal mb-3" style={{ letterSpacing: 1 }}>Ganti Password</h3>
                                        {
                                            alert && (
                                                <div className='alert alert-success'>
                                                    {alert}
                                                </div>
                                            )
                                        }
                                        {
                                            errorPassword && (
                                                <p className='text-danger'>{errorPassword}</p>
                                            )
                                        }
                                        <div className="input-group-icon right mb-4">
                                            <div className="input-icon"><FontAwesomeIcon
                                                title={isRevealPwd ? "Hide password" : "Show password"}
                                                onClick={() => setIsRevealPwd(prevState => !prevState)}
                                                icon={isRevealPwd ? faEyeSlash : faEye} className='mt-3' /></div>
                                            <input className="form-control form-control-lg" name="password" id="password"
                                                type={isRevealPwd ? "text" : "password"}
                                                onChange={changePassword}
                                                value={password} />
                                                <label className="form-label" htmlFor="password">Masukkan Password Baru</label>
                                        </div>
                                        {
                                            errorConfirmPassword && (
                                                <p className='text-danger'>{errorConfirmPassword}</p>
                                            )
                                        }
                                        <div className="input-group-icon right mb-4">
                                            <div className="input-icon"><FontAwesomeIcon
                                                title={isRevealCPwd ? "Hide password" : "Show password"}
                                                onClick={() => setIsRevealCPwd(prevState => !prevState)}
                                                icon={isRevealCPwd ? faEyeSlash : faEye} className='mt-3' /></div>
                                            <input className="form-control form-control-lg" name="password" id="password"
                                                type={isRevealCPwd ? "text" : "password"}
                                                onChange={changeConfirmPassword}
                                                value={confirmPassword} />
                                                <label className="form-label">Konfirmasi Password Baru</label>
                                        </div>
                                        <div className="pt-1 mb-4">
                                            <button className="genric-btn primary btn-lg btn-block" type="submit">Reset Password</button>
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