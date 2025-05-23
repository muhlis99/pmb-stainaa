import React, { useEffect, useState } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaBalanceScale, FaBook, FaCheck } from "react-icons/fa"
import Swal from 'sweetalert2'

const PemilihanProdi = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Prodi, setProdi] = useState([])
    const [tahun, setTahun] = useState('')
    const [prodiSekunder, setProdiSekunder] = useState('')
    const [prodiPrimer, setProdiPrimer] = useState('')

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        let date = new Date()
        let year = date.getFullYear()
        setTahun(year)
    }, [])

    useEffect(() => {
        getAllProdi()
    }, [])

    useEffect(() => {
        const getProdiByToken = async () => {
            try {
                if (user) {
                    const response = await axios.get(`v1/seleksi/getProdibyToken/${user.data.token}`)
                    setProdiPrimer(response.data.data.prodi_primer)
                    setProdiSekunder(response.data.data.prodi_sekunder)
                }
            } catch (error) {
                // console.log(error.response);
            }
        }

        getProdiByToken()
    }, [user])


    const getAllProdi = async () => {
        try {
            const response = await axios.get(`v1/seleksi/prodi`)
            setProdi(response.data.data)
        } catch (error) {

        }
    }



    const background = ['text-secondary', 'text-info', 'text-primary', 'text-success', 'text-danger', 'text-warning']
    const ikon = [<FaBook />, <FaBalanceScale />]

    const pilihProdi = (e) => {
        try {
            Swal.fire({
                title: "Yakin memilih prodi ini?",
                text: 'Pastikan pilihan anda tepat!',
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Batal'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const dataProdiSekunder = await axios.get(`/v1/seleksi/seleksiProdi/${e}`)
                    const prodiSekunder = dataProdiSekunder.data.data.id_prodi

                    await axios.put(`/v1/seleksi/pemilihanProdiUser/${user.data.token}`, {
                        prodi_primer: e,
                        prodi_sekunder: prodiSekunder,
                    }).then(function (response) {
                        Swal.fire({
                            title: 'Berhasil',
                            text: 'Anda telah menyelesaikan pemilihan Prodi',
                            icon: 'success',
                            confirmButtonColor: '#3085d6'
                        }).then(() => {
                            navigate(0)
                        })
                    })
                }
            })

        } catch (error) {

        }
    }

    const done = (e) => {
        Swal.fire({
            title: "anda sudah yakin ??",
            text: 'Pastikan pilihan anda tepat!',
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                navigate('/infoseleksi')
            }
        })
    }

    return (
        <LayoutUser>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-2 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-2 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Pemilihan Prodi</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 offset-2">
                        <p className='text-center my-4'>Pilihlah prodi pertama sesuai keinginan anda!</p>
                        <div className="row">
                            {Prodi.map((item, index) => (
                                <div key={item.id_prodi} className="col-md-6">
                                    <div className={`card shadow ${item.id_prodi == prodiPrimer ? "bg-light" : ""}`} style={{ cursor: 'pointer' }} onClick={() => pilihProdi(item.id_prodi)}>
                                        <div className="text-center my-4">
                                            <h1 className={`display-2 ${background[index]} mb-2 fw-bold`}>{ikon[index]}</h1>
                                            <p className="mb-0">{item.nama_prodi}</p>
                                        </div>
                                        <div className='d-flex justify-content-center mb-3'>
                                            {/* <button className='btn btn-info btn-sm' onClick={() => pilihProdi(item.id_prodi)}><FaCheck /> Pilih</button> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="row mt-8">
                    <div className="col-md-8 offset-2">
                        <p className='text-center my-4'>Opsi prodi anda terpilih sesuai pilihan prodi pertama</p>
                        <div className="row">
                            {Prodi.map((item, index) => (
                                <div key={item.id_prodi} className="col-md-6">
                                    <div className={`card shadow ${item.id_prodi == prodiSekunder ? "bg-light" : ""}`}>
                                        <div className="text-center my-4">
                                            <h1 className={`display-2 ${background[index]} mb-2 fw-bold`}>{ikon[index]}</h1>
                                            <p className="mb-0">{item.nama_prodi}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {
                    prodiPrimer == "" ? ""
                        :
                        <div className="row mt-8">
                            <div className="col-md-8 offset-2">
                                <div className="row">
                                    <div className="card shadow ">
                                        <div className="my-4">
                                            <p className="text-center mb-0">Setelah anda memilih prodi silahkan click tombol dibawah ini untuk menyelesaikan pemilihan prodi!</p>
                                            <button onClick={() => done()} className='btn btn-sm btn-info float offset-5 mt-3'>Selesai</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </LayoutUser >
    )
}

export default PemilihanProdi