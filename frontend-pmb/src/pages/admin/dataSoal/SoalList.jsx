import React, { useState, useEffect, useRef } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactPaginate from "react-paginate"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { SlOptions } from "react-icons/sl"

const SoalList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const openModal = useRef()
    const closeModal = useRef()
    const { isError, user } = useSelector((state) => state.auth)
    const [PaketSoal, setPaketSoal] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [idSoalTerinput, setIdSoalTerinput] = useState([])
    const [jumlahSoalTerinput, setJumlahSoalTerinput] = useState([])
    const [modalTitle, setModalTitle] = useState('')
    const [idSoal, setIdSoal] = useState('')
    const [namaSoal, setNamaSoal] = useState('')
    const [jumlahSoal, setJumlahSoal] = useState('')
    const [kategoriSoal, setKategoriSoal] = useState('')

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getPaketSoal()
    }, [page, keyword])

    useEffect(() => {
        getPaketSoalById()
    }, [idSoal])

    useEffect(() => {
        getIdSoal()
    }, [PaketSoal])

    useEffect(() => {
        getSoalTerinput()
    }, [idSoalTerinput])

    const getPaketSoal = async () => {
        try {
            const response = await axios.get(`v1/soal/all?page=${page}&search=${keyword}`)
            setPaketSoal(response.data.data)
            setPage(response.data.current_page)
            setrows(response.data.total_data)
            setPages(response.data.total_page)
            setperPage(response.data.per_page)
        } catch (error) {

        }
    }

    const pageCount = Math.ceil(rows / perPage)

    const changePage = (event) => {
        const newOffset = (event.selected + 1)
        setPage(newOffset)
    }

    const cariData = (e) => {
        e.preventDefault()
        setKeyword(e ? e.target.value : "")
        setPage(0)
    }

    const modalAddOpen = () => {
        setModalTitle('Tambah')
        openModal.current.click()
    }

    const modalClose = () => {
        setModalTitle()
        setIdSoal()
        setNamaSoal()
        setJumlahSoal()
        setKategoriSoal()
        closeModal.current.click()
    }

    const modalEditOpen = (e) => {
        setIdSoal(e)
        setModalTitle('Edit')
        openModal.current.click()
    }

    const jml = []
    for (let jumlah = 1; jumlah <= 100; jumlah++) {
        jml.push(<option key={jumlah} value={jumlah}>{jumlah} Soal</option>)
    }

    const simpanPaketSoal = async (e) => {
        e.preventDefault()
        try {
            if (namaSoal == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Nama Paket Soal Kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (jumlahSoal == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Jumlah Soal Kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (kategoriSoal == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Kategori Soal Kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else {
                await axios.post('v1/soal/tambah', {
                    nama_soal: namaSoal,
                    jumlah_soal: jumlahSoal,
                    kategori: kategoriSoal
                }).then(function (response) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        modalClose()
                        getPaketSoal()
                    })
                })
            }

        } catch (error) {

        }
    }

    const getPaketSoalById = async () => {
        try {
            if (idSoal) {
                const response = await axios.get(`v1/soal/byid/${idSoal}`)
                setNamaSoal(response.data.data.nama_soal)
                setJumlahSoal(response.data.data.jumlah_soal)
                setKategoriSoal(response.data.data.kategori)
            }
        } catch (error) {

        }
    }

    const updatePaketSoal = async (e) => {
        e.preventDefault()
        try {
            if (namaSoal == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Nama Paket Soal Kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (jumlahSoal == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Jumlah Soal Kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else if (kategoriSoal == '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Kategori Soal Kosong',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            } else {
                await axios.put(`v1/soal/edit/${idSoal}`, {
                    nama_soal: namaSoal,
                    jumlah_soal: jumlahSoal,
                    kategori: kategoriSoal
                }).then(function (response) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        modalClose()
                        getPaketSoal()
                    })
                })
            }

        } catch (error) {

        }
    }

    const hapusSoal = (soalId) => {
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
                    `v1/soal/hapus/${soalId}`
                ).then(function (response) {
                    Swal.fire({
                        title: "Terhapus",
                        text: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getPaketSoal()
                    })
                })
            }
        })
    }

    const getIdSoal = () => {
        var i = PaketSoal.map(item => (
            item.id_soal
        ))
        setIdSoalTerinput(i)
    }

    const getSoalTerinput = async () => {
        if (idSoalTerinput.length != 0) {
            let jumlah = []
            let promises = []
            for (let i = 0; i < idSoalTerinput.length; i++) {
                const t = await axios.get(`v1/soal/recordPertanyaan/${idSoalTerinput[i]}`).then(response => {
                    jumlah.push(response.data.jumlahInsertPertanyaan)
                })
                promises.push(t)
            }
            Promise.all(promises).then(() => setJumlahSoalTerinput(jumlah))
        }
    }

    return (
        <LayoutAdmin>
            <button type="button" className="btn btn-primary d-none" ref={openModal} data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={modalTitle == 'Tambah' ? simpanPaketSoal : updatePaketSoal}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">{modalTitle} Paket Soal</h5>
                                <button type="button" className="btn-close d-none" ref={closeModal} data-bs-dismiss="modal" aria-label="Close"></button>
                                <button type="button" className="btn-close" onClick={modalClose} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12 mb-2">
                                        <label htmlFor="nama" className="form-label">Nama Paket Soal</label>
                                        <input type="text" id="nama" className="form-control form-control-sm" name="nama" placeholder="Masukkan Nama Paket Soal" value={namaSoal || ""} onChange={(e) => setNamaSoal(e.target.value)} />
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <label htmlFor="jumlah" className="form-label">Jumlah Soal</label>
                                        <select name="jumlah" id="jumlah" className='form-select form-select-sm' value={jumlahSoal || ""} onChange={(e) => setJumlahSoal(e.target.value)}>
                                            <option value="">-Jumlah Soal-</option>
                                            {jml}
                                        </select>
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <label htmlFor="kategori" className="form-label">Kategori</label>
                                        <select name="kategori" id="kategori" className='form-select form-select-sm' value={kategoriSoal || ""} onChange={(e) => setKategoriSoal(e.target.value)}>
                                            <option value="">-Kategori Soal-</option>
                                            <option value="pendahuluan">Pendahuluan</option>
                                            <option value="farduAin">Fardlu 'Ain</option>
                                            <option value="prodi">Prodi</option>
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
            <section className="container-fluid p-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-3 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Paket Soal</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row mb-2">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-lg-9 col-md-6 col-sm-12">
                                                        <button onClick={modalAddOpen} className="btn btn-sm btn-success">Tambah Data</button>
                                                    </div>
                                                    <div className="col-lg-3 col-md-6 col-sm-12">
                                                        <div className="col-auto">
                                                            <input type="text" className='form-control form-control-sm float-end' placeholder='Cari' onChange={cariData} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="table-responsive">
                                                    <table className='table table-sm table-bordered text-nowrap mb-0 table-centered'>
                                                        <thead>
                                                            <tr>
                                                                <th className="py-2">No</th>
                                                                <th className="py-2">Nama Paket</th>
                                                                <th className="py-2">Kategori</th>
                                                                <th className="py-2">Kapasitas Soal</th>
                                                                <th className="py-2">Terinput</th>
                                                                <th className="py-2">Aksi</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {PaketSoal == 0 ?
                                                                <tr>
                                                                    <td align='center' colSpan={6}>Tidak ada data!</td>
                                                                </tr>
                                                                : PaketSoal.map((item, index) => (
                                                                    <tr key={item.id_soal}>
                                                                        <td>{index + 1}</td>
                                                                        <td className='text-capitalize'>{item.nama_soal}</td>
                                                                        <td className='text-capitalize'>{item.kategori == 'farduAin' ? "Fardlu 'Ain" : item.kategori == 'pendahuluan' ? 'Pendahuluan' : 'Prodi'}</td>
                                                                        <td className='text-capitalize'>{item.jumlah_soal} Soal</td>
                                                                        <td className='text-capitalize'>{jumlahSoalTerinput[index]} Soal</td>
                                                                        <td>
                                                                            <div className="d-flex gap-1">
                                                                                <Link to="/settingSoal" state={{ soalId: item.id_soal }} className='btn btn-sm btn-info'>Setting</Link>
                                                                                <button onClick={() => modalEditOpen(item.id_soal)} className='btn btn-sm btn-warning'>Edit</button>
                                                                                <button onClick={() => hapusSoal(item.id_soal)} className='btn btn-sm btn-danger'>Hapus</button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-12">
                                                <nav aria-label='...'>
                                                    <ReactPaginate
                                                        className='pagination pagination-sm justify-content-center'
                                                        breakLabel={<SlOptions />}
                                                        previousLabel={<FaArrowLeft />}
                                                        pageCount={pageCount}
                                                        onPageChange={changePage}
                                                        nextLabel={<FaArrowRight />}
                                                        breakClassName={"page-item"}
                                                        pageClassName={"page-item"}
                                                        previousClassName={"page-item"}
                                                        nextClassName={"page-item"}
                                                        activeClassName={"page-item active"}
                                                        previousLinkClassName={"page-link"}
                                                        nextLinkClassName={"page-link"}
                                                        breakLinkClassName={"page-link"}
                                                        pageLinkClassName={"page-link"}
                                                        activeLinkClassName={""}
                                                        disabledLinkClassName={""}
                                                    />
                                                </nav>
                                            </div>
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

export default SoalList