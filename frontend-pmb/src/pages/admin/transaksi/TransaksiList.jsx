import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from "moment"
import ReactPaginate from "react-paginate"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { SlOptions } from "react-icons/sl"

const TransaksiList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Mahasiswa, setMahasiswa] = useState([])
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
        getMahasiswa()
    }, [page, keyword])

    const getMahasiswa = async () => {
        try {
            const response = await axios.get(`v1/transaksi/allTransaksiMhs?page=${page}&search=${keyword}`)
            setMahasiswa(response.data.data)
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


    return (
        <LayoutAdmin>
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
                                            <table className="table table-sm table-bordered text-nowrap mb-0 table-centered">
                                                <thead>
                                                    <tr>
                                                        <th className='py-2'>NO</th>
                                                        <th className='py-2'>Nama</th>
                                                        <th className='py-2'>Tempat Lahir</th>
                                                        <th className='py-2'>Tanggal Lahir</th>
                                                        <th className='py-2'>Jenis Kelamin</th>
                                                        <th className='py-2'>Pembayaran</th>
                                                        <th className='py-2'>Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Mahasiswa.map((item, index) => {
                                                        const hasFormulir = item.formulirs && item.formulirs.length > 0;
                                                        const formulir = hasFormulir ? item.formulirs[0] : {};
                                                        return (
                                                            <tr key={item.id_approve}>
                                                                <td>{(page - 1) * 10 + index + 1}</td>
                                                                <td className='text-capitalize'>{formulir.nama || '-'}</td>
                                                                <td className='text-capitalize'>{formulir.tempat_lahir || '-'}</td>
                                                                <td className='text-capitalize'>
                                                                    {formulir.tanggal_lahir
                                                                        ? moment(formulir.tanggal_lahir).format('DD MMMM YYYY')
                                                                        : '-'}
                                                                </td>
                                                                <td className='text-capitalize'>
                                                                    {formulir.jenis_kelamin === 'l'
                                                                        ? 'Laki-Laki'
                                                                        : formulir.jenis_kelamin === 'p'
                                                                            ? 'Perempuan'
                                                                            : '-'}
                                                                </td>
                                                                <td>
                                                                    <span className={`badge text-capitalize ${item.status_pembayaran === 'selesai' ? 'bg-success' : 'bg-danger'}`}>
                                                                        {item.status_pembayaran}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <Link to="/cektransaksi" state={{ token: item.token }} className='btn btn-sm btn-info'>Transaksi</Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
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
        </LayoutAdmin >
    )
}

export default TransaksiList