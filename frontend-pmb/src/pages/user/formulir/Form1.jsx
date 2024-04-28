import React, { useEffect, useState } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { FallingLines } from 'react-loader-spinner'
import Swal from 'sweetalert2'

const Form1 = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Jalur, setJalur] = useState([])
    const [Jenis, setJenis] = useState([])
    const [nik, setNik] = useState("")
    const [nama, setNama] = useState("")
    const [tmp, setTmp] = useState("")
    const [tgl, setTgl] = useState("")
    const [bln, setBln] = useState("")
    const [thn, setThn] = useState("")
    const [kk, setKk] = useState("")
    const [jenkel, setJenkel] = useState("")
    const [email, setEmail] = useState("")
    const [nohp, setNohp] = useState("")
    const [notelp, setNotelp] = useState("")
    const [nisn, setNisn] = useState("")
    const [pkps, setPkps] = useState("")
    const [nokps, setNokps] = useState("")
    const [npwp, setNpwp] = useState("")
    const [jalurp, setJalurp] = useState("")
    const [jenisp, setJenisp] = useState("")
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
        getDataDiri()
    }, [location])

    useEffect(() => {
        getJalur()
        getJenis()
    }, [])

    const getDataDiri = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            setNik(response.data.data.nik)
            setNama(response.data.data.nama)
            setTmp(response.data.data.tempat_lahir)
            let tglLahir = response.data.data.tanggal_lahir
            const tgArray = tglLahir.split("-")
            setTgl(tgArray[2])
            setBln(tgArray[1])
            setThn(tgArray[0])
            setJenkel(response.data.data.jenis_kelamin)
            setKk(response.data.data.no_kk)
            setNisn(response.data.data.nisn)
            setEmail(response.data.data.email)
            setPkps(response.data.data.penerima_kps)
            setNokps(response.data.data.no_kps)
            setNpwp(response.data.data.npwp)
            setJalurp(response.data.data.jalur_pendaftaran)
            setJenisp(response.data.data.jenis_pendaftaran)
            setNohp(response.data.data.no_hp)
            setNotelp(response.data.data.no_telepon)
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

    const getJalur = async () => {
        try {
            const response = await axios.get('v1/equipment/jalurPendaftaran/all')
            setJalur(response.data.data)
        } catch (error) {

        }
    }

    const getJenis = async () => {
        try {
            const response = await axios.get('v1/equipment/jenisPendaftaran/all')
            setJenis(response.data.data)
        } catch (error) {

        }
    }

    const simpanForm1 = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.put(`v1/formulir/form1/${location.state.token}`, {
                nik: nik,
                no_kk: kk,
                no_kps: nokps,
                nisn: nisn,
                npwp: npwp,
                nama: nama,
                tahun: thn,
                bulan: bln,
                tanggal: tgl,
                tempat_lahir: tmp,
                jenis_kelamin: jenkel,
                jalur_pendaftaran: jalurp,
                jenis_pendaftaran: jenisp,
                email: email,
                no_hp: nohp,
                no_telepon: notelp,
                penerima_kps: pkps
            }).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: 'Berhasil',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonColor: '#3085d6'
                }).then(() => {
                    navigate('/formulir2', { state: { token: location.state.token } })
                })
            })
        } catch (error) {
            setLoading(false)
            console.log(error.response.data)
        }
    }

    return (
        <LayoutUser>
            {
                loading ?
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
                                        <h1 className="mb-0 h2 fw-bold">Detail Diri</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <form autoComplete='off' onSubmit={simpanForm1}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="nik" className="form-label">NIK</label>
                                                    <input type="number" id="nik" className="form-control form-control-sm" name="nik" placeholder="Masukkan NIK" value={nik || ''} onChange={(e) => setNik(e.target.value)} />
                                                </div>
                                                <div className="col-md-9 mb-3">
                                                    <label htmlFor="nama" className="form-label">Nama</label>
                                                    <input type="text" id="nama" className="form-control form-control-sm" name="nama" placeholder="Masukkan Nama" value={nama || ''} onChange={(e) => setNama(e.target.value)} />
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="tmp" className="form-label">Tempat Lahir</label>
                                                    <input type="text" id="tmp" className="form-control form-control-sm" name="tmp" placeholder="Tempat Lahir" value={tmp || ''} onChange={(e) => setTmp(e.target.value)} />
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="tgl" className="form-label">Tanggal Lahir</label>
                                                    <select name="tgl" id="tgl" className='form-select form-select-sm' value={tgl || ''} onChange={(e) => setTgl(e.target.value)}>
                                                        <option value="">-Pilih Tanggal-</option>
                                                        {tg}
                                                    </select>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="bln" className="form-label">Bulan Lahir</label>
                                                    <select name="bln" id="bln" className='form-select form-select-sm' value={bln || ''} onChange={(e) => setBln(e.target.value)}>
                                                        <option value="">-Pilih Bulan-</option>
                                                        {bl}
                                                    </select>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="thn" className="form-label">Tahun Lahir</label>
                                                    <select name="thn" id="thn" className='form-select form-select-sm' value={thn || ''} onChange={(e) => setThn(e.target.value)}>
                                                        <option value="">-Pilih Tahun-</option>
                                                        {th}
                                                    </select>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="jenkel" className="form-label">Jenis Kelamin</label>
                                                    <select name="jenkel" id="jenkel" className='form-select form-select-sm' value={jenkel || ''} onChange={(e) => setJenkel(e.target.value)}>
                                                        <option value="">-Jenis Kelamin-</option>
                                                        <option value="l">Laki-Laki</option>
                                                        <option value="p">Perempuan</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="kk" className="form-label">Nomor KK</label>
                                                    <input type="text" id="kk" className="form-control form-control-sm" name="kk" placeholder="Masukkan No KK" value={kk || ''} onChange={(e) => setKk(e.target.value)} />
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="nisn" className="form-label">NISN</label>
                                                    <input type="number" id="nisn" className="form-control form-control-sm" name="nisn" placeholder="Masukkan NISN" value={nisn || ''} onChange={(e) => setNisn(e.target.value)} />
                                                </div>
                                                <div className='col-md-3 mb-3'>
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input type="email" id="email" className="form-control form-control-sm" name="email" placeholder="example@gmail.com" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="pkps" className="form-label">Penerima KPS</label>
                                                    <select name="pkps" id="pkps" className='form-select form-select-sm' value={pkps || ''} onChange={(e) => setPkps(e.target.value)}>
                                                        <option value="">-Pilih KPS-</option>
                                                        <option value="ya">Ya</option>
                                                        <option value="tidak">Tidak</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="nokps" className="form-label">Nomor KPS</label>
                                                    <input type="text" id="nokps" className="form-control form-control-sm" name="nokps" placeholder="Masukkan NO KPS" value={nokps || ''} onChange={(e) => setNokps(e.target.value)} />
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="npwp" className="form-label">NPWP</label>
                                                    <input type="number" id="npwp" className="form-control form-control-sm" name="npwp" placeholder="Masukkan NPWP" value={npwp || ''} onChange={(e) => setNpwp(e.target.value)} />
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="nohp" className='form-label'>No WhatsApp</label>
                                                    <input type="number" name='nohp' id='nohp' className='form-control form-control-sm' placeholder='Nomor WhatsApp' value={nohp || ''} onChange={(e) => setNohp(e.target.value)} />
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="notelp" className='form-label'>No Telepon</label>
                                                    <input type="number" name='notelp' id='notelp' className='form-control form-control-sm' placeholder='Nomor Telepon' value={notelp || ''} onChange={(e) => setNotelp(e.target.value)} />
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="jalurP" className="form-label">Jalur Pendaftaran</label>
                                                    <select name="jalurP" id="jalurP" className='form-select form-select-sm' value={jalurp || ''} onChange={(e) => setJalurp(e.target.value)}>
                                                        <option value="">-Pilih Jalur-</option>
                                                        {Jalur.map((jlr) => (
                                                            <option key={jlr.id_jalur_pendaftaran} value={jlr.code_jalur_pendaftaran}>{jlr.nama_jalur_pendaftaran}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="jenisP" className="form-label">Jenis Pendaftaran</label>
                                                    <select name="jenisP" id="jenisP" className='form-select form-select-sm' value={jenisp || ''} onChange={(e) => setJenisp(e.target.value)}>
                                                        <option value="">-Pilih Jenis-</option>
                                                        {Jenis.map((jns) => (
                                                            <option key={jns.id_jenis_pendaftaran} value={jns.code_jenis_pendaftaran}>{jns.nama_jenis_pendaftaran}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='card-footer'>
                                            <Link to="/cekdetaildata" className="btn btn-sm btn-danger">Kembali</Link>
                                            <button type='submit' className='btn btn-sm btn-info float-end'>Selanjutnya</button>
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

export default Form1