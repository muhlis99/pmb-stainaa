import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../../assets/stainaa.png"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import axios from 'axios'
import Swal from 'sweetalert2'
import { FallingLines } from 'react-loader-spinner'

const Registrasi = () => {
    const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [nama, setNama] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [konfirmPass, setKonfirmPass] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const togglePass = () => {
        if (showPass) {
            setShowPass(false)
        } else {
            setShowPass(true)
        }
    }

    const toggleKonPass = () => {
        if (showConfirm) {
            setShowConfirm(false)
        } else {
            setShowConfirm(true)
        }
    }

    const auth = async (e) => {
        e.preventDefault()
        try {
            if (nama == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'username tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (email == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'email tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (password == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Password tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (password.length < 8) {
                Swal.fire({
                    title: 'Error',
                    text: 'Password kurang dari 8 digit',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (konfirmPass == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Konfirmasi Password tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (konfirmPass != password) {
                Swal.fire({
                    title: 'Error',
                    text: 'Konfirmasi password tidak sama dengan password',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else {
                setLoading(true)
                await axios.post('v1/registrasi/daftar', {
                    nama: nama,
                    email: email,
                    conPass: konfirmPass,
                    pass: password
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: 'Sukses',
                        text: 'Anda telah berhasil membuat akun',
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        navigate('/verifyKode')
                    })
                })
            }
        } catch (error) {
        }
    }


    return (
        <>
            {
                loading ?
                    <div className='position-absolute z-3 bg-light start-0 end-0 top-0 bottom-0 w-100 d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
                        <div>
                            <FallingLines
                                color="#754FFE"
                                width="100"
                                visible={true}
                                ariaLabel="falling-circles-loading"
                                className="align-items-center"
                            />
                        </div>
                    </div>
                    :
                    <main>
                        <section className="container d-flex flex-column vh-100">
                            <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
                                <div className="col-lg-5 col-md-8 py-8 py-xl-0">
                                    <div className="card shadow">
                                        <div className="card-body p-6">
                                            <div className="mb-2">
                                                <img src={logo} className="mb-2" width={60} alt="logo" />
                                                <h1 className="mb-1 fw-bold">Daftar Akun PMB</h1>
                                                <span>
                                                    Sudah memiliki akun?
                                                    <Link to="/login" className="ms-1">Login</Link>
                                                </span>
                                            </div>
                                            <form className="needs-validation" autoComplete='off' onSubmit={auth}>
                                                <div className="mb-3">
                                                    <label htmlFor="username" className="form-label">username</label>
                                                    <input type="text" id="username" className="form-control" placeholder="username" value={nama} onChange={(e) => setNama(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input type="email" id="email" className="form-control" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    <div className="input-group mb-3">
                                                        <input type={showPass ? 'text' : 'password'} className="form-control" id='password' placeholder="***************" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                        <button className="btn btn-primary btn-sm" type="button" onClick={togglePass}>{showPass ? <FaEyeSlash /> : <FaEye />}</button>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="konpassword" className="form-label">Konfirmasi Password</label>
                                                    <div className="input-group mb-3">
                                                        <input type={showConfirm ? 'text' : 'password'} className="form-control" id='konpassword' placeholder="***************" value={konfirmPass} onChange={(e) => setKonfirmPass(e.target.value)} />
                                                        <button className="btn btn-primary btn-sm" type="button" onClick={toggleKonPass}>{showConfirm ? <FaEyeSlash /> : <FaEye />}</button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="d-grid">
                                                        <button type="submit" className="btn btn-primary">Daftar Akun</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="position-absolute bottom-0 m-4">
                            <div className="dropdown">
                                <button className="btn btn-light btn-icon rounded-circle d-flex align-items-center" type="button" aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
                                    <i className="bi theme-icon-active"></i>
                                    <span className="visually-hidden bs-theme-text">Toggle theme</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bs-theme-text">
                                    <li>
                                        <button type="button" className="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
                                            <i className="bi theme-icon bi-sun-fill"></i>
                                            <span className="ms-2">Light</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
                                            <i className="bi theme-icon bi-moon-stars-fill"></i>
                                            <span className="ms-2">Dark</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
                                            <i className="bi theme-icon bi-circle-half"></i>
                                            <span className="ms-2">Auto</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </main>
            }
        </>
    )
}

export default Registrasi