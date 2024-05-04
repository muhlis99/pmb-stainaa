import React, { useState, useEffect, useRef } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useLocation, useNavigate } from 'react-router-dom'
import { FaCog, FaImage } from "react-icons/fa"
import logo from "../../../assets/noimage.svg"
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'

const TransaksiCek = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const modalImageOpen = useRef()
    const modalImageClose = useRef()
    const modalOpen = useRef()
    const modalClose = useRef()
    const { isError, user } = useSelector((state) => state.auth)
    const [statusPembayaran, setStatusPembayaran] = useState('')
    const [biodata, setBiodata] = useState([])
    const [Transaksi, setTransaksi] = useState([])
    const [namaKwitansi, setNamaKwitansi] = useState("")
    const [prevKwitansi, setPrevKwitansi] = useState("")
    const [idTransaksi, setIdTransaksi] = useState("")
    const [tenggatWaktu, setTenggatWaktu] = useState("")
    const [transaksiKe, setTransaksiKe] = useState("")

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        cekTransaksiByToken()
        getBiodataByToken()
        getTransaksiByToken()
    }, [location])

    useEffect(() => {
        fotoKwitansi()
    }, [namaKwitansi])

    const cekTransaksiByToken = async () => {
        try {
            const response = await axios.get(`v1/transaksi/checkTransaksi/${location.state.token}`)
            setStatusPembayaran(response.data.status)
        } catch (error) {

        }
    }

    const getBiodataByToken = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            setBiodata(response.data.data)
        } catch (error) {

        }
    }

    const getTransaksiByToken = async () => {
        try {
            const response = await axios.get(`v1/transaksi/all/${location.state.token}`)
            setTransaksi(response.data.data)
        } catch (error) {

        }
    }

    const openModalImage = (e, f) => {
        setNamaKwitansi(e)
        setTransaksiKe(f)
        modalImageOpen.current.click()

    }

    const fotoKwitansi = async () => {
        try {
            if (namaKwitansi) {
                await axios.get(`v1/transaksi/seeImage/BuktiPembayaran/${namaKwitansi}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevKwitansi(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const closeModalImage = () => {
        modalImageClose.current.click()
        setPrevKwitansi()
        setTransaksiKe()
    }

    const OpenModal = (e, f) => {
        setIdTransaksi(e)
        setTenggatWaktu(f)
        modalOpen.current.click()
    }

    const CloseModal = () => {
        modalClose.current.click()
        setIdTransaksi()
        setTenggatWaktu()
    }

    const editTenggatWaktu = async (e) => {
        e.preventDefault()
        try {
            if (tenggatWaktu == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Tanggal batas akhir pembayaran kosong',
                    icon: 'error'
                })
            } else {
                await axios.put(`v1/transaksi/editTenggatPembayaran/${idTransaksi}`, {
                    tombol: 0,
                    tenggat: tenggatWaktu
                }).then(function (response) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        CloseModal()
                        getTransaksiByToken()
                    })
                })
            }
        } catch (error) {

        }
    }

    const tidak = (e, f) => {
        Swal.fire({
            title: e,
            text: f,
            icon: 'warning',
            confirmButtonColor: '#3085d6'
        })
    }

    return (
        <LayoutAdmin>
            {/* Modal Image */}
            <button type="button" className="btn btn-primary d-none" ref={modalImageOpen} data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Kwitansi Transaksi Ke {transaksiKe}</h5>
                            <button type="button" className="btn-close d-none" ref={modalImageClose} data-bs-dismiss="modal" aria-label="Close"></button>
                            <button type="button" onClick={closeModalImage} className="btn-close" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            <img src={prevKwitansi} width={299} className='border' alt="" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Tenggat Waktu */}
            <button type="button" className="btn btn-primary d-none" ref={modalOpen} data-bs-toggle="modal" data-bs-target="#modalTenggat"></button>
            <div className="modal fade" id="modalTenggat" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-sm modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={editTenggatWaktu}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Perpanjangan Waktu Transaksi</h5>
                                <button type="button" className="btn-close d-none" ref={modalClose} data-bs-dismiss="modal" aria-label="Close"></button>
                                <button type="button" className="btn-close" onClick={CloseModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="batas" className="form-label">Batas Akhir Pembayaran</label>
                                        <input type="date" id="batas" className="form-control form-control-sm" name="batas" value={tenggatWaktu || ''} onChange={(e) => setTenggatWaktu(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-sm btn-info">Simpan</button>
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
                                <h1 className="mb-0 h2 fw-bold">Transaksi</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="card">
                            <div className="card-body">
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
                                        <tr>
                                            <td><h5>Status</h5></td>
                                            <td>&nbsp;:&nbsp;</td>
                                            <td className={`text-capitalize fw-bold ${statusPembayaran == 'lunas' ? 'text-info' : 'text-danger'}`}>{statusPembayaran}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="table-responsive">
                                    <table className="table text-nowrap mb-0 table-centered table-bordered">
                                        <thead className="table-light">
                                            <tr>
                                                <th className='px-1'>Transaksi</th>
                                                <th className='px-1'>Batas Akhir</th>
                                                <th className='px-1'>Tanggal</th>
                                                <th className='px-1'>Nominal</th>
                                                <th className='px-1'>Status</th>
                                                <th className='px-1'>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Transaksi.map((item) => (
                                                <tr key={item.id_transaksi}>
                                                    <td>
                                                        Ke {item.pembayaran_ke}
                                                    </td>
                                                    <td>{item.tenggat_pembayaran}</td>
                                                    <td>{item.tanggal_transaksi}</td>
                                                    <td>{item.nominal}</td>
                                                    <td>{item.status_transaksi}</td>
                                                    <td className='d-flex gap-1'>
                                                        {item.status_transaksi == 'selesai' ?
                                                            <button onClick={() => openModalImage(item.bukti_transaksi, item.pembayaran_ke)} className='btn btn-sm btn-info rounded-circle px-2 py-1' data-bs-toggle="tooltip" data-bs-placement="top" title="Lihat Kwitansi"><FaImage /></button>
                                                            :
                                                            <button onClick={() => tidak('Transaksi belum selesai', 'Kwitansi belum diupload oleh calon mahasiswa')} className='btn btn-sm btn-info rounded-circle px-2 py-1' data-bs-toggle="tooltip" data-bs-placement="top" title="Lihat Kwitansi"><FaImage /></button>
                                                        }
                                                        {item.status_transaksi == 'belum' ?
                                                            <button onClick={() => OpenModal(item.id_transaksi, item.tenggat_pembayaran)} className='btn btn-sm btn-warning rounded-circle px-2 py-1' data-bs-toggle="tooltip" data-bs-placement="top" title="Set Batas Akhir"><FaCog /></button>
                                                            :
                                                            <button onClick={() => tidak('Transaksi telah selesai', 'Transaksi telah diselesaikan oleh calon mahasiswa')} className='btn btn-sm btn-warning rounded-circle px-2 py-1' data-bs-toggle="tooltip" data-bs-placement="top" title="Set Batas Akhir"><FaCog /></button>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutAdmin>
    )
}

export default TransaksiCek