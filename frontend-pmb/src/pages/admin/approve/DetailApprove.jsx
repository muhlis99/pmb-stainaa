import React, { useState, useEffect, useRef } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from "../../../assets/noimage.svg"
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'
import { FaBalanceScale, FaBook } from "react-icons/fa"
import kop from "../../../assets/kop.png"
import jsPDF from "jspdf"



const DetailApprove = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const templateRef = useRef(null)
    const { isError, user } = useSelector((state) => state.auth)
    const [Approve, setApprove] = useState([])
    const [biodata, setBiodata] = useState([])
    const [Prodi, setProdi] = useState([])
    const [idProdi, setIdProdi] = useState('')
    const [Tahun, setTahun] = useState([])
    const [kodeTahun, setKodeTahun] = useState('')
    const [Semester, setSemester] = useState([])
    const [idSemester, setIdSemester] = useState('')
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
    const [prodiSekunder, setProdiSekunder] = useState("")
    const [prodiPrimer, setProdiPrimer] = useState("")
    const [prodiKetAdmin, setProdiKetAdmin] = useState("")
    const [indexProdiKetAdmin, setIndexProdiKetAdmin] = useState("")
    const [index, setIndex] = useState("")
    const [nik, setNik] = useState("")
    const [biodataBuktiPendaftaran, setBiodataBuktiPendaftaran] = useState([])


    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getApproveById()
        getMhsByToken()
        getHasilProdiMhs()
        getIndexProdiAdmin()
        getBiodataBuktiPendaftaran()
    }, [location])

    useEffect(() => {
        getDataProdi()
        getTahunAjaran()
    }, [])

    useEffect(() => {
        getSemester()
    }, [kodeTahun])

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

    const background = ['text-secondary', 'text-info', 'text-primary', 'text-success', 'text-danger', 'text-warning']
    const ikon = [<FaBook />, <FaBalanceScale />]
    const tableStyle = {
        image: {
            width: '597px'
        },
        wrap: {
            width: '600px',
            fontFamily: "Arial, Helvetica, sans-serif",
            background: '#ffffff',
            color: '#000000'
        },
        title: {
            fontSize: '12px',
            margin: 'auto',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            width: '80%',
            margin: 'auto',
            fontSize: '10px'
        },
        gridItem: {
            fontSize: '10px',
        },
        table: {
            fontSize: '8px',
            margin: 'auto',
            width: '80%',
            border: '1px solid black',
            borderCollapse: 'collapse'
        },
        tr: {
        },
        td: {
            padding: '5px 6px',
            border: '1px solid black',
            borderCollapse: 'collapse',
            fontWeight: 'bold'
        },
        td2: {
            padding: '5px 6px',
            border: '1px solid black',
            borderCollapse: 'collapse'
        },
        tdMakul: {
            padding: '5px 6px',
            border: '1px solid black',
            borderCollapse: 'collapse',
            wordSpacing: '2px'
        },
    }


    const getApproveById = async () => {
        try {
            const response = await axios.get(`v1/approve/byId/${location.state.idApprove}`)
            setApprove(response.data.data)
        } catch (error) {

        }
    }

    const getMhsByToken = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            setBiodata(response.data.data)
            setNik(response.data.data.nik)
            setNegara(response.data.data.negaras[0].nama_negara)
            setProvinsi(response.data.data.provinsis[0].nama_provinsi)
            setKabupaten(response.data.data.kabupatens[0].nama_kabupaten)
            setKecamatan(response.data.data.kecamatans[0].nama_kecamatan)
            setDesa(response.data.data.desas[0].nama_desa)
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

    async function getDataProdi() {
        try {
            const response = await axios.get(`v1/seleksi/prodi`)
            setProdi(response.data.data)
        } catch (error) {
        }
    }

    const getTahunAjaran = async () => {
        try {
            const response = await axios.get('v1/approve/tahunAjaran')
            setTahun(response.data.data.sort((a, b) => b.id_tahun_ajaran - a.id_tahun_ajaran))
        } catch (error) {

        }
    }

    const getSemester = async () => {
        try {
            if (kodeTahun) {
                const response = await axios.get(`v1/approve/semester/${kodeTahun}`)
                setSemester(response.data.data)
            }
        } catch (error) {

        }
    }

    const approveData = () => {
        try {

            Swal.fire({
                title: "Approve Data ini?",
                text: 'Pastikan semua data telah valid',
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, approve',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (kodeTahun == '') {
                        Swal.fire({
                            title: 'Error',
                            text: 'Tahun Ajaran Tidak boleh kosong',
                            icon: 'error',
                            confirmButtonColor: '#3085d6'
                        })
                    } else if (idSemester == '') {
                        Swal.fire({
                            title: 'Error',
                            text: 'Semester Tidak boleh kosong',
                            icon: 'error',
                            confirmButtonColor: '#3085d6'
                        })
                    } else {
                        axios.put(`v1/approve/approve`, {
                            token: location.state.token,
                            prodi: idProdi,
                            semester: idSemester
                        }).then(function (response) {
                            Swal.fire({
                                title: 'Berhasil',
                                text: response.data.message,
                                icon: 'success',
                                confirmButtonColor: '#3085d6'
                            }).then(() => {
                                navigate('/approve')
                            })
                        })
                    }
                }
            })
        } catch (error) {

        }
    }

    const getHasilProdiMhs = async () => {
        try {
            const response = await axios.get(`/v1/seleksi/getProdiByToken/${location.state.token}`)
            setProdiPrimer(response.data.data.prodiprimer[0].nama_prodi)
            setProdiSekunder(response.data.data.prodisekunder[0].nama_prodi)
            setProdiKetAdmin(response.data.data.prodiseleksiadmin[0].nama_prodi)
            setIndexProdiKetAdmin(response.data.data.prodi_seleksi_admin)
        } catch (error) {

        }
    }

    const getIndexProdiAdmin = () => {
        if (indexProdiKetAdmin == "1") {
            let i = 0
            setIndex(i)
        } else {
            let i = 1
            setIndex(i)
        }
    }

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: 'a4',
            orientation: 'potrait',
            unit: 'pt',
        })

        doc.setFont('Inter-Regular', 'normal')
        doc.setFontSize(1);

        doc.html(templateRef.current, {
            async callback(doc) {
                await doc.save('Bukti Pendaftaran ' + biodataBuktiPendaftaran.nama)
            }
        })
    }

    const getBiodataBuktiPendaftaran = async () => {
        try {
            const data = await axios.get(`/v1/approve/mhsByNik/${nik}`)
            setBiodataBuktiPendaftaran(data.data.data)

        } catch (error) {

        }
    }

    const downloadBuktiPendaftaran = () => {
        try {
            handleGeneratePdf()
        } catch (error) {

        }
    }


    return (
        <LayoutAdmin>
            <section className="container-fluid p-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-3 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Approve</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-md-12 colsm-12">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 colsm-12">
                                <div className="card shadow-lg mb-3">
                                    <div className="card-header py-1">
                                        <h5 className="card-title mt-1">
                                            Detail Diri
                                        </h5>
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
                                <div className="card shadow-lg mb-3">
                                    <div className="card-header py-1">
                                        <h5 className="card-title mt-1">
                                            Data Prodi
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-xl-4 col-md-4 col-sm-12">
                                                <div className={`card shadow bg-light`}>
                                                    <div className="text-center my-4">
                                                        <p className="mb-0"> PRODI PERTAMA </p>
                                                        <h1 className={`display-2 ${background[0]} mb-2 fw-bold`}>{ikon[0]}</h1>
                                                        <p className="mb-0">{prodiPrimer}</p>
                                                    </div>
                                                    <div className='d-flex justify-content-center mb-3'>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-md-4 col-sm-12">
                                                <div className={`card shadow bg-light`}>
                                                    <div className="text-center my-4">
                                                        <p className="mb-0"> PRODI KEDUA </p>
                                                        <h1 className={`display-2 ${background[1]} mb-2 fw-bold`}>{ikon[1]}</h1>
                                                        <p className="mb-0">{prodiSekunder}</p>
                                                    </div>
                                                    <div className='d-flex justify-content-center mb-3'>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-md-4 col-sm-12">
                                                <div className={`card shadow bg-light`}>
                                                    <div className="text-center my-4">
                                                        <p className="mb-0"> PRODI KETENTUAN ADMIN </p>
                                                        <h1 className={`display-2 ${background[index]} mb-2 fw-bold`}>{ikon[index]}</h1>
                                                        <p className="mb-0">{prodiKetAdmin}</p>
                                                    </div>
                                                    <div className='d-flex justify-content-center mb-3'>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    Approve.status == "tidak" ?
                                        <>
                                            <div className="card shadow-lg mb-3">
                                                <div className="card-body">
                                                    <div className="row mt-2 mb-2">
                                                        <p className='text-center h4'>
                                                            Sebelum melakukan Apprpove Diharap menetukan tahun ajaran dan semester calon mahasiswa baru
                                                        </p>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                                                            <label htmlFor="tahunAjaran" className="form-label">Tahun Ajaran</label>
                                                            <select name="tahunAjaran" id="tahunAjaran"
                                                                className='form-select form-select-sm' value={kodeTahun || ""} onChange={(e) => setKodeTahun(e.target.value)}>
                                                                <option value="">-Tahun Ajaran-</option>
                                                                {Tahun.map((item) => (
                                                                    <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                                                            <label htmlFor="semester" className="form-label">Semester</label>
                                                            <select name="semester" id="semester"
                                                                className='form-select form-select-sm' value={idSemester || ""} onChange={(e) => setIdSemester(e.target.value)} >
                                                                <option value="">-Semester-</option>
                                                                {Semester.map((item) => (
                                                                    <option key={item.id_semester} value={item.id_semester}>Semester {item.semester}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <Link to="/approve" className='btn btn-danger btn-sm'>Kembali</Link>
                                                            <button onClick={approveData} className='btn btn-info btn-sm float-end'>Approve</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="card shadow-lg mb-3">
                                                <div className="card-body">
                                                    <div className="row mt-2 mb-2">
                                                        <p className='text-center h4'>
                                                            APPROVAL / PERSETUJUAN calon mahasiswa baru telah berhasil dimohon  diberitahukan kepada yang bersangkutan, dan silahkan download bukti approval Dibawah ini atas perhatian dan kerjasamanya TERIMAKASIH.
                                                        </p>

                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 text-center">
                                                            <button className='btn btn-sm btn-secondary mt-1' onClick={() => { downloadBuktiPendaftaran() }}>Download Bukti Pendaftaran</button>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="row">
                                                        <div className="col-md-12 text-center">
                                                            <Link to="/approve" className=' btn btn-danger btn-sm'>Kembali</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                }
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row mt-3 d-none">
                    <div ref={templateRef}>
                        <div style={tableStyle.wrap}>
                            <img src={kop} alt="kop" style={tableStyle.image} />

                            <div style={tableStyle.grid} className='mb-3 mt-3'>
                                <div style={tableStyle.gridItem}>
                                    <h4 className='fw-bold'>NO. Pendaftaran : {user && user.data.token}</h4>
                                    <table cellPadding={5}>
                                        <tbody>
                                            <tr>
                                                <td><span>NIM</span></td>
                                                <td>&nbsp;:&nbsp;</td>
                                                <td>{biodataBuktiPendaftaran.nim}</td>
                                            </tr>
                                            <tr>
                                                <td><span>NIK</span></td>
                                                <td>&nbsp;:&nbsp;</td>
                                                <td>{biodataBuktiPendaftaran.nik}</td>
                                            </tr>
                                            <tr>
                                                <td>Nama</td>
                                                <td>&nbsp;:&nbsp;</td>
                                                <td>{biodataBuktiPendaftaran.nama}</td>
                                            </tr>
                                            <tr>
                                                <td>Tempat/Tanggal Lahir</td>
                                                <td>&nbsp;:&nbsp;</td>
                                                <td>{biodataBuktiPendaftaran.tempat_lahir}, {biodataBuktiPendaftaran.tanggal_lahir}</td>
                                            </tr>
                                            <tr>
                                                <td>Jenis Kelamin</td>
                                                <td>&nbsp;:&nbsp;</td>
                                                <td>{biodataBuktiPendaftaran.kelamin == 'l' ? 'Laki-Laki' : 'Perempuan'}</td>
                                            </tr>
                                            <tr>
                                                <td>Prodi</td>
                                                <td>&nbsp;:&nbsp;</td>
                                                <td>{prodiKetAdmin}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div style={tableStyle.gridItem}>
                                    <div className='border mt-5 text-center algn-items-center' style={{ width: '135px', height: '160px' }}>
                                        <h6 style={{ marginTop: '70px' }}>4x6</h6>
                                    </div>
                                </div>
                            </div>
                            <div style={tableStyle.grid}>
                                <div>
                                    <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>Selamat! Anda telah berhasil mendaftar pada  Sekolah Tinggi Nurul Abror Al-Robbaniyin
                                        Alasbuluh Wongsorejo Banyuwangi.</p>

                                    <span style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                                        Silakan menyampaikan dokumen persyaratan dalam bentuk hardcopy ke</span>
                                    <ol>
                                        <li>BUAK STAINAA atau</li>
                                        <li>Panitia PMB STAINAA.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutAdmin>
    )
}

export default DetailApprove