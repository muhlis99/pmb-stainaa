import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { FaBalanceScale, FaBook } from "react-icons/fa"
import Swal from 'sweetalert2'

const SeleksiProdi = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { isError, user } = useSelector((state) => state.auth)
    const [biodata, setBiodata] = useState([])
    const [seleksi, setSeleksi] = useState([])
    const [Hasil, setHasil] = useState([])
    const [desa, setDesa] = useState("")
    const [kecamatan, setKecamatan] = useState("")
    const [kabupaten, setKabupaten] = useState("")
    const [provinsi, setProvinsi] = useState("")
    const [negara, setNegara] = useState("")
    const [prodiSekunder, setProdiSekunder] = useState("")
    const [prodiPrimer, setProdiPrimer] = useState("")
    const [allProdi, setAllProdi] = useState([])


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
        getDataSeleksi()
        getHasil()
        getHasilProdiMhs()
        getAllProdi()
    }, [location])

    const background = ['text-secondary', 'text-info', 'text-primary', 'text-success', 'text-danger', 'text-warning']
    const ikon = [<FaBook />, <FaBalanceScale />]

    const getMhsByToken = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            setBiodata(response.data.data)
            setNegara(response.data.data.negaras[0].nama_negara)
            setProvinsi(response.data.data.provinsis[0].nama_provinsi)
            setKabupaten(response.data.data.kabupatens[0].nama_kabupaten)
            setKecamatan(response.data.data.kecamatans[0].nama_kecamatan)
            setDesa(response.data.data.desas[0].nama_desa)
        } catch (error) {

        }
    }

    const getDataSeleksi = async () => {
        try {
            const response = await axios.get(`v1/seleksi/byid/${location.state.idSeleksi}`)
            setSeleksi(response.data.data)
        } catch (error) {

        }
    }

    const getHasil = async () => {
        try {
            const response = await axios.get(`v1/seleksi/detailJawaban/${location.state.idSeleksi}`)
            setHasil(response.data.data)
        } catch (error) {

        }
    }

    const getHasilProdiMhs = async () => {
        try {
            const response = await axios.get(`/v1/seleksi/getProdiByToken/${location.state.token}`)
            setProdiPrimer(response.data.data.prodiprimer[0].nama_prodi)
            setProdiSekunder(response.data.data.prodisekunder[0].nama_prodi)
        } catch (error) {

        }
    }


    const getAllProdi = async () => {
        try {
            const response = await axios.get(`/v1/seleksi/prodi`)
            setAllProdi(response.data.data)
        } catch (error) {

        }
    }

    const ketentuanProdi = async (e) => {
        try {
            Swal.fire({
                title: "Yakin memilih prodi ini?",
                text: 'Pastikan pilihan anda tepat!',
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Batal'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.post(`v1/informasi/umumkanSeleksi/${location.state.idSeleksi}`)
                    await axios.put(`v1/seleksi/umumkan/${location.state.idSeleksi}`)
                    await axios.put(`/v1/seleksi/ketentuanProdiAdmin/${location.state.token}`, {
                        prodiSeleksiAdmin: e,
                    }).then(function (response) {
                        Swal.fire({
                            title: 'Berhasil',
                            text: 'Anda telah menyelesaikan pemilihan Prodi',
                            icon: 'success',
                            confirmButtonColor: '#3085d6'
                        }).then(() => {
                            navigate('/hasilSeleksi')
                        })
                    })
                }
            })

        } catch (error) {

        }
    }
    console.log(location.state.idSeleksi);

    return (
        <LayoutAdmin>
            <section className="container-fluid p-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-3 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Seleksi Prodi</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header py-2">
                                <Link to="/hasilSeleksi" className='btn btn-sm btn-danger'>Kembali</Link>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <table cellPadding={5}>
                                            <tbody>
                                                <tr>
                                                    <td><h5 className='mb-0'>NO KK</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='py-2'>{biodata.no_kk}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5 className='mb-0'>NO NIK</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='py-2'>{biodata.nik}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5 className='mb-0'>NISN</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='py-2'>{biodata.nisn}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5 className='mb-0'>Nama</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{biodata.nama}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5 className='mb-0'>Tempat Lahir</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='py-2 text-capitalize'>{biodata.tempat_lahir}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5 className='mb-0'>Tanggal Lahir</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='py-2'>{moment(biodata.tanggal_lahir).format('DD MMMM YYYY')}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5 className='mb-0'>Jenis Kelamin</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='py-2'>{biodata.jenis_kelamin == "l" ? "Laki-laki" : "Perempuan"}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5 className='mb-0'>email</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='py-2'>{biodata.email}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-md-6">

                                        <table cellPadding={5}>
                                            <tbody>
                                                <tr>
                                                    <td><h5 className='mb-0'>Jalan</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{biodata.jalan}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5 className='mb-0'>Dusun</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{biodata.dusun}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5 className='mb-0'>RT / RW</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='py-2'>{biodata.rt} / {biodata.rw}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5 className='mb-0'>Desa</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='py-2'>{desa}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5 className='mb-0'>Kecamatan</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='py-2'>{kecamatan}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5 className='mb-0'>Kabupaten</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='py-2'>{kabupaten}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5 className='mb-0'>Provinsi</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='py-2'>{provinsi}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5 className='mb-0'>Negara</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='py-2'>{negara}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-2">
                            <div className="card-body">
                                <div className="text text-center">
                                    <p className='h5 text-bold text-info'>
                                        Diharap bagi panitia PMB STAINAA untuk senyeleksi
                                        calon mahasiswa baru untuk menempatkan prodi sesuai kebijakan ketua STAINAA
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-xl-12 col-sm-12">
                                        <div className="row">
                                            <div className="text text-center mt-5">
                                                <p className='h5 text-bold '>
                                                    Prodi yang telah dipilih oleh calon mahasiswa baru
                                                </p>
                                            </div>
                                            <div className="col-md-6">
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
                                            <div className="col-md-6">
                                                <div className={`card shadow bg-light`}>
                                                    <div className="text-center my-4">
                                                        <p className="mb-0 "> PRODI KEDUA </p>
                                                        <h1 className={`display-2 ${background[1]} mb-2 fw-bold`}>{ikon[1]}</h1>
                                                        <p className="mb-0">{prodiSekunder}</p>
                                                    </div>
                                                    <div className='d-flex justify-content-center mb-3'>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-xl-12 col-sm-12">
                                        <div className="row">
                                            <div className="text text-center mt-5">
                                                <p className='h5 text-bold '>
                                                    SILAHKAN Panitia PMB STAINAA UNTUK MENENTUKAN PRODI
                                                </p>
                                            </div>
                                            {allProdi.map((item, index) => (
                                                <div key={item.id_prodi} className="col-md-6">
                                                    <div className={`card shadow `} style={{ cursor: 'pointer' }} onClick={() => ketentuanProdi(item.id_prodi)}>
                                                        <div className="text-center my-4">
                                                            <h1 className={`display-2 ${background[index]} mb-2 fw-bold`}>{ikon[index]}</h1>
                                                            <p className="mb-0">{item.nama_prodi}</p>
                                                        </div>
                                                        <div className='d-flex justify-content-center mb-3'>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
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

export default SeleksiProdi