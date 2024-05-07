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

const Form3 = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Pekerjaan, setPekerjaan] = useState([])
    const [Penghasilan, setPenghasilan] = useState([])
    const [Pendidikan, setPendidikan] = useState([])
    const [nikAyah, setNikAyah] = useState("")
    const [namaAyah, setNamaAyah] = useState("")
    const [tgAyah, setTgAyah] = useState("")
    const [blAyah, setBlAyah] = useState("")
    const [thAyah, setThAyah] = useState("")
    const [pkrjnAyah, setPkrjnAyah] = useState("")
    const [pndptAyah, setPndptAyah] = useState("")
    const [pndknAyah, setPndknAyah] = useState("")
    const [nikIbu, setNikIbu] = useState("")
    const [namaIbu, setNamaIbu] = useState("")
    const [tgIbu, setTgIbu] = useState("")
    const [blIbu, setBlIbu] = useState("")
    const [thIbu, setThIbu] = useState("")
    const [pkrjnIbu, setPkrjnIbu] = useState("")
    const [pndptIbu, setPndptIbu] = useState("")
    const [pndknIbu, setPndknIbu] = useState("")
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
        getDetailOrtu()
    }, [location])

    useEffect(() => {
        getPekerjaan()
        getPenghasilan()
        getPendidikan()
    }, [])

    const getDetailOrtu = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            let tglLahirAyah = response.data.data.tanggal_lahir_ayah
            const tglAyah = tglLahirAyah.split("-")
            let tglLahirIbu = response.data.data.tanggal_lahir_ibu
            const tglIbu = tglLahirIbu.split("-")
            setNikAyah(response.data.data.nik_ayah)
            setNamaAyah(response.data.data.nama_ayah)
            setTgAyah(tglAyah[2])
            setBlAyah(tglAyah[1])
            setThAyah(tglAyah[0])
            setPkrjnAyah(response.data.data.pekerjaan_ayah)
            setPndptAyah(response.data.data.penghasilan_ayah)
            setPndknAyah(response.data.data.pendidikan_ayah)
            setNikIbu(response.data.data.nik_ibu)
            setNamaIbu(response.data.data.nama_ibu)
            setTgIbu(tglIbu[2])
            setBlIbu(tglIbu[1])
            setThIbu(tglIbu[0])
            setPkrjnIbu(response.data.data.pekerjaan_ibu)
            setPndptIbu(response.data.data.penghasilan_ibu)
            setPndknIbu(response.data.data.pendidikan_ibu)
        } catch (error) {

        }
    }

    const getPekerjaan = async () => {
        try {
            const response = await axios.get('v1/equipment/pekerjaan/all')
            setPekerjaan(response.data.data)
        } catch (error) {

        }
    }

    const getPenghasilan = async () => {
        try {
            const response = await axios.get('v1/equipment/penghasilan/all')
            setPenghasilan(response.data.data)
        } catch (error) {

        }
    }

    const getPendidikan = async () => {
        try {
            const response = await axios.get('v1/equipment/pendidikan/all')
            setPendidikan(response.data.data)
        } catch (error) {

        }
    }

    const tg = []
    for (let tanggal = 1; tanggal < 32; tanggal++) {
        if (tanggal < 10) {
            tg.push(<option key={tanggal} value={"0" + tanggal}>{"0" + tanggal}</option>)
        } else {
            tg.push(<option key={tanggal} value={tanggal}>{tanggal}</option>)
        }
    }

    const namaBulan = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const bl = []
    for (let bulan = 1; bulan < 13; bulan++) {
        if (bulan < 10) {
            bl.push(<option key={bulan} value={"0" + bulan}>{namaBulan[bulan]}</option>)
        } else {
            bl.push(<option key={bulan} value={bulan}>{namaBulan[bulan]}</option>)
        }
    }

    const d = new Date()
    let year = d.getFullYear()
    const th = []
    for (let tahun = 1900; tahun <= year; tahun++) {
        th.push(<option key={tahun} value={tahun}>{tahun}</option>)
    }

    const simpanOrtu = async (e) => {
        e.preventDefault()
        try {
            if (nikAyah == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'NIK Ayah tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (namaAyah == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Nama Ayah tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (tgAyah == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Tanggal Lahir Ayah tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (blAyah == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Bulan Lahir Ayah tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (thAyah == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Tahun Lahir Ayah tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (pkrjnAyah == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Pekerjaan Ayah tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (pndptAyah == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Penghasilan Ayah tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (pndknAyah == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Pendidikan Ayah tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (nikIbu == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'NIK Ibu tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (namaIbu == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Nama Ibu tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (tgIbu == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Tanggal Lahir Ibu tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (blIbu == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Bulan Lahir Ibu tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (thIbu == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Tahun Lahir Ibu tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (pkrjnIbu == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Pekerjaan Ibu tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (pndptIbu == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Penghasilan Ibu tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (pndknIbu == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Pendidikan Ibu tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else {
                setLoading(true)
                await axios.put(`v1/formulir/form3/${location.state.token}`, {
                    nik_ayah: nikAyah,
                    nama_ayah: namaAyah,
                    tahun_a: thAyah,
                    bulan_a: blAyah,
                    tanggal_a: tgAyah,
                    pekerjaan_ayah: pkrjnAyah,
                    penghasilan_ayah: pndptAyah,
                    pendidikan_ayah: pndknAyah,
                    nik_ibu: nikIbu,
                    nama_ibu: namaIbu,
                    tahun_b: thIbu,
                    bulan_b: blIbu,
                    tanggal_b: tgIbu,
                    pekerjaan_ibu: pkrjnIbu,
                    penghasilan_ibu: pndptIbu,
                    pendidikan_ibu: pndknIbu
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: 'Berhasil',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        navigate('/formulir4', { state: { token: location.state.token } })
                    })
                })
            }
        } catch (error) {
            setLoading(false)
            console.log(error.response.data);
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
                                    <h1 className="mb-0 h2 fw-bold">Detail Orang Tua</h1>
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
                                <div className="timeline-point done">
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
                            <form autoComplete='off' onSubmit={simpanOrtu}>
                                <div className="card">
                                    <div className="card-header py-2">
                                        <h4 className="card-title mt-2">Formulir Data Orang Tua</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="row border-bottom">
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="nikAyah" className="form-label">NIK Ayah</label>
                                                <input type="number" id="nikAyah" className="form-control form-control-sm" name="nikAyah" placeholder="NIK Ayah" value={nikAyah} onChange={(e) => setNikAyah(e.target.value)} />
                                            </div>
                                            <div className="col-md-8 mb-3">
                                                <label htmlFor="namaAyah" className="form-label">Nama Ayah</label>
                                                <input type="text" id="namaAyah" className="form-control form-control-sm" name="namaAyah" placeholder="Nama Ayah" value={namaAyah} onChange={(e) => setNamaAyah(e.target.value)} />
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="tanggalLahirAyah" className="form-label">Tanggal Lahir</label>
                                                <select name="tanggalLahirAyah" id="tanggalLahirAyah" className='form-select form-select-sm' value={tgAyah} onChange={(e) => setTgAyah(e.target.value)}>
                                                    <option value="">Tanggal Lahir</option>
                                                    {tg}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="bulanLahirAyah" className="form-label">Bulan Lahir</label>
                                                <select name="bulanLahirAyah" id="bulanLahirAyah" className='form-select form-select-sm' value={blAyah} onChange={(e) => setBlAyah(e.target.value)}>
                                                    <option value="">Bulan Lahir</option>
                                                    {bl}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="tahunLahirAyah" className="form-label">Tahun Lahir</label>
                                                <select name="tahunLahirAyah" id="tahunLahirAyah" className='form-select form-select-sm' value={thAyah} onChange={(e) => setThAyah(e.target.value)}>
                                                    <option value="">Tahun Lahir</option>
                                                    {th}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="pekerjaanAyah" className="form-label">Pekerjaan Ayah</label>
                                                <select name="pekerjaanAyah" id="pekerjaanAyah" className='form-select form-select-sm' value={pkrjnAyah} onChange={(e) => setPkrjnAyah(e.target.value)}>
                                                    <option value="">Pekerjaan Ayah</option>
                                                    {Pekerjaan.map((item) => (
                                                        <option key={item.id_pekerjaan} value={item.code_pekerjaan}>{item.nama_pekerjaan}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="penghasilanAyah" className="form-label">Penghasilan Ayah</label>
                                                <select name="penghasilanAyah" id="penghasilanAyah" className='form-select form-select-sm' value={pndptAyah} onChange={(e) => setPndptAyah(e.target.value)}>
                                                    <option value="">Penghasilan Ayah</option>
                                                    {Penghasilan.map((item) => (
                                                        <option key={item.id_penghasilan} value={item.code_penghasilan}>{item.nama_penghasilan}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="pendidikanAyah" className="form-label">Pendidikan Ayah</label>
                                                <select name="pendidikanAyah" id="pendidikanAyah" className='form-select form-select-sm' value={pndknAyah} onChange={(e) => setPndknAyah(e.target.value)}>
                                                    <option value="">Pendidikan Ayah</option>
                                                    {Pendidikan.map((item) => (
                                                        <option key={item.id_pendidikan} value={item.code_pendidikan}>{item.nama_pendidikan}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="nikIbu" className="form-label">NIK Ibu</label>
                                                <input type="number" id="nikIbu" className="form-control form-control-sm" name="nikIbu" placeholder="NIK Ibu" value={nikIbu} onChange={(e) => setNikIbu(e.target.value)} />
                                            </div>
                                            <div className="col-md-8 mb-3">
                                                <label htmlFor="namaIbu" className="form-label">Nama Ibu</label>
                                                <input type="text" id="namaIbu" className="form-control form-control-sm" name="namaIbu" placeholder="Nama Ibu" value={namaIbu} onChange={(e) => setNamaIbu(e.target.value)} />
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="tanggalLahirIbu" className="form-label">Tanggal Lahir</label>
                                                <select name="tanggalLahirIbu" id="tanggalLahirIbu" className='form-select form-select-sm' value={tgIbu} onChange={(e) => setTgIbu(e.target.value)}>
                                                    <option value="">Tanggal Lahir</option>
                                                    {tg}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="bulanLahirIbu" className="form-label">Bulan Lahir</label>
                                                <select name="bulanLahirIbu" id="bulanLahirIbu" className='form-select form-select-sm' value={blIbu} onChange={(e) => setBlIbu(e.target.value)}>
                                                    <option value="">Bulan Lahir</option>
                                                    {bl}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="tahunLahirIbu" className="form-label">Tahun Lahir</label>
                                                <select name="tahunLahirIbu" id="tahunLahirIbu" className='form-select form-select-sm' value={thIbu} onChange={(e) => setThIbu(e.target.value)}>
                                                    <option value="">Tahun Lahir</option>
                                                    {th}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="pekerjaanIbu" className="form-label">Pekerjaan Ibu</label>
                                                <select name="pekerjaanIbu" id="pekerjaanIbu" className='form-select form-select-sm' value={pkrjnIbu} onChange={(e) => setPkrjnIbu(e.target.value)}>
                                                    <option value="">Pekerjaan Ibu</option>
                                                    {Pekerjaan.map((item) => (
                                                        <option key={item.id_pekerjaan} value={item.code_pekerjaan}>{item.nama_pekerjaan}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="penghasilanIbu" className="form-label">Penghasilan Ibu</label>
                                                <select name="penghasilanIbu" id="penghasilanIbu" className='form-select form-select-sm' value={pndptIbu} onChange={(e) => setPndptIbu(e.target.value)}>
                                                    <option value="">Penghasilan Ibu</option>
                                                    {Penghasilan.map((item) => (
                                                        <option key={item.id_penghasilan} value={item.code_penghasilan}>{item.nama_penghasilan}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="pendidikanIbu" className="form-label">Pendidikan Ibu</label>
                                                <select name="pendidikanIbu" id="pendidikanIbu" className='form-select form-select-sm' value={pndknIbu} onChange={(e) => setPndknIbu(e.target.value)}>
                                                    <option value="">Pendidikan Ibu</option>
                                                    {Pendidikan.map((item) => (
                                                        <option key={item.id_pendidikan} value={item.code_pendidikan}>{item.nama_pendidikan}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <Link to="/cekdetaildata" className="btn btn-sm btn-danger">Kembali</Link>
                                        <div className="float-end d-flex gap-2">
                                            <Link to="/formulir2" state={{ token: location.state.token }} className='btn btn-info btn-sm'>Sebelumnya</Link>
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

export default Form3