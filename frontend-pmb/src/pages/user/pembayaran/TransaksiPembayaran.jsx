import React, { useEffect, useRef, useState } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jsPDF from "jspdf"
import logo from "../../../assets/stainaa.png"
import Swal from 'sweetalert2'
import moment from 'moment'

const TransaksiPembayaran = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const templateRef = useRef(null)
    const closeModal = useRef()
    const { isError, user } = useSelector((state) => state.auth)
    const [Transaksi, setTransaksi] = useState([])
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [kelamin, setKelamin] = useState('')
    const [status, setStatus] = useState('')
    const [totalBayar, setTotalBayar] = useState('')
    const [accountingTransaksi, setAccountingTransaksi] = useState('')
    const [minimalBayar, setMinimalBayar] = useState('')
    const [accountMinimal, setAccountMinimal] = useState('')
    const [biaya, setBiaya] = useState('')
    const [accountBiaya, setAccountBiaya] = useState('')
    const [jumlahAngsuran, setJumlahAngsuran] = useState('')
    const [statusDownload, setStatusDownload] = useState('')
    const [idPembayaran, setIdPembayaran] = useState('')
    const [transaksiKe, setTransaksiKe] = useState('')
    const [idTransaksi, setIdTransaksi] = useState('')
    const [nominal, setNominal] = useState('')
    const [kwitansi, setKwitansi] = useState('')
    const [tanggalTransaksi, setTanggalTansaksi] = useState('')
    const [prevKwitansi, setPrevKwitansi] = useState('')
    const [idPendaftar, setIdPendaftar] = useState('')
    const [statusFormulir, setStatusFormulir] = useState('')


    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        const getDataByToken = async () => {
            try {
                if (user) {
                    const response = await axios.get(`v1/formulir/getByToken/${user.data.token}`)
                    setIdPendaftar(response.data.data.id)
                }
            } catch (error) {

            }
        }
        getDataByToken()
    }, [user])

    useEffect(() => {
        getTransaksi()
        getTotalPembayaran()
        getStatusDownload()
    }, [user])

    useEffect(() => {
        currencyIdr()
    }, [totalBayar])

    const getStatusDownload = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/transaksi/buktiPendaftaran/${user.data.token}`)
                setStatusDownload(response.data.data)
                console.log('status download :', response.data.data);
            }
        } catch (error) {

        }
    }

    const getTransaksi = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/transaksi/all/${user.data.token}`)
                setTransaksi(response.data.data)
            }
        } catch (error) {

        }
    }

    const getTotalPembayaran = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/transaksi/totalPembayaran/${user.data.token}`)
                setNama(response.data.data[0].transaksi[0].nama)
                setEmail(response.data.data[0].transaksi[0].email)
                setKelamin(response.data.data[0].transaksi[0].jenkel)
                setTotalBayar(response.data.data[0].jumlahBayar)
                setStatus(response.data.data[0].statusPembayaran)
                setJumlahAngsuran(response.data.data[0].pembayaran.jumlah_ansuran)
                setIdPembayaran(response.data.data[0].pembayaran.id_pembayaran)
                setMinimalBayar(response.data.data[0].pembayaran.minimal_pembayaran)
                setBiaya(response.data.data[0].pembayaran.jumlah_pembayaran)
            }
        } catch (error) {

        }
    }

    const currencyIdr = () => {
        const currency = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        })
        setAccountingTransaksi(currency.format(totalBayar).replace(/(\.|,)00$/g, ''))
        setAccountMinimal(currency.format(minimalBayar).replace(/(\.|,)00$/g, ''))
        setAccountBiaya(currency.format(biaya).replace(/(\.|,)00$/g, ''))
    }

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: 'a6',
            orientation: 'landscape',
            unit: 'pt',
        })

        doc.setFont('Inter-Regular', 'normal')
        doc.setFontSize(1);

        doc.html(templateRef.current, {
            async callback(doc) {
                await doc.save('Bukti Pendaftaran ' + nama)
            }
        })
    }

    const downloadBuktiPendaftaran = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`v1/transaksi/tambah`, {
                kode: user.data.token,
                id_pembayaran: idPembayaran
            }).then(function () {
                handleGeneratePdf()
                getStatusDownload()
                getTransaksi()
            })
        } catch (error) {

        }
    }

    const modalShow = async (e) => {
        const response = await axios.get(`v1/transaksi/byId/${e}`)
        setTransaksiKe(response.data.data.pembayaran_ke)
        setIdTransaksi(response.data.data.id_transaksi)
    }

    const loadBukti = (e) => {
        const image = e.target.files[0]
        setKwitansi(image)
        setPrevKwitansi(URL.createObjectURL(image))
    }

    const simpanTransaksiPertama = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("nominal", nominal)
        formData.append("tanggal_transaksi", tanggalTransaksi)
        formData.append("bukti_transaksi", kwitansi)
        try {
            if (nominal < minimalBayar) {
                Swal.fire({
                    title: 'Transaksi gagal',
                    text: `Pembayaran pertama harus ${accountMinimal}`,
                    icon: 'warning',
                    confirmButtonColor: '#3085d6'
                })
            } else if (nominal == '') {
                Swal.fire({
                    title: 'Transaksi gagal',
                    text: 'Nominal Tidak Boleh Kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (kwitansi == '') {
                Swal.fire({
                    title: 'Transaksi gagal',
                    text: 'Bukti Transaksi tidak boleh kosong',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6'
                })
            } else {
                await axios.put(`v1/transaksi/tambahTransaksi/${idTransaksi}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(function (response) {
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getStatusDownload()
                        getTotalPembayaran()
                        getTransaksi()
                        setNominal('')
                        setKwitansi('')
                        setPrevKwitansi('')
                        closeModal.current.click()
                    });
                })
            }
        } catch (error) {

        }
    }

    const simpanTransaksi = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("nominal", nominal)
        formData.append("tanggal_transaksi", tanggalTransaksi)
        formData.append("bukti_transaksi", kwitansi)
        try {
            if (nominal == '') {
                Swal.fire({
                    title: 'Transaksi gagal',
                    text: 'Nominal Tidak Boleh Kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (kwitansi == '') {
                Swal.fire({
                    title: 'Transaksi gagal',
                    text: 'Bukti Transaksi tidak boleh kosong',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6'
                })
            } else {
                await axios.put(`v1/transaksi/tambahTransaksi/${idTransaksi}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(function (response) {
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getStatusDownload()
                        getTotalPembayaran()
                        getTransaksi()
                        setNominal('')
                        setKwitansi('')
                        setPrevKwitansi('')
                        closeModal.current.click()
                    });
                })
            }
        } catch (error) {

        }
    }

    const tambahTransaksi = async (e) => {
        try {
            if (user) {
                await axios.post(`v1/transaksi/tambahAnsuran`, {
                    kode: user.data.token,
                    id_pembayaran: idPembayaran,
                    pembayaran_ke: e,
                    tanggal_transaksi: tanggalTransaksi
                }).then(function (response) {
                    getTransaksi()
                })
            }
        } catch (error) {

        }
    }

    return (
        <LayoutUser>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={transaksiKe == 1 ? simpanTransaksiPertama : simpanTransaksi}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Transaksi ke {transaksiKe}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="nominal" className="form-label">Nominal Transaksi</label>
                                        <input type="number" id="nominal" className="form-control form-control-sm" name="nominal" placeholder="Nominal Transakti" value={nominal} onChange={(e) => setNominal(e.target.value)} />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="bukti" className="form-label">Bukti Transaksi</label>
                                        <div className='mb-2'>
                                            {prevKwitansi ?
                                                <img src={prevKwitansi} alt="" width={150} className='border border-1 border-dark' />
                                                :
                                                ""
                                            }
                                        </div>
                                        <input type="file" onChange={loadBukti} id="bukti" className="form-control form-control-sm" name="bukti" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type='submit' className="btn btn-info btn-sm">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-2 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-2 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Pembayaran</h1>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-md-4 mb-2">
                        <div className="card shadow">
                            <div className="card-body p-5">
                                <h5>Sebelum melakukan transaksi pembayaran pendaftaran, anda harus mendownload terlebih dahulu bukti pendaftaran.</h5>
                                {statusDownload == 'belum' ?
                                    <button className='btn btn-sm btn-info float-end mt-4' onClick={downloadBuktiPendaftaran}>Download</button>
                                    :
                                    <button className='btn btn-sm btn-info float-end mt-4'>Download</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card shadow">
                            <div className="card-body py-3">
                                <h5>Tata cara melakukan pembayaran</h5>
                                <ol>
                                    <li>Download bukti pendaftaran.</li>
                                    <li>Transfer pembayaran melalui rekening LK SMK NAA.</li>
                                    <li>Atau langsung mendatangi LK SMK NAA dengan menyerahkan bukti pendaftaran.</li>
                                    <li>Upload bukti pembayaran.</li>
                                    <li>Total Biaya yang harus dilunasi adalah {accountBiaya} dengan angsuran sebanyak {jumlahAngsuran} Kali.</li>
                                    <li>Untuk melakukan pembayaran pertama anda harus membayar sebesar {accountMinimal}.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><h4>Nama</h4></td>
                                                    <td><h4>&nbsp;:&nbsp;</h4></td>
                                                    <td><h4>{nama}</h4></td>
                                                </tr>
                                                <tr>
                                                    <td><h4>Email</h4></td>
                                                    <td><h4>&nbsp;:&nbsp;</h4></td>
                                                    <td><h4>{email}</h4></td>
                                                </tr>
                                                <tr>
                                                    <td><h4>Jenis Kelamin</h4></td>
                                                    <td><h4>&nbsp;:&nbsp;</h4></td>
                                                    <td><h4>{kelamin == 'l' ? 'Laki-Laki' : 'Perempuan'}</h4></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-md-8 mt-2">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h3>Angsuran</h3>
                                                <h3>{jumlahAngsuran} Kali</h3>
                                            </div>
                                            <div className="col-sm-3">
                                                <h3>Total Biaya</h3>
                                                <h3>{accountBiaya}</h3>
                                            </div>
                                            <div className="col-sm-3">
                                                <h3>Total Bayar</h3>
                                                <h3>{accountingTransaksi && accountingTransaksi}</h3>
                                            </div>
                                            <div className="col-sm-3">
                                                <h3>Status</h3>
                                                {status == 'lunas' ?
                                                    <h3 className='text-capitalize text-success'>{status}</h3>
                                                    :
                                                    <h3 className='text-capitalize text-danger'>{status}</h3>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {Transaksi.length == 0 || Transaksi.length == jumlahAngsuran || status == 'lunas' ?
                                    ""
                                    :
                                    <div className="row">
                                        <div className='col-md-12'>
                                            <button className='btn btn-sm btn-info float-end' onClick={() => tambahTransaksi(Transaksi.length + 1)}>Tambah Transaksi</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className="col-md-12">
                        {Transaksi.map((item, index) => (
                            <div key={item.id_transaksi} className="card shadow mb-2">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h5>Transaksi</h5>
                                            <span>Transaksi ke {item.pembayaran_ke}</span>
                                        </div>
                                        <div className="col-md-2">
                                            <h5>Akhir Pembayaran</h5>
                                            <span>{moment(item.tenggat_pembayaran).format('DD MMMM YYYY')}</span>
                                        </div>
                                        <div className="col-md-2">
                                            <h5>Tanggal Transaksi</h5>
                                            <span>{item.tanggal_transaksi && moment(item.tanggal_transaksi).format('DD MMMM YYYY')}</span>
                                        </div>
                                        <div className="col-md-2">
                                            <h5>Nominal Transaksi</h5>
                                            <span>{item.nominal}</span>
                                        </div>
                                        <div className="col-md-2">
                                            <h5>Status Transaksi</h5>
                                            <span className={`text-capitalize ${item.status_transaksi == 'selesai' ? 'text-success' : 'text-danger'}`}>{item.status_transaksi}</span>
                                        </div>
                                        <div className="col-md-2 d-flex align-items-center">
                                            {item.status_tombol == '1' ?
                                                ""
                                                :
                                                <button className='btn btn-sm btn-info' onClick={() => modalShow(item.id_transaksi)} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Upload Bukti</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="row" ref={templateRef}>

                </div>
            </div>
        </LayoutUser>
    )
}

export default TransaksiPembayaran