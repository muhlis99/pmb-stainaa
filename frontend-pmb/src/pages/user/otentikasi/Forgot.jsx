import React, { useState } from 'react'
import logo from "../../../assets/stainaa.png"
import { useNavigate } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'

const Forgot = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const kirimEmail = async (e) => {
        e.preventDefault()
        try {
            if (email == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Email tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else {
                setLoading(true)
                await axios.post('v1/login/forgot', {
                    email: email
                }).then(function (response) {

                })
            }
        } catch (error) {
            console.log(error);
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
                                                    Masukkan email untuk mereset kata sandi anda!
                                                </span>
                                            </div>
                                            <form className="needs-validation" autoComplete='off' >
                                                <div className="mb-4">
                                                    <input type="email" className="form-control" placeholder="example@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
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

export default Forgot