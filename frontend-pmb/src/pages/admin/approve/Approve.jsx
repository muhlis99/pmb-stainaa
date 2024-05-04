import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Approve = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Approve, setApprove] = useState([])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getApproveAll()
    }, [])

    const getApproveAll = async () => {
        try {
            const response = await axios.get(`v1/approve/all`)
            setApprove(response.data.data)
        } catch (error) {

        }
    }

    return (
        <LayoutAdmin>
            <section className="container-fluid p-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-3 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Approve</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="table-responsive">
                                    <table className='table table-sm table-bordered text-nowrap mb-0 table-centered'>
                                        <thead>
                                            <tr>
                                                <th className='py-2'>No</th>
                                                <th className='py-2'>Token</th>
                                                <th className='py-2'>Status Formulir</th>
                                                <th className='py-2'>Status Pembayaran</th>
                                                <th className='py-2'>Status Seleksi</th>
                                                <th className='py-2'>Tanggal</th>
                                                <th className='py-2'>Status Approve</th>
                                                <th className='py-2'>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Approve.map((item, index) => (
                                                <tr key={item.id_approve}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.token}</td>
                                                    <td>{item.status_formulir}</td>
                                                    <td>{item.status_pembayaran}</td>
                                                    <td>{item.status_seleksi}</td>
                                                    <td>{item.tanggal_approve}</td>
                                                    <td>{item.status == 'tidak' ? 'Belum' : 'Selesai'}</td>
                                                    <td>
                                                        <Link to="/detailapprove" state={{ token: item.token, idApprove: item.id_approve }} className='btn btn-sm btn-info'>Lihat</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutAdmin>
    )
}

export default Approve