import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'

const DetailApprove = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { isError, user } = useSelector((state) => state.auth)
    const [Approve, setApprove] = useState([])
    const [biodata, setBiodata] = useState([])
    const [Prodi, setProdi] = useState([])
    const [idProdi, setIdProdi] = useState('')
    const [Tahun, setTahun] = useState([])
    const [kodeTahun, setKodeTahun] = useState('')
    const [Semester, setSemester] = useState([])
    const [idSemester, setIdSemester] = useState('')

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
    }, [location])

    useEffect(() => {
        getDataProdi()
        getTahunAjaran()
    }, [])

    useEffect(() => {
        getSemester()
    }, [kodeTahun])

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
        } catch (error) {

        }
    }

    const getDataProdi = async () => {
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
                    } else if (idProdi == '') {
                        Swal.fire({
                            title: 'Error',
                            text: 'Program Studi Tidak boleh kosong',
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
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                                        <div className="card shadow-lg h-100">
                                            <div className="card-header py-1">
                                                <h5 className="card-title mt-1">
                                                    Catatan
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <ol>
                                                    <li>Silakan cek data terlebih dahulu.</li>
                                                    <li>Pastikan semua data telah benar.</li>
                                                    <li>sebelum melakukan Approve data pilihlah tahun ajaran, semester serta prodi yang akan ditempuh.</li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="card shadow-lg">
                                            <div className="card-header py-1">
                                                <h5 className="card-title mt-1">
                                                    Biodata Pendaftar
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><h5>Nama</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{biodata.nama}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Tempat Lahir</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{biodata.tempat_lahir}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Tanggal Lahir</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{moment(biodata.tanggal_lahir).format('DD MMMM YYYY')}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Jenis Kelamin</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{biodata.jenis_kelamin == 'l' ? 'Laki-Laki' : 'Perempuan'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Tanggal Daftar</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{moment(biodata.tanggal_daftar).format('DD MMMM YYYY')}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-lg-4 col-md-4 col-sm-12 mb-2">
                                        <div className="card shadow-lg h-100">
                                            <div className="card-header py-1">
                                                <h5 className="card-title mt-1">
                                                    Kelengkapan Data Pendaftar
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><h5>Fomulir</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td className={`text-capitalize fw-bold ${Approve.status_formulir == 'selesai' ? 'text-success' : 'text-danger'}`}>{Approve.status_formulir}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Pembayaran</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td className={`text-capitalize fw-bold ${Approve.status_pembayaran == 'selesai' ? 'text-success' : 'text-danger'}`}>{Approve.status_pembayaran}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Seleksi</h5></td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td className={`text-capitalize fw-bold ${Approve.status_seleksi == 'selesai' ? 'text-success' : 'text-danger'}`}>{Approve.status_seleksi}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-8 col-sm-12">
                                        <div className="card shadow-lg">
                                            <div className="card-header py-1">
                                                <h5 className="card-title mt-1">
                                                    Pemilihan Program Studi
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4 col-sm-12 mb-2">
                                                        <label htmlFor="tahunAjaran" className="form-label">Tahun Ajaran</label>
                                                        <select name="tahunAjaran" id="tahunAjaran"
                                                            className='form-select form-select-sm' value={kodeTahun || ""} onChange={(e) => setKodeTahun(e.target.value)}>
                                                            <option value="">-Tahun Ajaran-</option>
                                                            {Tahun.map((item) => (
                                                                <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-12 mb-2">
                                                        <label htmlFor="semester" className="form-label">Semester</label>
                                                        <select name="semester" id="semester"
                                                            className='form-select form-select-sm' value={idSemester || ""} onChange={(e) => setIdSemester(e.target.value)} >
                                                            <option value="">-Semester-</option>
                                                            {Semester.map((item) => (
                                                                <option key={item.id_semester} value={item.id_semester}>Semester {item.semester}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-12 mb-2">
                                                        <label htmlFor="prodi" className="form-label">Program Studi</label>
                                                        <select name="prodi" id="prodi"
                                                            className='form-select form-select-sm' value={idProdi || ""} onChange={(e) => setIdProdi(e.target.value)}>
                                                            <option value="">-Program Studi-</option>
                                                            {Prodi.map((item) => (
                                                                <option key={item.id_prodi} value={item.id_prodi}>{item.nama_prodi}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                    </div>
                </div>
            </section>
        </LayoutAdmin>
    )
}

export default DetailApprove