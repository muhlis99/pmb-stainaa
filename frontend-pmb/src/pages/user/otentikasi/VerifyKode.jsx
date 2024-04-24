import React from 'react'
import { Link } from 'react-router-dom'

const VerifyKode = () => {
    return (
        <main>
            <section className="container d-flex flex-column vh-100">
                <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
                    <div className="col-lg-5 col-md-8 py-8 py-xl-0">
                        <div className="card shadow">
                            <div className="card-body p-6">
                                <div className="mb-5 text-center">
                                    <span>
                                        Kami telah mengirimkan kode verifikasi ke email anda.
                                    </span><br />
                                    <span className='mt-2'>
                                        Silakan cek email anda!
                                    </span>
                                </div>
                                <form className="needs-validation">
                                    <div className="mb-4">
                                        <input type="text" autoComplete='off' className="form-control" placeholder="Kode Verifikasi" required />
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