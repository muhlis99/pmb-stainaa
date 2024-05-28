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
    const [statusSeleksi, setStatusSeleksi] = useState('')
    const [tombolMulai, setTombolMulai] = useState(false)
    const [tanggal, setTanggal] = useState("")

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
    }, [user])


    const getStatusPembayaran = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/approve/byToken/${user.data.token}`)
                setStatusSeleksi(response.data.data.status_seleksi)
            }
        } catch (error) {

        }
    }

    const checked = (e) => {
        setTombolMulai(e.target.checked)
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
                setTanggal(response.data.data.tanggal_akhir)
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
            // if (statusPembayaran == 'belum') {
            //     Swal.fire({
            //         title: 'Seleksi Gagal',
            //         text: 'Anda belum menyelesaikan pembayaran pendaftaran',
            //         icon: 'warning',
            //         confirmButtonColor: '#3085d6'

            //     })
            // } else {
            // }
            await axios.post('v1/seleksi/tambah', {
                token: user.data.token,
                // token: user && user.data.token,
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
                        {idPendaftar == '' || statusSeleksi == '' ?
                            ""
                            : idPendaftar == '' || statusSeleksi == 'belum' ?
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-xl-12 col-md-12 col-sm-12">
                                                <h2 className='display-5'>Tes Kemampuan Dasar</h2>
                                                <p style={{ fontSize: '16px' }}>
                                                    Sebagai prasyarat untuk menjadi
                                                    mahasiswa STAINAA. Kamu harus mengerjakan soal kemampuan belajar.
                                                    Perhatikan petunjuk berikut sebelum memulai tes.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12 col-md-12 col-sm-12">
                                                <h3 className='display-6'>Mengenai Tes</h3>
                                                <ul>
                                                    <li style={{ fontSize: '16px' }}>Tes yang diuji berupa tes kemampuan kompetensi.</li>
                                                    <li style={{ fontSize: '16px' }}>Tes hanya dapat dilakukan satu kali (tidak ada pengulangan).</li>
                                                    <li style={{ fontSize: '16px' }}>Jika halaman ditutup tes akan tetap berlangsung.</li>
                                                    <li className='fw-bold' style={{ fontSize: '16px' }}>Pertanyaan dalam tes tidak dapat disebarluaskan.</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12 col-md-12 col-sm-12">
                                                <h3 className='display-6'>Sebelum Pengerjaan</h3>
                                                <ul>
                                                    <li style={{ fontSize: '16px' }}>Pastikan kamu berada ditempat yang kondusif.</li>
                                                    <li style={{ fontSize: '16px' }}>Pastikan kamu berada ditempat dengan koneksi internet yang stabil.</li>
                                                    <li style={{ fontSize: '16px' }}>Bila perlu, kamu bisa menggunakan alat bantu corat-coret seperti kertas dan pensil/pulpen untuk menyelesaikan soal.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" onChange={checked} id="flexCheckDefault" />
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        Saya telah membaca dan memahami setiap petunjuk tes dan siap mulai tes.
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                {statusSeleksi == 'belum' ?
                                                    <button className={`float-end btn btn-sm btn-primary ${tombolMulai ? '' : 'd-none'}`} onClick={tambahSeleksi}>Lanjut</button>
                                                    :
                                                    <Link to="/formseleksi" state={{ waktuNow: new Date() }} className={`btn btn-sm btn-primary float-end ${tombolMulai ? '' : 'd-none'}`}>Lanjut</Link>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-xl-12 col-md-12 col-sm-12 text-center mb-4">
                                                <h4>
                                                    Anda telah menyelesaikan seleksi masuk sebagai mahasiswa baru STAINAA, silakan tunggu informasi lebih lanjut
                                                </h4>
                                            </div>
                                            <div className="col-xl-12 col-md-12 col-sm-12 d-flex gap-5 justify-content-center">
                                                <div className='text-center'>
                                                    <h3 className='display-5'>Total Soal</h3>
                                                    <h3 className='display-3 mt-3'>{totalSoal}</h3>
                                                </div>
                                                <div className='text-center'>
                                                    <h3 className='display-5'>Total Selesai</h3>
                                                    <h3 className='display-3 mt-3'>{penyelesaian}</h3>
                                                </div>
                                            </div>
                                            <div className="col-xl-12 col-md-12 col-sm-12 d-flex justify-content-evenly mt-4">
                                                <div className=''>
                                                    <h5>Tanggal : {moment(tanggal).format('DD MMMM YYYY')}</h5>
                                                </div>
                                                <div className=''>
                                                    <h5>Durasi : {durasi}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </LayoutUser>
    )
}

export default InformasiSeleksi