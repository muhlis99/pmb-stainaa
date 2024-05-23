import React, { useEffect, useState } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { FallingLines } from 'react-loader-spinner'
import Swal from 'sweetalert2'
import "./timeline.css"
import { FaFileAlt, FaHandPointer, FaHands, FaMapMarkedAlt } from "react-icons/fa"
import { RiParentFill } from "react-icons/ri"

const Form2 = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Negara, setNegara] = useState([])
    const [Provinsi, setProvinsi] = useState([])
    const [Kabupaten, setKabupaten] = useState([])
    const [Kecamatan, setKecamatan] = useState([])
    const [Desa, setDesa] = useState([])
    const [Jenis, setJenis] = useState([])
    const [AlatTrans, setAlatTrans] = useState([])
    const [kodeNegara, setKodeNegara] = useState("")
    const [kodeProvinsi, setKodeProvinsi] = useState("")
    const [kodeKabupaten, setKodeKabupaten] = useState("")
    const [kodeKecamatan, setKodeKecamatan] = useState("")
    const [kodeDesa, setKodeDesa] = useState("")
    const [kodePos, setKodePos] = useState("")
    const [dusun, setDusun] = useState("")
    const [rt, setRt] = useState("")
    const [rw, setRw] = useState("")
    const [jalan, setJalan] = useState("")
    const [jenisTinggal, setJenisTinggal] = useState("")
    const [alatTransportasi, setAlatTransportasi] = useState("")
    const [loading, setLoading] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getDataAlamat()
    }, [location])

    useEffect(() => {
        getNegara()
        getJenisTinggal()
        getAlatTrans()
    }, [])

    useEffect(() => {
        getProvinsiByNegara()
    }, [kodeNegara])

    useEffect(() => {
        getKabupatenByProvinsi()
    }, [kodeProvinsi])

    useEffect(() => {
        getKecamatanByKabupaten()
    }, [kodeKabupaten])

    useEffect(() => {
        getDesaByKecamatan()
    }, [kodeKecamatan])

    const getDataAlamat = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            setKodeNegara(response.data.data.negara)
            setKodeProvinsi(response.data.data.provinsi)
            setKodeKabupaten(response.data.data.kabupaten)
            setKodeKecamatan(response.data.data.kecamatan)
            setKodeDesa(response.data.data.desa)
            setKodePos(response.data.data.kode_pos)
            setDusun(response.data.data.dusun)
            setRt(response.data.data.rt)
            setRw(response.data.data.rw)
            setJalan(response.data.data.jalan)
            setJenisTinggal(response.data.data.jenis_tinggal)
            setAlatTransportasi(response.data.data.alat_transportasi)
        } catch (error) {

        }
    }

    const getNegara = async () => {
        try {
            const response = await axios.get('v1/equipment/negara/all')
            setNegara(response.data.data)
        } catch (error) {

        }
    }

    const getProvinsiByNegara = async () => {
        if (kodeNegara) {
            const response = await axios.get(`v1/equipment/provinsi/getByCodeNegara/${kodeNegara}`)
            setProvinsi(response.data.data)
        }
    }

    const getKabupatenByProvinsi = async () => {
        if (kodeProvinsi) {
            const response = await axios.get(`v1/equipment/kabupaten/getByCodeProvinsi/${kodeProvinsi}`)
            setKabupaten(response.data.data)
        }
    }

    const getKecamatanByKabupaten = async () => {
        if (kodeKabupaten) {
            const response = await axios.get(`v1/equipment/kecamatan/getByCodeKabupaten/${kodeKabupaten}`)
            setKecamatan(response.data.data)
        }
    }

    const getDesaByKecamatan = async () => {
        if (kodeKecamatan) {
            const response = await axios.get(`v1/equipment/desa/getByCodeKecamatan/${kodeKecamatan}`)
            setDesa(response.data.data)
        }
    }

    const getJenisTinggal = async () => {
        try {
            const response = await axios.get('v1/equipment/jenisTinggal/all')
            setJenis(response.data.data)
        } catch (error) {

        }
    }

    const getAlatTrans = async () => {
        try {
            const response = await axios.get('v1/equipment/alatTransportasi/all')
            setAlatTrans(response.data.data)
        } catch (error) {

        }
    }

    const simpanAlamat = async (e) => {
        e.preventDefault()
        try {
            if (kodeNegara == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Negara tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (kodeProvinsi == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Provinsi tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (kodeKabupaten == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Kabupaten tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (kodeKecamatan == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Kecamatan tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (kodeDesa == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Desa tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (kodePos == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Kode Pos tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })

            } else if (dusun == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Dusun tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })

            } else if (rt == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'RT tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })

            } else if (rw == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'RW tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })

            } else if (jalan == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Jalan tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })

            } else if (jenisTinggal == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Jenis Tinggal tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })

            } else if (alatTransportasi == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Alat Transportasi tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })

            } else {
                setLoading(true)
                await axios.put(`v1/formulir/form2/${location.state.token}`, {
                    jalan: jalan,
                    dusun: dusun,
                    rt: rt,
                    rw: rw,
                    kode_pos: kodePos,
                    negara: kodeNegara,
                    provinsi: kodeProvinsi,
                    kabupaten: kodeKabupaten,
                    kecamatan: kodeKecamatan,
                    desa: kodeDesa,
                    jenis_tinggal: jenisTinggal,
                    alat_transportasi: alatTransportasi
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: 'Berhasil',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        navigate('/formulir3', { state: { token: location.state.token } })
                    })
                })
            }
        } catch (error) {

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
                                    <h1 className="mb-0 h2 fw-bold">Detail Alamat</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xl-12 col-md-12 col-sm-12">
                            <div className="row justify-content-center mb-5">
                                <div className="timeline-point done">
                                    <FaHandPointer className='text-light' size={45} />
                                </div>
                                <div className="timeline-space">
                                </div>
                                <div className="timeline-point done">
                                    <FaMapMarkedAlt className='text-light' size={45} />
                                </div>
                                <div className="timeline-space">
                                </div>
                                <div className="timeline-point">
                                    <RiParentFill className='text-light' size={45} />
                                </div>
                                <div className="timeline-space ">
                                </div>
                                <div className="timeline-point">
                                    <i className="fas fa-envelope fa-4x"></i>
                                    <FaHands className='text-light' size={45} />
                                </div>
                                <div className="timeline-space ">
                                </div>
                                <div className="timeline-point">
                                    <i className="fas fa-check fa-4x"></i>
                                    <FaFileAlt className='text-light' size={45} />
                                </div>
                            </div>
                            <div className="row justify-content-center">
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
                    <div className="row">
                        <div className="col-md-12">
                            <form autoComplete='off' onSubmit={simpanAlamat}>
                                <div className="card">
                                    <div className="card-header py-2">
                                        <h4 className="card-title mt-2">Formulir Data Alamat</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor="negara" className="form-label">Negara</label>
                                                <select name="negara" id="negara" className='form-select form-select-sm text-uppercase' value={kodeNegara || ''} onChange={(e) => setKodeNegara(e.target.value)}>
                                                    <option value="">-Negara-</option>
                                                    {Negara.map((item) => (
                                                        <option key={item.id_negara} value={item.code_negara}>{item.nama_negara}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor="provinsi" className="form-label">Provinsi</label>
                                                <select name="provinsi" id="provinsi" className='form-select form-select-sm text-uppercase' value={kodeProvinsi || ''} onChange={(e) => setKodeProvinsi(e.target.value)}>
                                                    <option value="">-Provinsi-</option>
                                                    {Provinsi.map((item) => (
                                                        <option key={item.id_provinsi} value={item.code_provinsi}>{item.nama_provinsi}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor="kabupaten" className="form-label">Kabupaten</label>
                                                <select name="kabupaten" id="kabupaten" className='form-select form-select-sm text-uppercase' value={kodeKabupaten || ''} onChange={(e) => setKodeKabupaten(e.target.value)}>
                                                    <option value="">-Kabupaten-</option>
                                                    {Kabupaten.map((item) => (
                                                        <option key={item.id_kabupaten} value={item.code_kabupaten}>{item.nama_kabupaten}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor="kecamatan" className="form-label">Kecamatan</label>
                                                <select name="kecamatan" id="kecamatan" className='form-select form-select-sm text-uppercase' value={kodeKecamatan || ''} onChange={(e) => setKodeKecamatan(e.target.value)}>
                                                    <option value="">-Kecamatan-</option>
                                                    {Kecamatan.map((item) => (
                                                        <option key={item.id_kecamatan} value={item.code_kecamatan}>{item.nama_kecamatan}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor="desa" className="form-label">Desa</label>
                                                <select name="desa" id="desa" className='form-select form-select-sm text-uppercase' value={kodeDesa || ''} onChange={(e) => setKodeDesa(e.target.value)}>
                                                    <option value="">-Desa-</option>
                                                    {Desa.map((item) => (
                                                        <option key={item.id_desa} value={item.code_desa}>{item.nama_desa}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor="kodepos" className="form-label">Kode Pos</label>
                                                <input type="number" id="kodepos" className="form-control form-control-sm text-uppercase" name="kodepos" placeholder="Masukkan Kode Pos" value={kodePos || ''} onChange={(e) => setKodePos(e.target.value)} />
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor="dusun" className="form-label">Dusun</label>
                                                <input type="text" id="dusun" className="form-control form-control-sm text-uppercase" name="dusun" placeholder="Masukkan Dusun" value={dusun || ''} onChange={(e) => setDusun(e.target.value)} />
                                            </div>
                                            <div className="col-md-3">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label htmlFor="rt" className="form-label">RT</label>
                                                        <input type="number" id="rt" className="form-control form-control-sm text-uppercase" name="rt" placeholder="RT" value={rt || ''} onChange={(e) => setRt(e.target.value)} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label htmlFor="rw" className="form-label">RW</label>
                                                        <input type="number" id="rw" className="form-control form-control-sm text-uppercase" name="rw" placeholder="RW" value={rw || ''} onChange={(e) => setRw(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="jalan" className="form-label">Jalan</label>
                                                <textarea name="jalan" id="jalan" className='form-control text-uppercase' value={jalan || ''} onChange={(e) => setJalan(e.target.value)} placeholder='masukkan jalan'></textarea>
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor="jenisTinggal" className="form-label">Jenis Tinggal</label>
                                                <select name="jenisTinggal" id="jenisTinggal" className='form-select form-select-sm text-uppercase' value={jenisTinggal || ''} onChange={(e) => setJenisTinggal(e.target.value)}>
                                                    <option value="">-Jenis Tinggal-</option>
                                                    {Jenis.map((item) => (
                                                        <option key={item.id_jenis_tinggal} value={item.code_jenis_tinggal}>{item.nama_jenis_tinggal}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor="alatTransport" className="form-label">Alat Transportasi</label>
                                                <select name="alatTransport" id="alatTransport" className='form-select form-select-sm text-uppercase' value={alatTransportasi || ''} onChange={(e) => setAlatTransportasi(e.target.value)}>
                                                    <option value="">-Alat Transportasi-</option>
                                                    {AlatTrans.map((item) => (
                                                        <option key={item.id_alat_transportasi} value={item.code_alat_transportasi}>{item.nama_alat_transportasi}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <Link to="/cekdetaildata" className="btn btn-sm btn-danger">Kembali</Link>
                                        <div className="float-end d-flex gap-2">
                                            <Link to="/formulir1" state={{ token: location.state.token }} className='btn btn-info btn-sm'>Sebelumnya</Link>
                                            <button type='submit' className='btn btn-sm btn-info float-end'>Selanjutnya</button>
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

export default Form2