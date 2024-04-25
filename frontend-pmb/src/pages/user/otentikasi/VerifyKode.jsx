import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../../../assets/stainaa.png"
import { useDispatch, useSelector } from "react-redux"
import { KodeVerifikasi, reset } from "../../../features/authSlice"
import axios from 'axios'
import Swal from 'sweetalert2'

const VerifyKode = () => {
    const [kodeVerify, setKodeVerify] = useState("")
    const { user, isSuccess, isError, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user || isSuccess) {
            axios.post(`v1/formulir/createFirst/${user.token}`)
            Swal.fire({
                title: user.message,
                icon: 'success',
                confirmButtonColor: '#3085d6'
            }).then(() => {
                navigate('/dashboard')
            })
        } else if (isError) {
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
        if (kodeVerify == '') {
            Swal.fire({
                title: 'Error',
                text: 'Kode Verifikasi Kosong',
                icon: 'error',
                confirmButtonColor: '#3085d6'
            })
        } else {
            dispatch(KodeVerifikasi({ kodeVerify }))
        }
    }

    return (
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
                                    <span>
                                        Kami telah mengirimkan kode verifikasi ke email anda.
                                    </span><br />
                                    <span className='mt-2'>
                                        Silakan cek email anda!
                                    </span>
                                </div>
                                <form className="needs-validation" autoComplete='off' onSubmit={Auth}>
                                    <div className="mb-4">
                                        <input type="number" autoComplete='off' className="form-control" placeholder="Masukkan Kode Verifikasi" value={kodeVerify} onChange={(e) => setKodeVerify(e.target.value)} />
                                    </div>
                                    <div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary">Kirim</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default VerifyKode