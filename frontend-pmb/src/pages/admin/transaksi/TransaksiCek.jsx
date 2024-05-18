import React, { useState, useEffect, useRef } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
    const modalApproveOpen = useRef()
    const modalApproveClose = useRef()
    const { isError, user } = useSelector((state) => state.auth)
    const [statusPembayaran, setStatusPembayaran] = useState('')
    const [biodata, setBiodata] = useState([])
    const [Transaksi, setTransaksi] = useState([])
    const [namaKwitansi, setNamaKwitansi] = useState("")
    const [prevKwitansi, setPrevKwitansi] = useState("")
    const [idTransaksi, setIdTransaksi] = useState("")
    const [tenggatWaktu, setTenggatWaktu] = useState("")
    const [transaksiKe, setTransaksiKe] = useState("")
    const [checkedStatus, setCheckedStatus] = useState("")
    const [keterangan, setKeterangan] = useState("")

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

    const openModalApprove = (e, f, g, h) => {
        setIdTransaksi(e)
        setTransaksiKe(f)
        setCheckedStatus(g)
        setKeterangan(h)
        modalApproveOpen.current.click()
    }

    const closeModalApprove = () => {
        setIdTransaksi()
        setTransaksiKe()
        setCheckedStatus()
        setKeterangan()
        modalApproveClose.current.click()
    }

    const handleChecked = (e) => {
        setCheckedStatus(e.target.value)
    }

    const simpanApprove = async (e) => {
        e.preventDefault()
        try {
            if (checkedStatus == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Status kosong',
                    icon: 'error'
                })
            } else if (keterangan == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Ketrangan kosong',
                    icon: 'error'
                })
            } else {
                await axios.put(`v1/transaksi/validatePembayaran/${idTransaksi}`, {
                    status: checkedStatus,
                    ket: keterangan
                }).then(function (response) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        closeModalApprove()
                        getTransaksiByToken()
                    })
                })
            }
        } catch (error) {

        }
    }

    return (
        <LayoutAdmin>
            {/* Modal Image */}
            <button type="button" className="btn btn-primary d-none" ref={modalImageOpen} data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Kwitansi Transaksi Ke {transaksiKe}</h5>
                            <button type="button" className="btn-close d-none" ref={modalImageClose} data-bs-dismiss="modal" aria-label="Close"></button>
                            <button type="button" onClick={closeModalImage} className="btn-close" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img src={prevKwitansi} width={450} className='border' alt="" />
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

            {/* Modal Approve */}
            <button type="button" className="btn btn-primary d-none" ref={modalApproveOpen} data-bs-toggle="modal" data-bs-target="#modalApprove"></button>
            <div className="modal fade" id="modalApprove" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={simpanApprove}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Validasi transaksi Ke {transaksiKe}</h5>
                                <button type="button" className="btn-close d-none" ref={modalApproveClose} data-bs-dismiss="modal" aria-label="Close"></button>
                                <button type="button" className="btn-close" onClick={closeModalApprove} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="" className='form-label'>Set Status Transaksi</label>
                                        <div className='d-flex gap-3'>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" value="selesai" id="flexRadioDefault1" checked={checkedStatus === "selesai"} onChange={handleChecked} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Setujui
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" value="ditolak" id="flexRadioDefault2" checked={checkedStatus === "ditolak"} onChange={handleChecked} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    Tolak
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="keterangan" className="form-label">Keterangan</label>
                                        <textarea name="keterangan" id="keterangan" className='form-control' placeholder='Keterangan' value={keterangan} onChange={(e) => setKeterangan(e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary btn-sm">Simpan</button>
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
                                <h1 className="mb-0 h2 fw-bold">Transaksi {checkedStatus}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header py-2">
                                <Link to="/transaksi" className='btn btn-sm btn-danger'>Kembali</Link>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xl-6 col-md-6 col-sm-12">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><h5>NIK</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td><h5>{biodata.nik}</h5></td>
                                                </tr>
                                                <tr>
                                                    <td><h5>Nama</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td><h5>{biodata.nama}</h5></td>
                                                </tr>
                                                <tr>
                                                    <td><h5>Jenis Kelamin</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td><h5>{biodata.jenis_kelamin == 'l' ? 'Laki-Laki' : biodata.jenis_kelamin == 'p' ? 'Perempuan' : ''}</h5></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-xl-6 col-md-6 col-sm-12">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><h5>Tempat Lahir</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='text-capitalize'><h5>{biodata.tempat_lahir}</h5></td>
                                                </tr>
                                                <tr>
                                                    <td><h5>Tanggal Lahir</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='text-capitalize'><h5>{moment(biodata.tanggal_lahir).format('DD MMMM YYYY')}</h5></td>
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
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-lg-12 col-md-12 col-sm-12">
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
                                                        Transaksi Ke {item.pembayaran_ke}
                                                    </td>
                                                    <td>{moment(item.tenggat_pembayaran).format('DD MMMM YYYY')}</td>
                                                    <td>{item.tanggal_transaksi && moment(item.tanggal_transaksi).format('DD MMMM YYYY')}</td>
                                                    <td>{item.nominal}</td>
                                                    <td><span className={`badge text-capitalize ${item.status_transaksi == 'selesai' ? 'bg-success' : item.status_transaksi == 'belum' || item.status_transaksi == 'ditolak' ? 'bg-danger' : 'bg-warning' || item.status_transaksi == 'prosess' ? 'bg-warning ' : 'bg-danger'}`}>{item.status_transaksi == "habis" ? "waktu habis" : item.status_transaksi == "belum" ? "belum bayar" : item.status_transaksi}</span></td>
                                                    <td className='d-flex gap-1'>
                                                        {item.bukti_transaksi != '' ?
                                                            <button onClick={() => openModalImage(item.bukti_transaksi, item.pembayaran_ke)} className='btn btn-sm btn-info' data-bs-toggle="tooltip" data-bs-placement="top" title="Lihat Kwitansi">Kwitansi</button>
                                                            :
                                                            ""
                                                            // <button disabled className='btn btn-sm btn-info' data-bs-toggle="tooltip" data-bs-placement="top" title="Lihat Kwitansi">Kwitansi</button>
                                                        }
                                                        {item.status_transaksi == 'belum' ?
                                                            ""
                                                            // <button onClick={() => OpenModal(item.id_transaksi, item.tenggat_pembayaran)} className='btn btn-sm btn-warning' data-bs-toggle="tooltip" data-bs-placement="top" title="Set Batas Akhir">Edit</button>
                                                            :
                                                            ""
                                                            // <button disabled className='btn btn-sm btn-warning' data-bs-toggle="tooltip" data-bs-placement="top" title="Set Batas Akhir">Edit</button>
                                                        }
                                                        {/* {item.status_transaksi == 'selesai' ?
                                                            <button className='btn btn-sm btn-primary' onClick={() => openModalApprove(item.id_transaksi, item.pembayaran_ke, item.status_transaksi, item.keterangan)} data-bs-toggle="tooltip" data-bs-placement="top" title="Set Batas Akhir">Validasi</button>
                                                            <button disabled className='btn btn-sm btn-primary' data-bs-toggle="tooltip" data-bs-placement="top" title="Set Batas Akhir">Validasi</button>
                                                            :
                                                            ""
                                                            <button className='btn btn-sm btn-primary' onClick={() => openModalApprove(item.id_transaksi, item.pembayaran_ke, item.status_transaksi, item.keterangan)} data-bs-toggle="tooltip" data-bs-placement="top" title="Set Batas Akhir">Validasi</button>
                                                        } */}
                                                        {item.status_transaksi == 'proses' ?
                                                            <button className='btn btn-sm btn-primary' onClick={() => openModalApprove(item.id_transaksi, item.pembayaran_ke, item.status_transaksi, item.keterangan)} data-bs-toggle="tooltip" data-bs-placement="top" title="Set Batas Akhir">Validasi</button>
                                                            // <button disabled className='btn btn-sm btn-primary' data-bs-toggle="tooltip" data-bs-placement="top" title="Set Batas Akhir">Validasi</button>
                                                            :
                                                            ""
                                                            // <button className='btn btn-sm btn-primary' onClick={() => openModalApprove(item.id_transaksi, item.pembayaran_ke, item.status_transaksi, item.keterangan)} data-bs-toggle="tooltip" data-bs-placement="top" title="Set Batas Akhir">Validasi</button>
                                                        }
                                                        {item.status_transaksi == 'habis' ?
                                                            <button onClick={() => OpenModal(item.id_transaksi, item.tenggat_pembayaran)} className='btn btn-sm btn-warning' data-bs-toggle="tooltip" data-bs-placement="top" title="Set Batas Akhir">Edit</button>
                                                            :
                                                            ""
                                                            // <button disabled className='btn btn-sm btn-warning' data-bs-toggle="tooltip" data-bs-placement="top" title="Set Batas Akhir">Edit</button>
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