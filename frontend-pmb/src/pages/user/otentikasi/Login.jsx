import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../../assets/stainaa.png"
import { useDispatch, useSelector } from "react-redux"
import { LoginUser, reset } from "../../../features/authSlice"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Swal from 'sweetalert2'
import { FallingLines } from 'react-loader-spinner'

const Login = () => {
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { user, isSuccess, isError, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const togglePass = () => {
        if (showPass) {
            setShowPass(false)
        } else {
            setShowPass(true)
        }
    }

    useEffect(() => {
        if (user || isSuccess) {
            setLoading(false)
            Swal.fire({
                title: user.message,
                icon: 'success',
                confirmButtonColor: '#3085d6'
            }).then(() => {
                if (user.role == 'admin') {
                    navigate('/home')
                } else {
                    navigate('/dashboard')
                }
            })
        } else if (isError) {
            setLoading(false)
            Swal.fire({
                title: 'Error',
                text: message,
                icon: 'error',
                confirmButtonColor: '#3085d6'
            })
        }
        dispatch(reset())
    }, [user, isSuccess, navigate, message, dispatch])

    const Auth = (e) => {
        e.preventDefault()
        if (email == '') {
            Swal.fire({
                title: 'Error',
                text: 'Email tidak boleh kosong',
                icon: 'error',
                confirmButtonColor: '#3085d6'
            })
        } else if (password == '') {
            Swal.fire({
                title: 'Error',
                text: 'Email tidak boleh kosong',
                icon: 'error',
                confirmButtonColor: '#3085d6'
            })
        } else {
            setLoading(true)
            dispatch(LoginUser({ email, password }))
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
                                                <h1 className="mb-1 fw-bold">Selamat Datang</h1>
                                                <span>
                                                    Belum memiliki akun?
                                                    <Link to="/" className="ms-1">Daftar</Link>
                                                </span>
                                            </div>
                                            <form className="needs-validation" onSubmit={Auth}>
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input type="email" id="email" className="form-control" name="email" placeholder="example@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    <div className="input-group mb-3">
                                                        <input type={showPass ? 'text' : 'password'} className="form-control" id='password' placeholder="***************" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                        <button className="btn btn-primary btn-sm" type="button" onClick={togglePass}>{showPass ? <FaEyeSlash /> : <FaEye />}</button>
                                                    </div>
                                                </div>
                                                <div className='mb-4'>
                                                    <Link to='/forgotpassword'><u>Lupa Password?</u></Link>
                                                </div>
                                                <div>
                                                    <div className="d-grid">
                                                        <button type="submit" className="btn btn-primary">Login</button>
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

export default Login