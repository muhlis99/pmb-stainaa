import React, { useState, useEffect, useRef } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const PembayaranList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Pembayaran, setPembayaran] = useState([])
    const [idPembayaran, setIdPembayaran] = useState('')
    const [jumlahPembayaran, setJumlahPembayaran] = useState('')
    const [minimalPembayaran, setMinimalPembayaran] = useState('')
    const [jumlahAngsuran, setJumlahAngsuran] = useState('')
    const [tahun, setTahun] = useState('')
    const [judul, setJudul] = useState('')
    const openModal = useRef()
    const closeModal = useRef()

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getDataPembayaran()
    }, [])

    useEffect(() => {
        getPembayaranById()
    }, [idPembayaran])

    const getDataPembayaran = async () => {
        try {
            const response = await axios.get('v1/pembayaran/all')
            setPembayaran(response.data.data)
        } catch (error) {

        }
    }

    const getPembayaranById = async () => {
        try {
            if (idPembayaran) {
                const response = await axios.get(`v1/pembayaran/byId/${idPembayaran}`)
                setJumlahPembayaran(response.data.data.jumlah_pembayaran)
                setMinimalPembayaran(response.data.data.minimal_pembayaran)
                setJumlahAngsuran(response.data.data.jumlah_ansuran)
                setTahun(response.data.data.tahun)
            }
        } catch (error) {

        }
    }

    const modalAddOpen = () => {
        setJudul('Tambah')
        openModal.current.click()
    }

    const modalEditOpen = (pembayaranId) => {
        setIdPembayaran(pembayaranId)
        setJudul('Edit')
        getPembayaranById()
        openModal.current.click()
    }

    const modalClose = () => {
        openModal.current.click()
        setJumlahPembayaran()
        setJumlahAngsuran()
        setMinimalPembayaran()
        setIdPembayaran()
        setTahun()
    }

    const hapusPembayaran = (pembayaranId) => {
        Swal.fire({
            title: "Hapus data ini?",
            text: "Anda tidak dapat mengembalikan ini",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(
                        `v1/pembayaran/hapus/${pembayaranId}`
                    ).then((response) => {
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getDataPembayaran()
                        })
                    })

                } catch (error) {

                }
            }
        })
    }

    const simpanPembayaran = async (e) => {
        e.preventDefault()
        try {
            if (jumlahPembayaran == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Biaya Pendaftaran Kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (minimalPembayaran == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Minimal Transaksi Pertama Kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (jumlahAngsuran == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Jumlah Angsuran Kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else {
                await axios.post('v1/pembayaran/tambah', {
                    jumlah_pembayaran: jumlahPembayaran,
                    minimal_pembayaran: minimalPembayaran,
                    jumlah_ansuran: jumlahAngsuran,
                    tahun: tahun
                }).then(function (response) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        modalClose()
                        getDataPembayaran()
                    })
                })
            }
        } catch (error) {

        }
    }

    const updatePembayaran = async (e) => {
        e.preventDefault()
        try {
            if (jumlahPembayaran == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Biaya Pendaftaran Kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (minimalPembayaran == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Minimal Transaksi Pertama Kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (jumlahAngsuran == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Jumlah Angsuran Kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else {
                await axios.put(`v1/pembayaran/edit/${idPembayaran}`, {
                    jumlah_pembayaran: jumlahPembayaran,
                    minimal_pembayaran: minimalPembayaran,
                    jumlah_ansuran: jumlahAngsuran,
                    tahun: tahun
                }).then(function (response) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        modalClose()
                        getDataPembayaran()
                    })
                })
            }
        } catch (error) {

        }
    }

    const d = new Date()
    let year = d.getFullYear()
    const th = []
    for (let tahun = 2020; tahun <= year + 2; tahun++) {
        th.push(<option key={tahun} value={tahun}>{tahun}</option>)
    }

    return (
        <LayoutAdmin>

            <section className="container-fluid p-4">
                <button type="button" className="btn btn-primary d-none" ref={openModal} data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <form onSubmit={judul == 'Tambah' ? simpanPembayaran : updatePembayaran}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">{judul} Data Pembayaran</h5>
                                    <button type="button" className="btn-close" onClick={modalClose} data-bs-dismiss="modal" aria-label="Close"></button>
                                    <button type="button" className="btn-close d-none" ref={closeModal} data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-12 mb-2">
                                            <label htmlFor="biaya" className="form-label">Biaya Pendaftaran</label>
                                            <input type="number" id="biaya" className="form-control form-control-sm" name="biaya" placeholder="Biaya Pendaftaran" value={jumlahPembayaran || ''} onChange={(e) => setJumlahPembayaran(e.target.value)} />
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <label htmlFor="minbayar" className="form-label">Minimal Transaksi Pertama</label>
                                            <input type="number" id="minbayar" className="form-control form-control-sm" name="minbayar" placeholder="Minimal Transaksi Pertama" value={minimalPembayaran || ''} onChange={(e) => setMinimalPembayaran(e.target.value)} />
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <label htmlFor="angsuran" className="form-label">Jumlah Angsuran</label>
                                            <select name="angsuran" id="angsuran" className='form-select form-select-sm' value={jumlahAngsuran || ''} onChange={(e) => setJumlahAngsuran(e.target.value)}>
                                                <option value="">-Jumlah Angsuran-</option>
                                                <option value="1">1 Kali</option>
                                                <option value="2">2 Kali</option>
                                                <option value="3">3 Kali</option>
                                                <option value="4">4 Kali</option>
                                            </select>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <label htmlFor="Tahun" className="form-label">Tahun</label>
                                            <select name="Tahun" id="Tahun" className='form-select form-select-sm' value={tahun || ''} onChange={(e) => setTahun(e.target.value)}>
                                                <option value="">-Tahun-</option>
                                                {th}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-info btn-sm">Simpan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-3 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Pembayaran</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className='mb-2'>
                                    <button onClick={modalAddOpen} className='btn btn-sm btn-success'>Tambah Data</button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-sm table-bordered text-nowrap mb-0 table-centered">
                                        <thead>
                                            <tr>
                                                <th className='py-2'>NO</th>
                                                <th className='py-2'>Biaya Pendaftaran</th>
                                                <th className='py-2'>Minimal Pembayaran</th>
                                                <th className='py-2'>Jumlah Angsuran</th>
                                                <th className='py-2'>Tahun</th>
                                                <th className='py-2'>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Pembayaran.map((item, index) => (
                                                <tr key={item.id_pembayaran}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.jumlah_pembayaran}</td>
                                                    <td>{item.minimal_pembayaran}</td>
                                                    <td>{item.jumlah_ansuran} Kali</td>
                                                    <td>{item.tahun}</td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <button onClick={() => modalEditOpen(item.id_pembayaran)} className='btn btn-sm btn-warning'>Edit</button>
                                                            <button className='btn btn-sm btn-danger' onClick={() => hapusPembayaran(item.id_pembayaran)}>Hapus</button>
                                                        </div>
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

export default PembayaranList