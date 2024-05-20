import React, { useEffect, useState } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useNavigate, Link } from 'react-router-dom'
import { FaCaretRight, FaFileAlt, FaHandPointer, FaHands, FaMapMarkedAlt, FaCheckCircle } from "react-icons/fa"
import { RiParentFill } from "react-icons/ri"
import axios from 'axios'
import "./timeline.css"

const CekFormulir = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [diri, setDiri] = useState("")
    const [alamat, setAlamat] = useState("")
    const [ortu, setOrtu] = useState("")
    const [wali, setWali] = useState("")
    const [berkas, setBerkas] = useState("")
    const [token, setToken] = useState("")
    const [nama, setNama] = useState("")
    const [idPendaftar, setIdPendaftar] = useState('')
    const [statusFormulir, setStatusFormulir] = useState('')

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

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
        getDetailForm()
        if (user) {
            setToken(user.data.token)
        }
    }, [user])

    useEffect(() => {
        getStatusFormulir()
    }, [idPendaftar])

    const getDetailForm = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/formulir/checkByToken/${user.data.token}`)
                setDiri(response.data.data[0].diri)
                setAlamat(response.data.data[0].alamat)
                setOrtu(response.data.data[0].ortu)
                setWali(response.data.data[0].wali)
                setBerkas(response.data.data[0].berkas)
                setFotoDiri(response.data.data[0].foto)
                setNama(response.data.data[0].nama)
            }
        } catch (error) {

        }
    }

    const getStatusFormulir = async () => {
        try {
            if (idPendaftar) {
                const response = await axios.get(`v1/approve/byId/${idPendaftar}`)
                setStatusFormulir(response.data.data.status_formulir)
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
                                <h1 className="mb-0 h2 fw-bold">Formulir</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row justify-content-center mb-5">
                                    {statusFormulir == 'belum' ?
                                        <>
                                            <Link to="/formulir1" state={{ token: token }} className={`timeline-point done`}>
                                                <FaCaretRight className='text-light' size={45} />
                                            </Link>

                                            <div className="timeline-space">
                                            </div>
                                        </>

                                        :
                                        ""
                                        // <Link to="/detailformulir" state={{ token: token }} className={`timeline-point done`}>
                                        //     <FaCaretRight className='text-light' size={45} />
                                        // </Link>
                                    }
                                    {/* <div className="timeline-space">
                                    </div> */}
                                    <div className={`timeline-point ${diri == 1 ? 'done' : ''}`}>
                                        <FaHandPointer className='text-light' size={45} />
                                    </div>
                                    <div className="timeline-space">
                                    </div>
                                    <div className={`timeline-point ${alamat == 1 ? 'done' : ''}`}>
                                        <FaMapMarkedAlt className='text-light' size={45} />
                                    </div>
                                    <div className="timeline-space">
                                    </div>
                                    <div className={`timeline-point ${ortu == 1 ? 'done' : ''}`}>
                                        <RiParentFill className='text-light' size={45} />
                                    </div>
                                    <div className="timeline-space ">
                                    </div>
                                    <div className={`timeline-point ${wali == 1 ? 'done' : ''}`}>
                                        <i className="fas fa-envelope fa-4x"></i>
                                        <FaHands className='text-light' size={45} />
                                    </div>
                                    <div className="timeline-space ">
                                    </div>
                                    <div className={`timeline-point ${berkas == 1 ? 'done' : ''}`}>
                                        <i className="fas fa-check fa-4x"></i>
                                        <FaFileAlt className='text-light' size={45} />
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    {statusFormulir == "belum" ?
                                        <><div className="titleplace">
                                            Klik di sini untuk mulai
                                        </div><div className="titlespace"> </div></>
                                        :
                                        ""
                                    }

                                    <div className="titleplace">
                                        Melengkapi Data Diri
                                    </div>
                                    <div className="titlespace">

                                    </div>
                                    <div className="titleplace">
                                        Mengisi Data Alamat
                                    </div>
                                    <div className="titlespace">

                                    </div>
                                    <div className="titleplace">
                                        Mengisi Data Orang Tua
                                    </div>
                                    <div className="titlespace">

                                    </div>
                                    <div className="titleplace">
                                        Mengisi Data Wali
                                    </div>
                                    <div className="titlespace">

                                    </div>
                                    <div className="titleplace">
                                        Melengkapi Berkas
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {statusFormulir == 'selesai' ?
                    <>
                        <div className="row mt-2">
                            <div className="col-xl-12 col-md-12 col-sm-12">
                                <div className="card">

                                    <div className="card-body">
                                        <div className="col-xl-12 col-md-12 col-sm-12">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <FaCheckCircle className='text-success'></FaCheckCircle>
                                                    <p>Pendaftaran anda telah selesai dalam tahap pengisian formulir silahkan untuk melanjutkan step selajnutnya yakni melakukan pembayaran</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-xl-12 col-md-12 col-sm-12">
                                <div className="card">

                                    <div className="card-body">
                                        <table>
                                            <tr>
                                                nama
                                            </tr>
                                            <tr>
                                                alamat
                                            </tr>
                                            <tr>
                                                jenis kelamin
                                            </tr>
                                        </table>
                                        <br />
                                        <br />
                                        <table>
                                            <tr>
                                                foto diri
                                            </tr>
                                            <tr>
                                                kk
                                            </tr>
                                            <tr>
                                                ktp
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    : ""}
            </div>
        </LayoutUser >
    )
}

export default CekFormulir