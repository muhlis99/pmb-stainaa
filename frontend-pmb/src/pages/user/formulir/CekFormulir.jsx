import React, { useEffect, useState } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useNavigate, Link } from 'react-router-dom'
import noProfil from "../../../assets/foto.svg"
import axios from 'axios'

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
    const [fotoDiri, setFotoDiri] = useState("")
    const [prevFoto, setPrevFoto] = useState("")
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

    useEffect(() => {
        lihatFoto()
    }, [fotoDiri])

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

    const lihatFoto = async () => {
        try {
            if (fotoDiri) {
                await axios.get(`v1/formulir/seeImage/pmb/diri/${fotoDiri}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevFoto(`data: ; base64, ${base64} `)
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
                                <h1 className="mb-0 h2 fw-bold">Formulir</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <h5>Mohon menyelesaikan pengisian formulir meliputi detail diri, detail alamat, detail orang tua sesuai kartu keluarga atau KTP.</h5>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-10">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className='row'>
                                                    <div className="col-sm-12 d-flex justify-content-center">
                                                        <img src={noProfil} className="img-thumbnail mt-3 rounded-circle" width={150} alt="..." />
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-md-12 text-center">
                                                        <h3>{nama}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5 mt-3 d-flex justify-content-center">
                                                <table cellPadding={5}>
                                                    <tbody>
                                                        <tr>
                                                            <td><h5>Detail Diri</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{diri == 1 ? <h5 className='text-success'>Selesai</h5> : <h5 className="text-danger">Belum</h5>}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Detail Alamat</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{alamat == 1 ? <h5 className='text-success'>Selesai</h5> : <h5 className="text-danger">Belum</h5>}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Detail Orang Tua</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{ortu == 1 ? <h5 className='text-success'>Selesai</h5> : <h5 className="text-danger">Belum</h5>}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Detail Wali</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{wali == 1 ? <h5 className='text-success'>Selesai</h5> : <h5 className="text-danger">Belum</h5>}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Detail Berkas</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{berkas == 1 ? <h5 className='text-success'>Selesai</h5> : <h5 className="text-danger">Belum</h5>}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-md-3 d-flex justify-content-center align-items-center">
                                                {statusFormulir == 'belum' ?
                                                    <div><Link to='/formulir1' state={{ token: token }} className="btn btn-sm btn-success ms-3">Mulai</Link></div>
                                                    :
                                                    <div><Link to='/detailformulir' state={{ token: token }} className="btn btn-sm btn-info ms-3">Lihat</Link></div>
                                                }
                                            </div>
                                        </div>
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

export default CekFormulir