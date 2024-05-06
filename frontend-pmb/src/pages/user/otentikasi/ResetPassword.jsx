import React, { useEffect, useState } from 'react'
import logo from "../../../assets/stainaa.png"
import { useLocation, useNavigate } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { ResetPass, reset } from "../../../features/authSlice"
import Swal from "sweetalert2"
import axios from "axios"

const ResetPassword = () => {
    const { user, isSuccess, isError, message } = useSelector((state) => state.auth)
    const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [passBaru, setPassBaru] = useState("")
    const [id, setId] = useState("")
    const [konfirmPass, setKonfirmPass] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        setId(location.state.id)
    }, [location])

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

    useEffect(() => {
        if (user || isSuccess) {
            setLoading(false)
            Swal.fire({
                title: 'Berhasil',
                text: user.message,
                icon: 'success',
                confirmButtonColor: '#3085d6'
            }).then(() => {
                navigate('/dashboard')
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
        if (passBaru == '') {
            Swal.fire({
                title: 'Error',
                text: 'Password Baru tidak boleh kosong',
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
        } else {
            setLoading(true)
            dispatch(ResetPass({ id, passBaru, konfirmPass }))
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
                                            <div className="mb-2 text-center">
                                                <img src={logo} className="mb-2" width={60} alt="logo" />
                                                <h1 className="mb-1 fw-bold">PMB STAINAA</h1>
                                            </div>
                                            <div className="mb-5 text-center">
                                                <span className='mt-2'>
                                                    Kode verifikasi telah kami kirimkan ke email anda
                                                </span><br />
                                                <span className='mt-2'>
                                                    Silakan cek email anda!
                                                </span>
                                            </div>
                                            <form autoComplete='off' onSubmit={Auth}>
                                                <div className="mb-3">
                                                    <label htmlFor="passBaru" className='form-label'>Password Baru</label>
                                                    <div className="input-group">
                                                        <input type={showPass ? 'text' : 'password'} className="form-control" id='passBaru' placeholder="***************"
                                                            value={passBaru} onChange={(e) => setPassBaru(e.target.value)}
                                                        />
                                                        <button className="btn btn-primary btn-sm" type="button" onClick={togglePass}>{showPass ? <FaEyeSlash /> : <FaEye />}</button>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="konfirmPass" className='form-label'>Konfirmasi Password</label>
                                                    <div className="input-group">
                                                        <input type={showConfirm ? 'text' : 'password'} className="form-control" id='konfirmPass' placeholder="***************"
                                                            value={konfirmPass} onChange={(e) => setKonfirmPass(e.target.value)}
                                                        />
                                                        <button className="btn btn-primary btn-sm" type="button" onClick={toggleKonPass}>{showConfirm ? <FaEyeSlash /> : <FaEye />}</button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="d-grid">
                                                        <button type="submit" className="btn btn-primary">Reset</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
            }
        </>
    )
}

export default ResetPassword