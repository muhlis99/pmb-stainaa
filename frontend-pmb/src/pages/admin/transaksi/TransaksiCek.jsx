import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useLocation, useNavigate } from 'react-router-dom'

const TransaksiCek = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { isError, user } = useSelector((state) => state.auth)

    // useEffect(() => { console.log(location.state.token) }, [location])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    return (
        <LayoutAdmin>
            <section className="container-fluid p-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-3 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Transaksi</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-md-8 col-sm-12">
                                        <div className="row">
                                            <div className="col-md-3 text-center border">
                                                <h5>Nama</h5>
                                                <span>Ainur Ridlo</span>
                                            </div>
                                            <div className="col-md-3 text-center border">
                                                <h5>Alamat</h5>
                                                <span>Jl. KH. Agus Salim</span>
                                            </div>
                                            <div className="col-md-3 text-center border">
                                                <h5>Jenis Kelamin</h5>
                                                <span>Laki-Laki</span>
                                            </div>
                                            <div className="col-md-3 text-center border">
                                                <h5>Tempat Lahir</h5>
                                                <span>Banyuwangi</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutAdmin>
    )
}

export default TransaksiCek