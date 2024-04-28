import React, { useEffect, useState } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { FallingLines } from 'react-loader-spinner'
import Swal from 'sweetalert2'

const Form4 = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Pekerjaan, setPekerjaan] = useState([])
    const [Penghasilan, setPenghasilan] = useState([])
    const [Pendidikan, setPendidikan] = useState([])
    const [nikWali, setNikWali] = useState("")
    const [namaWali, setNamaWali] = useState("")
    const [tgWali, setTgWali] = useState("")
    const [blWali, setBlWali] = useState("")
    const [thWali, setThWali] = useState("")
    const [pkrjnWali, setPkrjnWali] = useState("")
    const [pndptWali, setPndptWali] = useState("")
    const [pndknWali, setPndknWali] = useState("")
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
        getDetailWali()
    }, [location])

    useEffect(() => {
        getPekerjaan()
        getPenghasilan()
        getPendidikan()
    }, [])

    const getDetailWali = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            let tglLahirWali = response.data.data.tanggal_lahir_wali
            const tglWali = tglLahirWali.split("-")
            setNikWali(response.data.data.nik_wali)
            setNamaWali(response.data.data.nama_wali)
            setTgWali(tglWali[2])
            setBlWali(tglWali[1])
            setThWali(tglWali[0])
            setPkrjnWali(response.data.data.pekerjaan_wali)
            setPndptWali(response.data.data.penghasilan_wali)
            setPndknWali(response.data.data.pendidikan_wali)
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

    const salinAyah = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            let tglLahirAyah = response.data.data.tanggal_lahir_ayah
            const tglAyah = tglLahirAyah.split("-")
            setNikWali(response.data.data.nik_ayah)
            setNamaWali(response.data.data.nama_ayah)
            setTgWali(tglAyah[2])
            setBlWali(tglAyah[1])
            setThWali(tglAyah[0])
            setPkrjnWali(response.data.data.pekerjaan_ayah)
            setPndptWali(response.data.data.penghasilan_ayah)
            setPndknWali(response.data.data.pendidikan_ayah)
        } catch (error) {

        }
    }

    const salinIbu = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            let tglLahirIbu = response.data.data.tanggal_lahir_ibu
            const tglIbu = tglLahirIbu.split("-")
            setNikWali(response.data.data.nik_ibu)
            setNamaWali(response.data.data.nama_ibu)
            setTgWali(tglIbu[2])
            setBlWali(tglIbu[1])
            setThWali(tglIbu[0])
            setPkrjnWali(response.data.data.pekerjaan_ibu)
            setPndptWali(response.data.data.penghasilan_ibu)
            setPndknWali(response.data.data.pendidikan_ibu)
        } catch (error) {

        }
    }

    const simpanWali = async (e) => {
        e.preventDefault()
        try {
            if (nikWali == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'NIK Wali tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (namaWali == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Nama Wali tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (tgWali == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Tanggal Lahir Wali tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (blWali == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Bulan Lahir Wali tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (thWali == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Tahun Lahir Wali tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (pkrjnWali == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Pekerjaan Wali tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (pndptWali == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Penghasilan Wali tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (pndknWali == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Pendidikan Wali tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else {
                setLoading(true)
                await axios.put(`v1/formulir/form4/${location.state.token}`, {
                    nik_wali: nikWali,
                    nama_wali: namaWali,
                    tahun_w: thWali,
                    bulan_w: blWali,
                    tanggal_w: tgWali,
                    pekerjaan_wali: pkrjnWali,
                    penghasilan_wali: pndptWali,
                    pendidikan_wali: pndknWali
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: 'Berhasil',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        navigate('/formulir5', { state: { token: location.state.token } })
                    })
                })
            }
        } catch (error) {
            setLoading(false)
            console.log(error.response.data)
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
                                    <h1 className="mb-0 h2 fw-bold">Detail Wali</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <form autoComplete='off' onSubmit={simpanWali}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row border-bottom pb-2">
                                            <div className="col-md-12 d-flex gap-2">
                                                <button type="button" className='btn btn-secondary btn-sm' onClick={salinAyah}>Salin Data Ayah</button>
                                                <button type="button" className='btn btn-secondary btn-sm' onClick={salinIbu}>Salin Data Ibu</button>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="nikWali" className="form-label">NIK Wali</label>
                                                <input type="number" id="nikWali" className="form-control form-control-sm" name="nikWali" placeholder="NIK Wali" value={nikWali} onChange={(e) => setNikWali(e.target.value)} />
                                            </div>
                                            <div className="col-md-8 mb-3">
                                                <label htmlFor="namaWali" className="form-label">Nama Wali</label>
                                                <input type="text" id="namaWali" className="form-control form-control-sm" name="namaWali" placeholder="Nama Wali" value={namaWali} onChange={(e) => setNamaWali(e.target.value)} />
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="tanggalLahirWali" className="form-label">Tanggal Lahir</label>
                                                <select name="tanggalLahirWali" id="tanggalLahirWali" className='form-select form-select-sm' value={tgWali} onChange={(e) => setTgWali(e.target.value)}>
                                                    <option value="">Tanggal Lahir</option>
                                                    {tg}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="bulanLahirWali" className="form-label">Bulan Lahir</label>
                                                <select name="bulanLahirWali" id="bulanLahirWali" className='form-select form-select-sm' value={blWali} onChange={(e) => setBlWali(e.target.value)}>
                                                    <option value="">Bulan Lahir</option>
                                                    {bl}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="tahunLahirWali" className="form-label">Tahun Lahir</label>
                                                <select name="tahunLahirWali" id="tahunLahirWali" className='form-select form-select-sm' value={thWali} onChange={(e) => setThWali(e.target.value)}>
                                                    <option value="">Tahun Lahir</option>
                                                    {th}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="pekerjaanWali" className="form-label">Pekerjaan Wali</label>
                                                <select name="pekerjaanWali" id="pekerjaanWali" className='form-select form-select-sm' value={pkrjnWali} onChange={(e) => setPkrjnWali(e.target.value)}>
                                                    <option value="">Pekerjaan Wali</option>
                                                    {Pekerjaan.map((item) => (
                                                        <option key={item.id_pekerjaan} value={item.code_pekerjaan}>{item.nama_pekerjaan}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="penghasilanWali" className="form-label">Penghasilan Wali</label>
                                                <select name="penghasilanWali" id="penghasilanWali" className='form-select form-select-sm' value={pndptWali} onChange={(e) => setPndptWali(e.target.value)}>
                                                    <option value="">Penghasilan Wali</option>
                                                    {Penghasilan.map((item) => (
                                                        <option key={item.id_penghasilan} value={item.code_penghasilan}>{item.nama_penghasilan}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="pendidikanWali" className="form-label">Pendidikan Wali</label>
                                                <select name="pendidikanWali" id="pendidikanWali" className='form-select form-select-sm' value={pndknWali} onChange={(e) => setPndknWali(e.target.value)}>
                                                    <option value="">Pendidikan Wali</option>
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
                                            <Link to="/formulir3" state={{ token: location.state.token }} className='btn btn-info btn-sm'>Sebelumnya</Link>
                                            <button type='submit' className='btn btn-sm btn-info float-end'>Selanjutnya</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </LayoutUser >
    )
}

export default Form4