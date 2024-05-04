import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const DetailHasilSeleksi = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { isError, user } = useSelector((state) => state.auth)
    const [biodata, setBiodata] = useState([])
    const [seleksi, setSeleksi] = useState([])
    const [Hasil, setHasil] = useState([])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getMhsByToken()
        getDataSeleksi()
        getHasil()
    }, [location])

    const getMhsByToken = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            setBiodata(response.data.data)
        } catch (error) {

        }
    }

    const getDataSeleksi = async () => {
        try {
            const response = await axios.get(`v1/seleksi/byid/${location.state.idSeleksi}`)
            setSeleksi(response.data.data)
        } catch (error) {

        }
    }

    const getHasil = async () => {
        try {
            const response = await axios.get(`v1/seleksi/detailJawaban/${location.state.idSeleksi}`)
            setHasil(response.data.data)
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
                                <h1 className="mb-0 h2 fw-bold">Hasil Seleksi</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <Link to="/hasilSeleksi" className='btn btn-sm btn-danger'>Kembali</Link>
                            </div>
                            <div className="card-body">
                                <table cellPadding={5}>
                                    <tbody>
                                        <tr>
                                            <td><h5 className='mb-0'>Nama</h5></td>
                                            <td>&nbsp;:&nbsp;</td>
                                            <td>{biodata.nama}</td>
                                        </tr>
                                        <tr>
                                            <td><h5 className='mb-0'>Tempat Lahir</h5></td>
                                            <td>&nbsp;:&nbsp;</td>
                                            <td className='py-2 text-capitalize'>{biodata.tempat_lahir}</td>
                                        </tr>
                                        <tr>
                                            <td><h5 className='mb-0'>Tanggal Lahir</h5></td>
                                            <td>&nbsp;:&nbsp;</td>
                                            <td className='py-2'>{moment(biodata.tanggal_lahir).format('DD MMMM YYYY')}</td>
                                        </tr>
                                        <tr>
                                            <td><h5 className='mb-0'>Durasi Waktu</h5></td>
                                            <td>&nbsp;:&nbsp;</td>
                                            <td className='py-2'>{seleksi.total_durasi}</td>
                                        </tr>
                                        <tr>
                                            <td><h5 className='mb-0'>Jawaban Benar</h5></td>
                                            <td>&nbsp;:&nbsp;</td>
                                            <td className='py-2'>{seleksi.total_benar}</td>
                                        </tr>
                                        <tr>
                                            <td><h5 className='mb-0'>Jawaban Salah</h5></td>
                                            <td>&nbsp;:&nbsp;</td>
                                            <td className='py-2'>{seleksi.total_salah}</td>
                                        </tr>
                                        <tr>
                                            <td><h5 className='mb-0'>Skor</h5></td>
                                            <td>&nbsp;:&nbsp;</td>
                                            <td className='py-2'>{seleksi.score}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card mt-2">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <ol>
                                            {Hasil.map((item, index) => (
                                                <li key={index}>
                                                    <h5>{item.pertanyaans[0].pertanyaan}</h5>
                                                    <p className='text-dark text-capitalize'>Jawaban : {item.jawaban} <span className={`badge ${item.status == 'benar' ? 'bg-success' : 'bg-danger'}`}>{item.status}</span></p>
                                                </li>
                                            ))}
                                        </ol>
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

export default DetailHasilSeleksi