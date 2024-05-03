import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useLocation, useNavigate } from 'react-router-dom'
import { FaCog, FaImage } from "react-icons/fa"
import { } from "module"
import axios from 'axios'
import moment from 'moment'

const TransaksiCek = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { isError, user } = useSelector((state) => state.auth)
    const [statusPembayaran, setStatusPembayaran] = useState('')
    const [biodata, setBiodata] = useState([])
    const [Transaksi, setTransaksi] = useState([])
    const [namaKwitansi, setNamaKwitansi] = useState([])

    // useEffect(() => { console.log(location.state.token) }, [location])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        cekTransaksiByToken()
        getBiodataByToken()
        getTransaksiByToken()
    }, [location])

    const cekTransaksiByToken = async () => {
        try {
            const response = await axios.get(`v1/transaksi/checkTransaksi/${location.state.token}`)
            setStatusPembayaran(response.data.status)
        } catch (error) {

        }
    }

    const getBiodataByToken = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            setBiodata(response.data.data)
        } catch (error) {

        }
    }

    const getTransaksiByToken = async () => {
        try {
            const response = await axios.get(`v1/transaksi/all/${location.state.token}`)
            setTransaksi(response.data.data)
        } catch (error) {

        }
    }

    return (
        <LayoutAdmin>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>
            </div>

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
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><h5>Nama</h5></td>
                                            <td>&nbsp;:&nbsp;</td>
                                            <td>{biodata.nama}</td>
                                        </tr>
                                        <tr>
                                            <td><h5>Jenis Kelamin</h5></td>
                                            <td>&nbsp;:&nbsp;</td>
                                            <td>{biodata.jenis_kelamin == 'l' ? 'Laki-Laki' : 'Perempuan'}</td>
                                        </tr>
                                        <tr>
                                            <td><h5>Tempat Lahir</h5></td>
                                            <td>&nbsp;:&nbsp;</td>
                                            <td className='text-capitalize'>{biodata.tempat_lahir}</td>
                                        </tr>
                                        <tr>
                                            <td><h5>Tanggal Lahir</h5></td>
                                            <td>&nbsp;:&nbsp;</td>
                                            <td className='text-capitalize'>{moment(biodata.tanggal_lahir).format('DD MMMM YYYY')}</td>
                                        </tr>
                                        <tr>
                                            <td><h5>Status</h5></td>
                                            <td>&nbsp;:&nbsp;</td>
                                            <td className={`text-capitalize fw-bold ${statusPembayaran == 'lunas' ? 'text-info' : 'text-danger'}`}>{statusPembayaran}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="table-responsive">
                                    <table className="table text-nowrap mb-0 table-centered table-bordered">
                                        <thead className="table-light">
                                            <tr>
                                                <th className='px-1'>Transaksi</th>
                                                <th className='px-1'>Batas Akhir</th>
                                                <th className='px-1'>Tanggal</th>
                                                <th className='px-1'>Nominal</th>
                                                <th className='px-1'>Status</th>
                                                <th className='px-1'>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Transaksi.map((item) => (
                                                <tr key={item.id_transaksi}>
                                                    <td>
                                                        Ke {item.pembayaran_ke}
                                                    </td>
                                                    <td>{item.tenggat_pembayaran}</td>
                                                    <td>{item.tanggal_transaksi}</td>
                                                    <td>{item.nominal}</td>
                                                    <td>{item.status_transaksi}</td>
                                                    <td className='d-flex gap-1'>
                                                        <button className='btn btn-sm btn-info rounded-circle px-2 py-1'><FaImage /></button>
                                                        <button className='btn btn-sm btn-info rounded-circle px-2 py-1'><FaCog /></button>
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

export default TransaksiCek