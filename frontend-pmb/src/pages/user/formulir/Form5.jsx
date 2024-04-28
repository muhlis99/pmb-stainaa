import React, { useEffect, useState } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { FallingLines } from 'react-loader-spinner'
import Swal from 'sweetalert2'


const Form5 = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const [foto, setFoto] = useState("")
    const [fotos, setFotos] = useState("")
    const [prevFoto, setPrevFoto] = useState("")
    const [ktp, setKtp] = useState("")
    const [ktps, setKtps] = useState("")
    const [prevKtp, setPrevKtp] = useState("")
    const [kk, setKk] = useState("")
    const [kks, setKks] = useState("")
    const [prevKk, setPrevKk] = useState("")
    const [ijazah, setIjazah] = useState("")
    const [ijazahs, setIjazahs] = useState("")
    const [prevIjazah, setPrevIjazah] = useState("")

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getDataDiri()
    }, [location])

    useEffect(() => {
        fotoDiri()
        scanKtp()
        scanKk()
        scanIjazah()
    }, [fotos, kks, ktps, ijazahs])

    const getDataDiri = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            setFotos(response.data.data.foto_diri)
            setKtps(response.data.data.foto_ktp)
            setKks(response.data.data.foto_kk)
            setIjazahs(response.data.data.ijazah)
        } catch (error) {

        }
    }

    const fotoDiri = async () => {
        try {
            if (fotos) {
                await axios.get(`v1/formulir/seeImage/pmb/diri/${fotos}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevFoto(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const scanKtp = async () => {
        try {
            if (ktps) {
                await axios.get(`v1/formulir/seeImage/pmb/ktp/${ktps}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevKtp(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const scanKk = async () => {
        try {
            if (kks) {
                await axios.get(`v1/formulir/seeImage/pmb/kk/${kks}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevKk(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const scanIjazah = async () => {
        try {
            if (ijazahs) {
                await axios.get(`v1/formulir/seeImage/pmb/ijazah/${ijazahs}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevIjazah(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const loadFoto = (e) => {
        const image = e.target.files[0]
        setFoto(image)
        setPrevFoto(URL.createObjectURL(image))
    }

    const loadKtp = (e) => {
        const image = e.target.files[0]
        setKtp(image)
        setPrevKtp(URL.createObjectURL(image))
    }

    const loadKk = (e) => {
        const image = e.target.files[0]
        setKk(image)
        setPrevKk(URL.createObjectURL(image))
    }

    const loadIjazah = (e) => {
        const image = e.target.files[0]
        setIjazah(image)
        console.log(image);
        setPrevIjazah(URL.createObjectURL(image))
    }

    const simpanBerkas = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("foto_diri", foto)
        formData.append("foto_kk", kk)
        formData.append("foto_ktp", ktp)
        formData.append("foto_ijazah", ijazah)
        try {
            if (foto == fotos) {
                Swal.fire({
                    title: "Foto Tidak Boleh Kosong",
                    icon: "warning"
                })
            } else if (kk == kks) {
                Swal.fire({
                    title: "Scan Kartu Keluarga Tidak Boleh Kosong",
                    icon: "warning"
                })
            } else if (ktp == ktps) {
                Swal.fire({
                    title: "Scan KTP Tidak Boleh Kosong",
                    icon: "warning"
                })
            } else if (ijazah == ijazahs) {
                Swal.fire({
                    title: "Scan Ijazah Tidak Boleh Kosong",
                    icon: "warning"
                })
            } else {
                setLoading(true)
                await axios.put(`v1/formulir/formUpload/${location.state.token}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        navigate("/cekdetaildata")
                    });
                })
            }
        } catch (error) {
            setLoading(false)
            if (error.response) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                })
            }
        }
    }

    return (
        <LayoutUser>
            {loading ?
                <div className='position-absolute z-3 bg-light start-0 end-0 top-0 bottom-0 w-100 d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
                    <div>
                        <FallingLines
                            color="#754FFE"
                            width="100"
                            visible={true}
                            ariaLabel="falling-circles-loading"
                            className="align-items-center"
                        />
                    </div>
                </div>
                :
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12">
                            <div className="border-bottom pb-2 mb-3 d-lg-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-0">
                                    <h1 className="mb-0 h2 fw-bold">Upload Berkas</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <form autoComplete='off' onSubmit={simpanBerkas}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="fotoDiri" className="form-label">Foto Diri</label>
                                                <div className='text-center mb-2'>
                                                    {prevFoto ?
                                                        <img src={prevFoto} alt="" width={150} className='border border-3' />
                                                        :
                                                        ""
                                                    }
                                                </div>
                                                <input type="file" onChange={loadFoto} name="fotoDiri" id="fotoDiri" className='form-control form-control-sm' />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="scanKtp" className="form-label">Scan KTP</label>
                                                <div className='text-center mb-2'>
                                                    {prevKtp ?
                                                        <img src={prevKtp} alt="" width={150} className='border border-3' />
                                                        :
                                                        ""
                                                    }
                                                </div>
                                                <input type="file" onChange={loadKtp} name="scanKtp" id="scanKtp" className='form-control form-control-sm' />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="scanKk" className="form-label">Scan Kartu Keluarga</label>
                                                <div className='text-center mb-2'>
                                                    {prevKk ?
                                                        <img src={prevKk} alt="" width={150} className='border border-3' />
                                                        :
                                                        ""
                                                    }
                                                </div>
                                                <input type="file" onChange={loadKk} name="scanKk" id="scanKk" className='form-control form-control-sm' />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="scanIjazah" className="form-label">Scan Ijazah/SKL</label>
                                                <div className='text-center mb-2'>
                                                    {prevIjazah ?
                                                        <img src={prevIjazah} alt="" width={150} className='border border-3' />
                                                        :
                                                        ""
                                                    }
                                                </div>
                                                <input type="file" onChange={loadIjazah} name="scanIjazah" id="scanIjazah" className='form-control form-control-sm' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <Link to="/cekdetaildata" className="btn btn-sm btn-danger">Kembali</Link>
                                        <div className="float-end d-flex gap-2">
                                            <Link to="/formulir4" state={{ token: location.state.token }} className='btn btn-info btn-sm'>Sebelumnya</Link>
                                            <button type='submit' className='btn btn-sm btn-info float-end'>Selesai</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </LayoutUser>
    )
}

export default Form5