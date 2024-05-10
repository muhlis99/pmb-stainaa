import React, { useState, useEffect } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from "../../../assets/noimage.svg"
import axios from 'axios'
import moment from 'moment'

const DetailFormulir = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { isError, user } = useSelector((state) => state.auth)
    const [biodata, setBiodata] = useState([])
    const [jalurPendaftaran, setJalurPendaftaran] = useState("")
    const [jenisPendaftaran, setJenisPendaftaran] = useState("")
    const [jenisTinggal, setJenisTinggal] = useState("")
    const [alatTransportasi, setAlatTransportasi] = useState("")
    const [pekerjaanAyah, setPekerjaanAyah] = useState("")
    const [penghasilanAyah, setPenghasilanAyah] = useState("")
    const [pendidikanAyah, setPendidikanAyah] = useState("")
    const [pekerjaanIbu, setPekerjaanIbu] = useState("")
    const [penghasilanIbu, setPenghasilanIbu] = useState("")
    const [pendidikanIbu, setPendidikanIbu] = useState("")
    const [pekerjaanWali, setPekerjaanWali] = useState("")
    const [penghasilanWali, setPenghasilanWali] = useState("")
    const [pendidikanWali, setPendidikanWali] = useState("")
    const [fotoMhs, setfotoMhs] = useState('')
    const [fotoKtp, setfotoKtp] = useState('')
    const [fotoIjazah, setfotoIjazah] = useState('')
    const [fotoKk, setfotoKk] = useState('')
    const [fotoSuket, setfotoSuket] = useState('')
    const [desa, setDesa] = useState("")
    const [kecamatan, setKecamatan] = useState("")
    const [kabupaten, setKabupaten] = useState("")
    const [provinsi, setProvinsi] = useState("")
    const [negara, setNegara] = useState("")

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getMhsByToken()
    }, [user])

    useEffect(() => {
        jalurPendaftaranByCode()
        jenisPendaftaranByCode()
        jenisTinggalByCode()
        alatTransportasiByCode()
        pekerjaanAyahByCode()
        pendidikanAyahByCode()
        penghasilanAyahByCode()
        pekerjaanIbuByCode()
        pendidikanIbuByCode()
        penghasilanIbuByCode()
        pekerjaanWaliByCode()
        pendidikanWaliByCode()
        penghasilanWaliByCode()
    }, [biodata])

    const getMhsByToken = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/formulir/getByToken/${user.data.token}`)
                setBiodata(response.data.data)
                setNegara(response.data.data.negaras[0].nama_negara)
                setProvinsi(response.data.data.provinsis[0].nama_provinsi)
                setKabupaten(response.data.data.kabupatens[0].nama_kabupaten)
                setKecamatan(response.data.data.kecamatans[0].nama_kecamatan)
                setDesa(response.data.data.desas[0].nama_desa)
            }
        } catch (error) {

        }
    }

    const jalurPendaftaranByCode = async () => {
        if (biodata.jalur_pendaftaran) {
            const response = await axios.get(`v1/equipment/jalurPendaftaran/getById/${biodata.jalur_pendaftaran}`)
            setJalurPendaftaran(response.data.data.nama_jalur_pendaftaran)
        }
    }

    const jenisPendaftaranByCode = async () => {
        if (biodata.jenis_pendaftaran) {
            const response = await axios.get(`v1/equipment/jenisPendaftaran/getById/${biodata.jenis_pendaftaran}`)
            setJenisPendaftaran(response.data.data.nama_jenis_pendaftaran)
        }
    }

    const jenisTinggalByCode = async () => {
        if (biodata.jenis_tinggal) {
            const response = await axios.get(`v1/equipment/jenisTinggal/getById/${biodata.jenis_tinggal}`)
            setJenisTinggal(response.data.data.nama_jenis_tinggal)
        }
    }

    const alatTransportasiByCode = async () => {
        if (biodata.alat_transportasi) {
            const response = await axios.get(`v1/equipment/alatTransportasi/getById/${biodata.alat_transportasi}`)
            setAlatTransportasi(response.data.data.nama_alat_transportasi)
        }
    }

    const pekerjaanAyahByCode = async () => {
        if (biodata.pekerjaan_ayah) {
            const response = await axios.get(`v1/equipment/pekerjaan/getByCode/${biodata.pekerjaan_ayah}`)
            setPekerjaanAyah(response.data.data.nama_pekerjaan)
        }
    }

    const pendidikanAyahByCode = async () => {
        if (biodata.pendidikan_ayah) {
            const response = await axios.get(`v1/equipment/pendidikan/getByCode/${biodata.pendidikan_ayah}`)
            setPendidikanAyah(response.data.data.nama_pendidikan)
        }
    }

    const penghasilanAyahByCode = async () => {
        if (biodata.penghasilan_ayah) {
            const response = await axios.get(`v1/equipment/penghasilan/getByCode/${biodata.penghasilan_ayah}`)
            setPenghasilanAyah(response.data.data.nama_penghasilan)
        }
    }

    const pekerjaanIbuByCode = async () => {
        if (biodata.pekerjaan_ibu) {
            const response = await axios.get(`v1/equipment/pekerjaan/getByCode/${biodata.pekerjaan_ibu}`)
            setPekerjaanIbu(response.data.data.nama_pekerjaan)
        }
    }

    const pendidikanIbuByCode = async () => {
        if (biodata.pendidikan_ibu) {
            const response = await axios.get(`v1/equipment/pendidikan/getByCode/${biodata.pendidikan_ibu}`)
            setPendidikanIbu(response.data.data.nama_pendidikan)
        }
    }

    const penghasilanIbuByCode = async () => {
        if (biodata.penghasilan_ibu) {
            const response = await axios.get(`v1/equipment/penghasilan/getByCode/${biodata.penghasilan_ibu}`)
            setPenghasilanIbu(response.data.data.nama_penghasilan)
        }
    }

    const pekerjaanWaliByCode = async () => {
        if (biodata.pekerjaan_wali) {
            const response = await axios.get(`v1/equipment/pekerjaan/getByCode/${biodata.pekerjaan_wali}`)
            setPekerjaanWali(response.data.data.nama_pekerjaan)
        }
    }

    const pendidikanWaliByCode = async () => {
        if (biodata.pendidikan_wali) {
            const response = await axios.get(`v1/equipment/pendidikan/getByCode/${biodata.pendidikan_wali}`)
            setPendidikanWali(response.data.data.nama_pendidikan)
        }
    }

    const penghasilanWaliByCode = async () => {
        if (biodata.penghasilan_wali) {
            const response = await axios.get(`v1/equipment/penghasilan/getByCode/${biodata.penghasilan_wali}`)
            setPenghasilanWali(response.data.data.nama_penghasilan)
        }
    }

    useEffect(() => {
        fotoDiri()
        kk()
        ktp()
        ijazah()
        suket()
    }, [biodata])

    const fotoDiri = async () => {
        try {
            if (biodata.foto_diri) {
                await axios.get(`v1/formulir/seeImage/pmb/diri/${biodata.foto_diri}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setfotoMhs(base64)
                })

            }
        } catch (error) {

        }
    }

    const kk = async () => {
        try {
            if (biodata.foto_kk) {
                await axios.get(`v1/formulir/seeImage/pmb/kk/${biodata.foto_kk}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setfotoKk(base64)
                })

            }
        } catch (error) {

        }
    }

    const ktp = async () => {
        try {
            if (biodata.foto_ktp) {
                await axios.get(`v1/formulir/seeImage/pmb/ktp/${biodata.foto_ktp}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setfotoKtp(base64)
                })

            }
        } catch (error) {

        }
    }

    const ijazah = async () => {
        try {
            if (biodata.foto_ijazah) {
                await axios.get(`v1/formulir/seeImage/pmb/ijazah/${biodata.foto_ijazah}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setfotoIjazah(base64)
                })

            }
        } catch (error) {

        }
    }

    const suket = async () => {
        try {
            if (biodata.foto_suket_santri) {
                await axios.get(`v1/formulir/seeImage/pmb/suketSantri/${biodata.foto_suket_santri}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setfotoSuket(base64)
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
                    <div className="col-xl-12 col-md-12 colsm-12">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 colsm-12">
                                <div className="card shadow-lg mb-3">
                                    <div className="card-header py-2">
                                        <Link to='/cekdetaildata' className='btn btn-sm btn-danger'>Kembali</Link>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-xl-6 col-md-6 col-sm-12">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><h5>NIK</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{biodata.nik}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>No KK</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{biodata.no_kk}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>NPWP</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{biodata.npwp}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Nama</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5 className='text-capitalize'>{biodata.nama}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Tempat Lahir</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5 className='text-capitalize'>{biodata.tempat_lahir}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Tanggal Lahir</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5 className='text-capitalize'>{moment(biodata.tanggal_lahir).format('DD MMMM YYYY')}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Jenis Kelamin</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5 className='text-capitalize'>{biodata.jenis_kelamin == 'l' ? 'Laki-Laki' : biodata.jenis_kelamin == 'p' ? 'Perempuan' : ''}</h5></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-xl-6 col-md-6 col-sm-12">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><h5>Email</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{biodata.email}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>NISN</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5 className='text-capitalize'>{biodata.nisn}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Penerima KPS</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5 className='text-capitalize'>{biodata.penerima_kps}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Nomor KPS</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5 className='text-capitalize'>{biodata.no_kps == '' ? '-' : biodata.no_kps}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Jalur Pendaftaran</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5 className='text-capitalize'>{jalurPendaftaran}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Jenis Pendaftaran</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5 className='text-capitalize'>{jenisPendaftaran}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Tanggal Daftar</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{moment(biodata.tanggal_daftar).format('DD MMMM YYYY h:mm:ss A')}</h5></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card shadow-lg mb-3">
                                    <div className="card-header py-1">
                                        <h5 className="card-title mt-1">
                                            Detail Alamat
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-xl-6 col-md-6 col-sm-12">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><h5>Alamat Jalan</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{biodata.jalan}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Dusun</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{biodata.dusun}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>RT</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{biodata.rt}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>RW</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{biodata.rw}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Kode Pos</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{biodata.kode_pos}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Desa</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{desa}</h5></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-xl-6 col-md-6 col-sm-12">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><h5>Kecamatan</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{kecamatan}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Kabupaten</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{kabupaten}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Provinsi</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{provinsi}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Negara</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{negara}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Transportasi</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{alatTransportasi}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Jenis Tinggal</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{jenisTinggal}</h5></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card shadow-lg mb-3">
                                    <div className="card-header py-1">
                                        <h5 className="card-title mt-1">
                                            Detail Orang Tua
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-xl-6 col-md-6 col-sm-12">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><h5>NIK Ayah</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{biodata.nik_ayah}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Nama Ayah</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5 className='text-capitalize'>{biodata.nama_ayah}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Tanggal Lahir</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{moment(biodata.tanggal_lahir_ayah).format('DD MMMM YYYY')}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Pekerjaan</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{pekerjaanAyah}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Penghasilan</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{penghasilanAyah}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Pendidikan</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{pendidikanAyah}</h5></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-xl-6 col-md-6 col-sm-12">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><h5>NIK Ibu</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{biodata.nik_ibu}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Nama Ibu</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5 className='text-capitalize'>{biodata.nama_ibu}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Tanggal Lahir</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{moment(biodata.tanggal_lahir_ibu).format('DD MMMM YYYY')}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Pekerjaan</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{pekerjaanIbu}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Penghasilan</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{penghasilanIbu}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Pendidikan</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{pendidikanIbu}</h5></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card shadow-lg mb-3">
                                    <div className="card-header py-1">
                                        <h5 className="card-title mt-1">
                                            Detail Wali
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-xl-6 col-md-6 col-sm-12">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><h5>NIK Wali</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{biodata.nik_wali}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Nama Wali</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5 className='text-capitalize'>{biodata.nama_wali}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Tanggal Lahir</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{moment(biodata.tanggal_lahir_wali).format('DD MMMM YYYY')}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Pekerjaan</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{pekerjaanWali}</h5></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-xl-6 col-md-6 col-sm-12">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><h5>Penghasilan</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{penghasilanWali}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Pendidikan</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{pendidikanWali}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>No WhatsApp</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{biodata.no_hp}</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>No Telepon</h5></td>
                                                            <td><h5>&nbsp;:&nbsp;</h5></td>
                                                            <td><h5>{biodata.no_telepon}</h5></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card shadow-lg mb-3">
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-xl-2 col-md-2 col-sm-12">
                                                <div className="card shadow-lg">
                                                    <div className="card-header py-1">
                                                        <h6 className='card-title mt-2'>Foto Diri</h6>
                                                    </div>
                                                    <div className="card-body p-1">
                                                        {fotoMhs ?
                                                            <img src={`data:;base64,${fotoMhs}`} alt="" className='img-fluid' />
                                                            :
                                                            <img src={logo} alt="" className='img-fluid' />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-2 col-md-2 col-sm-12">
                                                <div className="card shadow-lg">
                                                    <div className="card-header py-1">
                                                        <h6 className='card-title mt-2'>Scan KTP</h6>
                                                    </div>
                                                    <div className="card-body p-1">
                                                        {fotoKtp ?
                                                            <img src={`data:;base64,${fotoKtp}`} alt="" className='img-fluid' />
                                                            :
                                                            <img src={logo} alt="" className='img-fluid' />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-2 col-md-2 col-sm-12">
                                                <div className="card shadow-lg">
                                                    <div className="card-header py-1">
                                                        <h6 className='card-title mt-2'>Scan KK</h6>
                                                    </div>
                                                    <div className="card-body p-1">
                                                        {fotoKk ?
                                                            <img src={`data:;base64,${fotoKk}`} alt="" className='img-fluid' />
                                                            :
                                                            <img src={logo} alt="" className='img-fluid' />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-2 col-md-2 col-sm-12">
                                                <div className="card shadow-lg">
                                                    <div className="card-header py-1">
                                                        <h6 className='card-title mt-2'>Scan Ijazah</h6>
                                                    </div>
                                                    <div className="card-body p-1">
                                                        {fotoIjazah ?
                                                            <img src={`data:;base64,${fotoIjazah}`} alt="" className='img-fluid' />
                                                            :
                                                            <img src={logo} alt="" className='img-fluid' />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-2 col-md-2 col-sm-12">
                                                <div className="card shadow-lg">
                                                    <div className="card-header py-1">
                                                        <h6 className='card-title mt-2'>Ket Aktif</h6>
                                                    </div>
                                                    <div className="card-body p-1">
                                                        {fotoSuket ?
                                                            <img src={`data:;base64,${fotoSuket}`} alt="" className='img-fluid' />
                                                            :
                                                            <img src={logo} alt="" className='img-fluid' />
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
                </div>
            </div>
        </LayoutUser>
    )
}

export default DetailFormulir