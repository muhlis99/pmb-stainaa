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
    const [judul, setJudul] = useState('')
    const [isiInformasi, setIsiInformasi] = useState('')

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
        openModal.current.click()
    }

    const modalClose = () => {
        setJudul()
        setIsiInformasi()
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

    return (
        <LayoutAdmin>
            <button type="button" class="btn btn-primary d-none" ref={openModal} data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form autoComplete='off' onSubmit={kirimPesan}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
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
                                        <div key={item.id_infomasi} className="col-lg-4 col-md-4 col-sm-12">
                                            <div className="card shadow-lg h-100">
                                                <div className="card-header py-1">
                                                    <h5 className='card-title mt-2'>{item.judul}</h5>
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