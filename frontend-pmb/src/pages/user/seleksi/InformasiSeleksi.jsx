import React, { useEffect, useState } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useNavigate } from 'react-router-dom'
import moment from "moment"
import axios from 'axios'

const InformasiSeleksi = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [totalSoal, setTotalSoal] = useState('')
    const [idSeleksi, setIdSeleksi] = useState('')
    const [penyelesaian, setPenyelesaian] = useState('')
    const [durasi, setDurasi] = useState('')
    const [belum, setBelum] = useState('')
    const [benar, setBenar] = useState('')
    const [salah, setSalah] = useState('')
    const [skor, setSkor] = useState('')

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getTotalPertanyaan()
    }, [])

    useEffect(() => {
        getInformasiHasil()
    }, [user])

    const getTotalPertanyaan = async () => {
        try {
            const response = await axios.get(`v1/seleksi/pageAwal`)
            setTotalSoal(response.data.data)
        } catch (error) {

        }
    }

    const getInformasiHasil = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/seleksi/byToken/${user.data.token}`)
                setIdSeleksi(response.data.data.id_seleksi)
                setPenyelesaian(response.data.data.total_selesai)
                setDurasi(response.data.data.total_durasi)
                setBelum(response.data.data.total_belum)
                setBenar(response.data.data.total_benar)
                setSalah(response.data.data.total_salah)
                setSkor(response.data.data.score)
            }
        } catch (error) {

        }
    }

    const tambahSeleksi = async () => {
        try {
            await axios.post('v1/seleksi/tambah', {
                token: user && user.data.token,
                total_soal: totalSoal
            }).then(function (response) {
                navigate("/formseleksi", { state: { waktuNow: new Date() } })
            })
        } catch (error) {

        }
    }

    return (
        <LayoutUser>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-2 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-2 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Seleksi</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body text-center">
                                <h4>Jawablah semua perntanyaan-pertanyaan seleksi dengan benar</h4>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-12 d-flex justify-content-center">
                                                <div className="d-flex gap-5">
                                                    <div className="text-center mb-2">
                                                        <h3 className='display-6'>Total Soal</h3>
                                                        <h1 className='display-3'>{totalSoal}</h1>
                                                    </div>
                                                    <div className="text-center mb-2">
                                                        <h3 className='display-6'>Total Selesai</h3>
                                                        <h1 className='display-3'>{penyelesaian == '' ? 0 : penyelesaian}</h1>
                                                    </div>
                                                    <div className="text-center mb-2">
                                                        <h3 className='display-6'>Total Belum</h3>
                                                        <h1 className='display-3'>{belum == '' ? totalSoal : belum}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`row mt-2 ${penyelesaian == totalSoal ? '' : 'd-none'}`}>
                                            <div className="col-md-12 d-flex justify-content-center">
                                                <div className="d-flex gap-5">
                                                    <div className="text-center mb-2">
                                                        <h3 className='display-6'>Benar</h3>
                                                        <h1 className='display-3'>{benar}</h1>
                                                    </div>
                                                    <div className="text-center mb-2">
                                                        <h3 className='display-6'>Salah</h3>
                                                        <h1 className='display-3'>{salah}</h1>
                                                    </div>
                                                    <div className="text-center mb-2">
                                                        <h3 className='display-6'>Skor</h3>
                                                        <h1 className='display-3'>{skor}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-2 d-flex justify-content-center align-items-center">
                                        {idSeleksi == '' ?
                                            <button className="btn btn-success" onClick={tambahSeleksi}>Mulai</button>
                                            :
                                            <Link to="/formseleksi" state={{ waktuNow: new Date() }} className="btn btn-success" >Mulai</Link>
                                        }
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-sm-4 text-center">
                                        <h5>Tanggal : {moment().format('DD MMM YYYY')}</h5>
                                    </div>
                                    <div className="col-sm-4">
                                        <h5>Waktu : {durasi}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutUser>
    )
}

export default InformasiSeleksi