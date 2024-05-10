import React, { useState, useEffect, useRef } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const PertanyaanList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const openModal = useRef()
    const closeModal = useRef()
    const { isError, user } = useSelector((state) => state.auth)
    const [PaketSoal, setPaketSoal] = useState([])
    const [soalTerinput, setSoalTerinput] = useState('')
    const [Pertanyaan, setPertanyaan] = useState([])
    const [modalTitle, setModalTitle] = useState("")
    const [idPertanyaan, setIdPertanyaan] = useState("")
    const [textPertanyaan, setTextPertanyaan] = useState("")
    const [pilihanA, setPilihanA] = useState('')
    const [pilihanB, setPilihanB] = useState('')
    const [pilihanC, setPilihanC] = useState('')
    const [pilihanD, setPilihanD] = useState('')
    const [kunciJawaban, setKunciJawaban] = useState('')

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getPaketSoalById()
        getInsertSoal()
        getPertanyaanBySoal()
    }, [location])

    useEffect(() => {
        getPertanyaanById()
    }, [idPertanyaan])

    const getPaketSoalById = async () => {
        try {
            const response = await axios.get(`v1/soal/byid/${location.state.soalId}`)
            setPaketSoal(response.data.data)
        } catch (error) {

        }
    }

    const getInsertSoal = async () => {
        try {
            const response = await axios.get(`v1/soal/recordPertanyaan/${location.state.soalId}`)
            setSoalTerinput(response.data.jumlahInsertPertanyaan)
        } catch (error) {

        }
    }

    const getPertanyaanBySoal = async () => {
        try {
            const response = await axios.get(`v1/pertanyaan/bySoal/${location.state.soalId}`)
            setPertanyaan(response.data.data)
        } catch (error) {

        }
    }

    const getPertanyaanById = async () => {
        try {
            if (idPertanyaan) {
                const response = await axios.get(`v1/pertanyaan/byid/${idPertanyaan}`)
                setTextPertanyaan(response.data.data.pertanyaan)
                setPilihanA(response.data.data.pilihan_a)
                setPilihanB(response.data.data.pilihan_b)
                setPilihanC(response.data.data.pilihan_c)
                setPilihanD(response.data.data.pilihan_d)
                setKunciJawaban(response.data.data.kunci_jawaban)
                console.log(response.data.data);
            }
        } catch (error) {

        }
    }

    const modalOpen = () => {
        setModalTitle('Tambah')
        openModal.current.click()
    }

    const modalClose = () => {
        setKunciJawaban()
        setPilihanA()
        setPilihanB()
        setPilihanC()
        setPilihanD()
        setTextPertanyaan()
        setIdPertanyaan()
        closeModal.current.click()
    }

    const simpanPertanyaan = async (e) => {
        e.preventDefault()
        try {
            if (PaketSoal.jumlah_soal == soalTerinput) {
                Swal.fire({
                    title: 'Error',
                    text: 'Pertanyaan tidak boleh melebihi batas yang telah ditentukan',
                    icon: 'error'
                })
            } else if (textPertanyaan == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Pertanyaan kosong',
                    icon: 'error'
                })
            } else if (pilihanA == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Jawaban Pilihan A kosong',
                    icon: 'error'
                })
            } else if (pilihanB == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Jawaban Pilihan B kosong',
                    icon: 'error'
                })
            } else if (pilihanC == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Jawaban Pilihan C kosong',
                    icon: 'error'
                })
            } else if (pilihanD == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Jawaban Pilihan D kosong',
                    icon: 'error'
                })
            } else if (kunciJawaban == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Kunci Jawaban kosong',
                    icon: 'error'
                })
            } else {
                await axios.post('v1/pertanyaan/tambah', {
                    id_soal: location.state.soalId,
                    pertanyaan: textPertanyaan,
                    pilihan_a: pilihanA,
                    pilihan_b: pilihanB,
                    pilihan_c: pilihanC,
                    pilihan_d: pilihanD,
                    kunci_jawaban: kunciJawaban
                }).then(function (response) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        modalClose()
                        getPertanyaanBySoal()
                        getPaketSoalById()
                        getInsertSoal()
                    })
                })
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    const modalEditOpen = (e) => {
        setIdPertanyaan(e)
        setModalTitle('Edit')
        openModal.current.click()
    }

    const updatePertanyaan = async (e) => {
        e.preventDefault()
        try {
            if (textPertanyaan == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Pertanyaan kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                })
            } else if (pilihanA == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Jawaban Pilihan A kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                })
            } else if (pilihanB == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Jawaban Pilihan B kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                })
            } else if (pilihanC == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Jawaban Pilihan C kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                })
            } else if (pilihanD == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Jawaban Pilihan D kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                })
            } else if (kunciJawaban == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Kunci Jawaban kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                })
            } else {
                await axios.put(`v1/pertanyaan/edit/${idPertanyaan}`, {
                    id_soal: location.state.soalId,
                    id_pertanyaan: idPertanyaan,
                    pertanyaan: textPertanyaan,
                    pilihan_a: pilihanA,
                    pilihan_b: pilihanB,
                    pilihan_c: pilihanC,
                    pilihan_d: pilihanD,
                    kunci_jawaban: kunciJawaban
                }).then(function (response) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        modalClose()
                        getPertanyaanBySoal()
                        getPaketSoalById()
                        getInsertSoal
                    })
                })
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    const hapusPertanyaan = (pertanyaanId) => {
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
                axios.put(
                    `v1/pertanyaan/hapus/${pertanyaanId}`
                ).then(function (response) {
                    Swal.fire({
                        title: "Terhapus",
                        text: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getPertanyaanBySoal()
                        getPaketSoalById()
                        getInsertSoal()
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
                        <form onSubmit={modalTitle == 'Tambah' ? simpanPertanyaan : updatePertanyaan}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">{modalTitle} Pertanyaan</h5>
                                <button type="button" className="btn-close d-none" ref={closeModal} data-bs-dismiss="modal" aria-label="Close"></button>
                                <button type="button" className="btn-close" onClick={modalClose} data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-xl-12 colmd-12 col-sm-12">
                                        <label htmlFor="pertanyaan" className='form-label'>Pertanyaan</label>
                                        <textarea id="pertanyaan" className='form-control' value={textPertanyaan || ""} onChange={(e) => setTextPertanyaan(e.target.value)}></textarea>
                                    </div>
                                    <div className="col-xl-12 colmd-12 col-sm-12">
                                        <label htmlFor="pilihan_a" className='form-label'>Pilihan A</label>
                                        <input type="text" id='pilihan_a' className='form-control form-control-sm' value={pilihanA || ""} onChange={(e) => setPilihanA(e.target.value)} />
                                    </div>
                                    <div className="col-xl-12 colmd-12 col-sm-12">
                                        <label htmlFor="pilihan_b" className='form-label'>Pilihan B</label>
                                        <input type="text" id='pilihan_b' className='form-control form-control-sm' value={pilihanB || ""} onChange={(e) => setPilihanB(e.target.value)} />
                                    </div>
                                    <div className="col-xl-12 colmd-12 col-sm-12">
                                        <label htmlFor="pilihan_c" className='form-label'>Pilihan C</label>
                                        <input type="text" id='pilihan_c' className='form-control form-control-sm' value={pilihanC || ""} onChange={(e) => setPilihanC(e.target.value)} />
                                    </div>
                                    <div className="col-xl-12 colmd-12 col-sm-12">
                                        <label htmlFor="pilihan_d" className='form-label'>Pilihan D</label>
                                        <input type="text" id='pilihan_d' className='form-control form-control-sm' value={pilihanD || ""} onChange={(e) => setPilihanD(e.target.value)} />
                                    </div>
                                    <div className="col-xl-12 colmd-12 col-sm-12">
                                        <label htmlFor="kunci" className='form-label'>Kunci Jawaban</label>
                                        <select id="kunci" className='form-select form-select-sm' value={kunciJawaban || ""} onChange={(e) => setKunciJawaban(e.target.value)}>
                                            <option value="">-Kunci Jawaban-</option>
                                            <option value="a">A</option>
                                            <option value="b">B</option>
                                            <option value="c">C</option>
                                            <option value="d">D</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer py-2">
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
                                <h1 className="mb-0 h2 fw-bold">Setting Soal</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <Link to="/paketSoal" className="btn btn-sm btn-danger">Kembali</Link>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-10 col-md-8 col-sm-12 mb-2">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-12 col-sm-12">
                                                <h4 className='mb-0'>Nama Paket Soal</h4>
                                                <span className='text-capitalize'>{PaketSoal.nama_soal}</span>
                                            </div>
                                            <div className="col-lg-3 col-md-12 col-sm-12">
                                                <h4 className='mb-0'>Kapasitas Pertanyaan</h4>
                                                <span className='text-capitalize'>{PaketSoal.jumlah_soal} Soal</span>
                                            </div>
                                            <div className="col-lg-3 col-md-12 col-sm-12">
                                                <h4 className='mb-0'>Pertanyaan Terinput</h4>
                                                <span className='text-capitalize'>{soalTerinput} Soal</span>
                                            </div>
                                            <div className="col-lg-3 col-md-12 col-sm-12">
                                                <h4 className='mb-0'>Kategori Soal</h4>
                                                <span className='text-capitalize'>{PaketSoal.kategori == 'farduAin' ? "Fardlu 'Ain" : PaketSoal.kategori}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-2 col-md-4 col-sm-12 d-flex align-items-center'>
                                        <button className='btn btn-sm btn-success' onClick={modalOpen}>Tambah Pertanyaan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {Pertanyaan.map((item, index) => (
                        <div key={index} className="col-lg-6 col-md-12 col-sm-12">
                            <div className='card mt-3'>
                                <div className="card-header py-2">
                                    <div className='d-flex gap-2 float-end'>
                                        <button className='btn btn-sm btn-info' onClick={() => modalEditOpen(item.id_pertanyaan)}>Edit</button>
                                        <button className='btn btn-sm btn-danger' onClick={() => hapusPertanyaan(item.id_pertanyaan)}>Hapus</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h5>{index + 1}. {item.pertanyaan}</h5>
                                            <ol style={{ listStyleType: 'upper-alpha' }}>
                                                <li>
                                                    {item.pilihan_a}
                                                </li>
                                                <li>
                                                    {item.pilihan_b}
                                                </li>
                                                <li>
                                                    {item.pilihan_c}
                                                </li>
                                                <li>
                                                    {item.pilihan_d}
                                                </li>
                                            </ol>
                                            <h5>Kunci Jawaban : <span className='text-uppercase'>{item.kunci_jawaban}</span></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </LayoutAdmin>
    )
}

export default PertanyaanList