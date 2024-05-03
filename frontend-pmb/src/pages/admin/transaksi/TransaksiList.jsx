import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from "moment"

const TransaksiList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Mahasiswa, setMahasiswa] = useState([])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getMahasiswa()
    }, [])

    const getMahasiswa = async () => {
        try {
            const response = await axios.get('v1/transaksi/allTransaksiMhs')
            setMahasiswa(response.data.data)
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
                                    <div className="col-md-12">
                                        <div className="table-responsive">
                                            <table className="table table-sm table-bordered text-nowrap mb-0 table-centered">
                                                <thead>
                                                    <tr>
                                                        <th className='py-2'>NO</th>
                                                        <th className='py-2'>Nama</th>
                                                        <th className='py-2'>Tempat Lahir</th>
                                                        <th className='py-2'>Tanggal Lahir</th>
                                                        <th className='py-2'>Jenis Kelamin</th>
                                                        <th className='py-2'>Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Mahasiswa.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
                                                            <td className='text-capitalize'>{item.nama}</td>
                                                            <td className='text-capitalize'>{item.tempat_lahir}</td>
                                                            <td className='text-capitalize'>{moment(item.tanggal_lahir).format('DD MMMM YYYY')}</td>
                                                            <td className='text-capitalize'>{item.jenis_kelamin == 'l' ? 'Laki-Laki' : 'Perempuan'}</td>
                                                            <td>
                                                                <Link to="/cektransaksi" state={{ token: item.token }} className='btn btn-sm btn-info'>Cek Transaksi</Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="row mt-3">
                                    <div className="col-lg-12 col-md-12 col-12">
                                        <nav>
                                            <ul className="pagination justify-content-center mb-0">
                                                <li className="page-item disabled">
                                                    <a className="page-link mx-1 rounded" href="#">

                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link mx-1 rounded" href="#">1</a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link mx-1 rounded" href="#">2</a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link mx-1 rounded" href="#">3</a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link mx-1 rounded" href="#">

                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutAdmin>
    )
}

export default TransaksiList