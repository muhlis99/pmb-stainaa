import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactPaginate from "react-paginate"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { SlOptions } from "react-icons/sl"

const HasilSeleksiList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [HasilSeleksi, setHasilSeleksi] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getHasilSeleksi()
    }, [page, keyword])

    const getHasilSeleksi = async () => {
        try {
            const response = await axios.get(`v1/seleksi/all?page=${page}&search=${keyword}`)
            setHasilSeleksi(response.data.data)
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

    const umumkan = async (seleksiId) => {
        await axios.post(
            `v1/informasi/umumkanSeleksi/${seleksiId}`
        ).then(function (response) {
            Swal.fire({
                title: "Berhasil Diumumkan",
                text: response.data.message,
                icon: "success",
                confirmButtonColor: '#3085d6'
            }).then(() => {
                getHasilSeleksi()
            })
        })
    }

    const tidak = () => {
        Swal.fire({
            text: 'Hasil Seleksi telah diumumkan',
            title: 'Gagal',
            icon: 'warning',
            confirmButtonColor: '#3085d6'

        })
    }

    return (
        <LayoutAdmin>
            <section className="container-fluid p-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-3 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Hasil Seleksi</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row mb-2">
                                    <div className="col-md-12">
                                        <input type="text" className='w-auto form-control form-control-sm float-end' placeholder='Cari' onChange={cariData} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-responsive">
                                            <table className='table table-sm table-bordered text-nowrap mb-0 table-centered'>
                                                <thead>
                                                    <tr>
                                                        <th className='py-2'>No</th>
                                                        <th className='py-2'>Nama</th>
                                                        <th className='py-2'>Skor</th>
                                                        <th className='py-2'>Durasi Waktu</th>
                                                        <th className='py-2'>Status</th>
                                                        <th className='py-2'>Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {HasilSeleksi.length == 0 ?
                                                        <tr>
                                                            <td align='center' colSpan={6}>
                                                                Tidak ada data!
                                                            </td>
                                                        </tr>
                                                        :
                                                        HasilSeleksi.map((item, index) => (
                                                            <tr key={item.id_seleksi}>
                                                                <td>{(page - 1) * 10 + index + 1}</td>
                                                                <td>{item.formulirs[0].nama}</td>
                                                                <td>{item.score}</td>
                                                                <td>{item.total_durasi}</td>
                                                                <td>
                                                                    {item.total_soal == item.total_selesai ?
                                                                        <span className='badge bg-success'>Selesai</span>
                                                                        :
                                                                        <span className='badge bg-danger'>Belum Selesai</span>
                                                                    }
                                                                </td>
                                                                <td className='d-flex gap-2'>
                                                                    <Link to="/detailhasilSeleksi" state={{ idSeleksi: item.id_seleksi, token: item.token }} className='btn btn-sm btn-info' >Detail</Link>
                                                                    {item.status_info == 0 ?
                                                                        <button onClick={() => umumkan(item.id_seleksi)} className='btn btn-sm btn-secondary'>Umumkan</button>
                                                                        :
                                                                        <button onClick={tidak} className='btn btn-sm btn-secondary'>Umumkan</button>
                                                                    }
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
            </section>
        </LayoutAdmin>
    )
}

export default HasilSeleksiList