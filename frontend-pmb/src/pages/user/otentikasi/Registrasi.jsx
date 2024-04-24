import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../../assets/stainaa.png"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Registrasi = () => {
    const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    return (
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
                                <form className="needs-validation">
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" id="username" className="form-control" name="username" placeholder="Username" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" id="email" className="form-control" name="email" placeholder="example@gmail.com" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <div className="input-group mb-3">
                                            <input type={showPass ? 'text' : 'password'} className="form-control" id='password' placeholder="***************" />
                                            {
                                                showPass ?
                                                    <button className="btn btn-primary btn-sm" type="button" onClick={() => setShowPass(false)}>{showPass ? <FaEyeSlash /> : <FaEye />}</button>
                                                    :
                                                    <button className="btn btn-primary btn-sm" type="button" onClick={() => setShowPass(true)}>{showPass ? <FaEyeSlash /> : <FaEye />}</button>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="konpassword" className="form-label">Konfirmasi Password</label>
                                        <div className="input-group mb-3">
                                            <input type={showConfirm ? 'text' : 'password'} className="form-control" id='konpassword' placeholder="***************" />
                                            {
                                                showConfirm ?
                                                    <button className="btn btn-primary btn-sm" type="button" onClick={() => setShowConfirm(false)}>{showConfirm ? <FaEyeSlash /> : <FaEye />}</button>
                                                    :
                                                    <button className="btn btn-primary btn-sm" type="button" onClick={() => setShowConfirm(true)}>{showConfirm ? <FaEyeSlash /> : <FaEye />}</button>
                                            }
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
    )
}

export default Registrasi