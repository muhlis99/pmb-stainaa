import React, { useEffect, useRef, useState } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jsPDF from "jspdf"
import kop from "../../../assets/kop.png"

const TransaksiPembayaran = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const templateRef = useRef(null)
    const { isError, user } = useSelector((state) => state.auth)
    const [Transaksi, setTransaksi] = useState([])
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [kelamin, setKelamin] = useState('')
    const [status, setStatus] = useState('')
    const [totalBayar, setTotalBayar] = useState('')
    const [accountingTransaksi, setAccountingTransaksi] = useState('')
    const [jumlahAngsuran, setJumlahAngsuran] = useState('')
    const [biodata, setBiodata] = useState([])
    const [desa, setDesa] = useState('')
    const [kecamatan, setKecamatan] = useState('')
    const [kabupaten, setKabupaten] = useState('')
    const [provinsi, setProvinsi] = useState('')
    const [today, setToday] = useState('')
    const [statusDownload, setStatusDownload] = useState('')
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getTransaksi()
        getTotalPembayaran()
        getStatusDownload()
    }, [user])

    useEffect(() => {
        currencyIdr()
    }, [totalBayar])

    useEffect(() => {
        getDate()
    }, [])

    useEffect(() => {
        getDataDiri()
    }, [user])

    useEffect(() => {
        getDesa()
        getKecamatan()
        getKabupaten()
        getProvinsi()
    }, [biodata])

    const getStatusDownload = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/transaksi/buktiPendaftaran/${user.data.token}`)
                setStatusDownload(response.data.data)
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
    }

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: 'a4',
            unit: 'pt',
        })

        doc.setFont('Inter-Regular', 'normal')
        doc.setFontSize(1);

        doc.html(templateRef.current, {
            async callback(doc) {
                await doc.save('Bukti Pendaftaran')
            }
        })
    }

    const tableStyle = {
        image: {
            width: '597px'
        },
        wrap: {
            width: '600px',
            fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif",
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
            margin: 'auto'
        },
        gridItem: {
            fontSize: '12px',
            fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif",
        },
        uraian: {
            width: '80%',
            margin: 'auto'
        }
    }

    const downloadBuktiPendaftaran = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`v1/transaksi/tambah`, {
                kode: biodata.token,
                id_pembayaran: 1
            }).then(function () {
                handleGeneratePdf()
                getStatusDownload()
                getTransaksi()
            })
        } catch (error) {

        }
    }

    const getDate = () => {
        const today = new Date()
        const month = today.getMonth() + 1
        const year = today.getFullYear()
        const date = today.getDate()
        const namaBulan = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        setToday(`${date} ${namaBulan[month]} ${year}`)
    }

    const getDataDiri = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/formulir/getByToken/${user.data.token}`)
                setBiodata(response.data.data)
            }
        } catch (error) {

        }
    }

    const getDesa = async () => {
        try {
            if (biodata.desa) {
                const response = await axios.get(`v1/equipment/desa/getByCode/${biodata.desa}`)
                setDesa(response.data.data.nama_desa)
            }
        } catch (error) {

        }
    }

    const getKecamatan = async () => {
        try {
            if (biodata.kecamatan) {
                const response = await axios.get(`v1/equipment/kecamatan/getByCode/${biodata.kecamatan}`)
                setKecamatan(response.data.data.nama_kecamatan)
            }
        } catch (error) {

        }
    }

    const getKabupaten = async () => {
        try {
            if (biodata.kabupaten) {
                const response = await axios.get(`v1/equipment/kabupaten/getByCode/${biodata.kabupaten}`)
                setKabupaten(response.data.data.nama_kabupaten)
            }
        } catch (error) {

        }
    }

    const getProvinsi = async () => {
        try {
            if (biodata.provinsi) {
                const response = await axios.get(`v1/equipment/provinsi/getByCode/${biodata.provinsi}`)
                setProvinsi(response.data.data.nama_provinsi)
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
                                <h1 className="mb-0 h2 fw-bold">Pembayaran</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-2">
                        <div className="card shadow">
                            <div className="card-body">
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
                            <div className="card-body">
                                <h5>Tata cara melakukan pembayaran</h5>
                                <ol>
                                    <li>Download bukti pendaftaran.</li>
                                    <li>Transfer pembayaran melalui rekening LK SMK NAA.</li>
                                    <li>Atau langsung mendatangi LK SMK NAA dengan menyerahkan bukti pendaftaran</li>
                                    <li>Upload bukti pembayaran</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
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
                                            <div className="col-sm-4">
                                                <h3>Jumlah Angsuran</h3>
                                                <h3>{jumlahAngsuran} Kali</h3>
                                            </div>
                                            <div className="col-sm-4">
                                                <h3>Total Bayar</h3>
                                                <h3>{accountingTransaksi && accountingTransaksi}</h3>
                                            </div>
                                            <div className="col-sm-4">
                                                <h3>Status Pembayaran</h3>
                                                {status == 'lunas' ?
                                                    <h3 className='text-capitalize text-success'>{status}</h3>
                                                    :
                                                    <h3 className='text-capitalize text-danger'>{status}</h3>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                            <span>{item.tenggat_pembayaran}</span>
                                        </div>
                                        <div className="col-md-2">
                                            <h5>Tanggal Transaksi</h5>
                                            <span>{item.tanggal_transaksi}</span>
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
                                            {item.status_tombol == '0' ?
                                                <button className='btn btn-sm btn-info'>Upload Bukti</button>
                                                : ""
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button className='btn btn-sm btn-info float-end'>Tambah Transaksi</button>
                    </div>
                </div>


                <div className="row">
                    <div className='d-none'>
                        <div ref={templateRef}>
                            <div style={tableStyle.wrap}>
                                <img src={kop} alt="kop" style={tableStyle.image} />
                                <div style={tableStyle.title} className='text-center text-uppercase  mt-2 mb-2'>
                                    <span>BUKTI PENDAFTARAN MAHASISWA</span>
                                </div>
                                <div style={tableStyle.grid} className='mb-3'>
                                    <div style={tableStyle.gridItem}>
                                        <table width={300} cellPadding={3}>
                                            <tbody>
                                                <tr>
                                                    <td>NIK</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{biodata.nik}</td>
                                                </tr>
                                                <tr>
                                                    <td>Nama</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='text-uppercase'>{nama}</td>
                                                </tr>
                                                <tr>
                                                    <td>Tempat Lahir</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='text-uppercase'>{biodata.tempat_lahir}</td>
                                                </tr>
                                                <tr>
                                                    <td>Tanggal Lahir</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{biodata.tanggal_lahir}</td>
                                                </tr>
                                                <tr>
                                                    <td>Jenis Kelamin</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='text-uppercase'>{kelamin == 'l' ? 'Laki-Laki' : 'Perempuan'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Desa</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{desa}</td>
                                                </tr>
                                                <tr>
                                                    <td>Kecamatan</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{kecamatan}</td>
                                                </tr>
                                                <tr>
                                                    <td>Kabupaten</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{kabupaten}</td>
                                                </tr>
                                                <tr>
                                                    <td>Provinsi</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{provinsi}</td>
                                                </tr>
                                                <tr>
                                                    <td>Nomor WhatsApp</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{biodata.no_hp}</td>
                                                </tr>
                                                <tr>
                                                    <td>Nomor Telepon</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{biodata.no_telepon}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div style={tableStyle.title}>
                                    <span className='ms-4'>Bukti Pendaftaran dipergunakan sebagai syarat melakukan pembayaran pendaftaran PMB STAINAA.</span>
                                </div>
                                <div style={tableStyle.uraian} className='mt-4 text-end'>
                                    <span>Alasbuluh, {today}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutUser>
    )
}

export default TransaksiPembayaran