import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const DetailApprove = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { isError, user } = useSelector((state) => state.auth)
    const [Approve, setApprove] = useState([])
    const [biodata, setBiodata] = useState([])
    const [Prodi, setProdi] = useState([])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getApproveById()
        getMhsByToken()
    }, [location])

    useEffect(() => {
        getDataProdi()
    }, [])

    const getApproveById = async () => {
        try {
            const response = await axios.get(`v1/approve/byId/${location.state.idApprove}`)
            setApprove(response.data.data)
        } catch (error) {

        }
    }

    const getMhsByToken = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            setBiodata(response.data.data)
        } catch (error) {

        }
    }

    const getDataProdi = async () => {
        try {
            const response = await axios.get(`v1/seleksi/prodi`)
            setProdi(response.data.data)
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
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="card shadow-lg h-100">
                                            <div className="card-body">
                                                <h5>Catatan</h5>
                                                <ol>
                                                    <li>Silakan cek data terlebih dahulu</li>
                                                    <li>Pastikan semua data telah benar</li>
                                                    <li>sebelum melakukan Approve data pilihlah prodi</li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="card shadow-lg">
                                            <div className="card-body">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><h5>Nama</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{biodata.nama}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Tempat Lahir</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{biodata.tempat_lahir}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Tanggal Lahir</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{moment(biodata.tanggal_lahir).format('DD MMMM YYYY')}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Jenis Kelamin</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{biodata.jenis_kelamin == 'l' ? 'Laki-Laki' : 'Perempuan'}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-lg-4 col-md-4 col-sm-12">
                                        <div className="card shadow-lg h-100">
                                            <div className="card-body">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><h5>Fomulir</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td className={`text-capitalize fw-bold ${Approve.status_formulir == 'selesai' ? 'text-success' : 'text-danger'}`}>{Approve.status_formulir}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Pembayaran</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td className={`text-capitalize fw-bold ${Approve.status_pembayaran == 'selesai' ? 'text-success' : 'text-danger'}`}>{Approve.status_pembayaran}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Seleksi</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td className={`text-capitalize fw-bold ${Approve.status_seleksi == 'selesai' ? 'text-success' : 'text-danger'}`}>{Approve.status_seleksi}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    {Prodi.map((item, index) => (
                                        <div key={index} className='col-lg-4 col-md-4 col-sm-12'>
                                            <div class="card widget-flat">
                                                <div class="card-body">
                                                    <div class="float-end">
                                                        <i class="mdi mdi-pulse widget-icon"></i>
                                                    </div>
                                                    <h5 class="text-muted fw-normal mt-0" title="Growth">Program Studi</h5>
                                                    <h3 class="mt-3 mb-3">{item.nama_prodi}</h3>
                                                    <p class="mb-0 text-muted">
                                                        <span class="text-success me-2">
                                                            <i class="mdi mdi-arrow-up-bold"></i> 4.87%</span>
                                                        <span class="text-nowrap">Since last month</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-md-12">
                                        <button className='btn btn-danger btn-sm'>Kembali</button>
                                        <button className='btn btn-info btn-sm float-end'>Approve</button>
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

export default DetailApprove