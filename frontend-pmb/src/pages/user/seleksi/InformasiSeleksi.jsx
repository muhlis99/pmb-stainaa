import React, { useEffect, useState } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useNavigate } from 'react-router-dom'
import moment from "moment"
import axios from 'axios'
import Swal from 'sweetalert2'

const InformasiSeleksi = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [totalSoal, setTotalSoal] = useState('')
    const [idSeleksi, setIdSeleksi] = useState('')
    const [penyelesaian, setPenyelesaian] = useState('')
    const [durasi, setDurasi] = useState('')
    const [idPendaftar, setIdPendaftar] = useState('')
    const [statusPembayaran, setStatusPembayaran] = useState('')

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

    useEffect(() => {
        const getDataByToken = async () => {
            try {
                if (user) {
                    const response = await axios.get(`v1/formulir/getByToken/${user.data.token}`)
                    setIdPendaftar(response.data.data.id)
                }
            } catch (error) {

            }
        }
        getDataByToken()
    }, [user])

    useEffect(() => {
        getStatusPembayaran()
    }, [idPendaftar])

    const getStatusPembayaran = async () => {
        try {
            if (idPendaftar) {
                const response = await axios.get(`v1/approve/byId/${idPendaftar}`)
                setStatusPembayaran(response.data.data.status_pembayaran)
            }
        } catch (error) {

        }
    }

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
            if (statusPembayaran == 'belum') {
                Swal.fire({
                    title: 'Seleksi Gagal',
                    text: 'Anda belum menyelesaikan pembayaran pendaftaran',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6'

                })
            } else {
                await axios.post('v1/seleksi/tambah', {
                    token: user && user.data.token,
                    total_soal: totalSoal
                }).then(function (response) {
                    navigate("/formseleksi", { state: { waktuNow: new Date() } })
                })
            }
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-2 d-flex justify-content-center align-items-center">
                                        {idSeleksi == '' ?
                                            <button className="btn btn-success btn-sm" onClick={tambahSeleksi}>Mulai</button>
                                            :
                                            <Link to="/formseleksi" state={{ waktuNow: new Date() }} className="btn btn-success btn-sm" >Lanjutkan</Link>
                                        }
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-sm-4 text-center">
                                        <h5>Tanggal : {moment().format('DD MMM YYYY')}</h5>
                                    </div>
                                    <div className="col-sm-4 text-center">
                                        <h5>Waktu yang dihabiskan : {durasi == '' ? '0 menit' : durasi}</h5>
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