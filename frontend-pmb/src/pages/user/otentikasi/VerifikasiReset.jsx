import React, { useState } from 'react'
import logo from "../../../assets/stainaa.png"
import { useNavigate } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'
import Swal from "sweetalert2"
import axios from "axios"

const VerifikasiReset = () => {
    const [codeVerifikasi, setCodeVerifikasi] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const kirimKode = async (e) => {
        e.preventDefault()
        try {
            if (codeVerifikasi == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Kode verifikasi tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else {
                setLoading(true)
                await axios.post('v1/login/verify', {
                    code: codeVerifikasi
                }).then(function (response) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: 'Kode verifikasi telah diterima',
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        navigate('/resetPassword', { state: { id: response.data.id } })
                    })
                })
            }
        } catch (error) {
            setLoading(false)
            Swal.fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonColor: '#3085d6'
            })
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
                                            <form autoComplete='off' onSubmit={kirimKode}>
                                                <div className="mb-4">
                                                    <input type="number" className="form-control" placeholder="Kode Verifikasi" value={codeVerifikasi || ''} onChange={(e) => setCodeVerifikasi(e.target.value)} />
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
            }
        </>
    )
}

export default VerifikasiReset