import React, { useState, useEffect, useRef } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import { FaCalendarAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'

const KirimInformasi = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const openModal = useRef()
    const closeModal = useRef()
    const { isError, user } = useSelector((state) => state.auth)
    const [biodata, setBiodata] = useState([])
    const [DataInformasi, setDataInformasi] = useState([])
    const [idInformasi, setIdInformasi] = useState("")
    const [judul, setJudul] = useState('')
    const [isiInformasi, setIsiInformasi] = useState('')
    const [modalTitle, setModalTitle] = useState("")

    useEffect(() => { console.log(location.state.token) }, [location])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getBiodataByToken()
        getDataInformasi()
    }, [location])

    useEffect(() => {
        getInformasiById()
    }, [idInformasi])

    const getBiodataByToken = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            setBiodata(response.data.data)
        } catch (error) {

        }
    }

    const getDataInformasi = async () => {
        try {
            const response = await axios.get(`v1/informasi/allbytoken/${location.state.token}`)
            setDataInformasi(response.data.data.sort((a, b) => b.id_infomasi - a.id_infomasi))
        } catch (error) {

        }
    }

    const modalOpen = () => {
        setModalTitle("Kirim")
        openModal.current.click()
    }

    const modalClose = () => {
        setJudul()
        setIsiInformasi()
        setIdInformasi()
        closeModal.current.click()
    }

    const kirimPesan = async (e) => {
        e.preventDefault()
        try {
            if (judul == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Judul tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (isiInformasi == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Informasi tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else {
                await axios.post('v1/informasi/tambah', {
                    judul: judul,
                    isi: isiInformasi,
                    token: location.state.token
                }).then(function (response) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        getDataInformasi()
                        modalClose()
                    })
                })
            }
        } catch (error) {

        }
    }

    const modalEditOpen = (e) => {
        setIdInformasi(e)
        setModalTitle("Edit")
        openModal.current.click()
    }

    const getInformasiById = async () => {
        try {
            if (idInformasi) {
                const response = await axios.get(`v1/informasi/byId/${idInformasi}`)
                setJudul(response.data.data.judul)
                setIsiInformasi(response.data.data.isi)
            }
        } catch (error) {

        }
    }

    const editPesan = async (e) => {
        e.preventDefault()
        try {
            if (judul == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Judul tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (isiInformasi == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Informasi tidak boleh kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else {
                await axios.put(`v1/informasi/edit/${idInformasi}`, {
                    judul: judul,
                    isi: isiInformasi
                }).then(function (response) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        getDataInformasi()
                        modalClose()
                    })
                })
            }
        } catch (error) {

        }
    }

    const hapusInformasi = (infoId) => {
        Swal.fire({
            title: "Yakin untuk menghapus?",
            text: 'Anda tidak dapat mengembalikan ini',
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(
                    `v1/informasi/hapus/${infoId}`
                ).then(function (response) {
                    Swal.fire({
                        title: "Terhapus",
                        text: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getDataInformasi()
                    })
                })
            }
        })
    }

    return (
        <LayoutAdmin>
            <button type="button" className="btn btn-primary d-none" ref={openModal} data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form autoComplete='off' onSubmit={modalTitle == 'Kirim' ? kirimPesan : editPesan}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">{modalTitle} Informasi</h5>
                                <button type="button" className="btn-close d-none" ref={closeModal} data-bs-dismiss="modal" aria-label="Close"></button>
                                <button type="button" className="btn-close" onClick={modalClose} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12 mb-2">
                                        <label htmlFor="judul" className='form-label'>Judul Informasi</label>
                                        <input type="text" id='judul' className='form-control form-control-sm' placeholder='Judul Informasi' value={judul || ''} onChange={(e) => setJudul(e.target.value)} />
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <label htmlFor="isi" className='form-label'>Informasi</label>
                                        <textarea id="isi" className='form-control' placeholder='Informasi' value={isiInformasi || ''} onChange={(e) => setIsiInformasi(e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-info btn-sm">Kirimkan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <section className="container-fluid p-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-3 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Informasi</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header py-2">
                                <Link to="/informasi" className='btn btn-sm btn-danger'>Kembali</Link>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className='col-lg-6 col-md-6 col-sm-12'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><h5>Nama</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{biodata.nama}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5>Jenis Kelamin</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{biodata.jenis_kelamin == 'l' ? 'Laki-Laki' : 'Perempuan'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-12'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><h5>Tempat Lahir</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='text-capitalize'>{biodata.tempat_lahir}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5>Tanggal Lahir</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='text-capitalize'>{moment(biodata.tanggal_lahir).format('DD MMMM YYYY')}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col-md-12">
                                        <button className='btn btn-sm btn-success' onClick={modalOpen}>Kirimkan Info</button>
                                    </div>
                                </div>
                                <div className="row">
                                    {DataInformasi.map((item) => (
                                        <div key={item.id_informasi} className="col-lg-4 col-md-4 col-sm-12">
                                            <div className="card shadow-lg h-100">
                                                <div className="card-header py-1">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h5 className='card-title mt-2'>{item.judul}</h5>
                                                        </div>
                                                        <div className='col-sm-6'>
                                                            <div className='float-end mt-1'>
                                                                <button onClick={() => modalEditOpen(item.id_informasi)} className="btn btn-sm btn-warning">Edit</button>
                                                                <button onClick={() => hapusInformasi(item.id_informasi)} className="btn btn-sm btn-danger ms-1">Hapus</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body py-0">
                                                    <div className='mb-2'>
                                                        <span>
                                                            <FaCalendarAlt /> {moment(item.tanggal).format('DD MMMM YYYY')}
                                                        </span>
                                                    </div>
                                                    <p>{item.isi.substr(0, 114)}<em className='cursor-pointer'>...Selengkapnya</em></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutAdmin>
    )
}

export default KirimInformasi