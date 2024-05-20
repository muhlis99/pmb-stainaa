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

const Approve = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Approve, setApprove] = useState([])
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
        getApproveAll()
    }, [page, keyword])

    const getApproveAll = async () => {
        try {
            const response = await axios.get(`v1/approve/all?page=${page}&search=${keyword}`)
            setApprove(response.data.data)
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
                                <h1 className="mb-0 h2 fw-bold">Approve</h1>
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
                                        <input type="number" className='w-auto form-control form-control-sm float-end' placeholder='Cari Token' onChange={cariData} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-responsive">

                                            <table className="table mb-0 text-nowrap table-sm table-hover table-centered">
                                                <thead className="">
                                                    <tr>
                                                        <th className='py-2'>No</th>
                                                        <th className='py-2'>Identitas</th>
                                                        <th className='py-2'>Formulir</th>
                                                        <th className='py-2'>Pembayaran</th>
                                                        <th className='py-2'>Seleksi</th>
                                                        <th className='py-2'>Tanggal</th>
                                                        <th className='py-2'>Approve</th>
                                                        <th className='py-2'>Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Approve.length == 0 ?
                                                        <tr>
                                                            <td align='center' colSpan={8}>
                                                                Tidak ada data!
                                                            </td>
                                                        </tr>
                                                        :
                                                        Approve.map((item, index) => (
                                                            <tr key={item.id_approve}>
                                                                <td>{(page - 1) * 10 + index + 1}</td>
                                                                <td>
                                                                    <table>
                                                                        <tr><td>Nama</td><td>:</td><td>{item.formulirs[0].nama}</td></tr>
                                                                        <tr><td>Tempat Lahir</td><td>:</td><td>{item.formulirs[0].tempat_lahir}</td></tr>
                                                                        <tr><td>Tanggal Lahir</td><td>:</td><td>{item.formulirs[0].tanggal_lahir}</td></tr>
                                                                        <tr><td>Email</td><td>:</td><td>{item.formulirs[0].email}</td></tr>
                                                                    </table>
                                                                </td>
                                                                <td>
                                                                    {item.formulir == "belum" ?
                                                                        <span className="badge bg-warning">Pending</span>
                                                                        : <span className="badge bg-success">Completed</span>}
                                                                </td>
                                                                <td>
                                                                    {item.status_pembayaran == "belum" ?
                                                                        <span className="badge bg-warning">Pending</span>
                                                                        : <span className="badge bg-success">Completed</span>}
                                                                </td>
                                                                <td>
                                                                    {item.status_seleksi == "belum" ?
                                                                        <span className="badge bg-warning">Pending</span>
                                                                        : <span className="badge bg-success">Completed</span>}
                                                                </td>
                                                                <td >{item.tanggal_approve == "" ?
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="icon-shape icon-sm rounded-3 border p-1">
                                                                            <i className="fe fe-clock fs-3"></i>
                                                                        </div>
                                                                    </div>
                                                                    : moment(item.tanggal_approve).format('DD MMMM YYYY')}</td>
                                                                <td >
                                                                    {item.status == "tidak" ?
                                                                        <span className="badge bg-warning">Pending</span>
                                                                        : <span className="badge bg-success">Completed</span>}

                                                                </td>
                                                                <td>
                                                                    {item.status == "tidak" ?
                                                                        <Link to="/detailapprove" state={{ token: item.token, idApprove: item.id_approve }} className='btn btn-sm btn-info'>Approve</Link>
                                                                        :
                                                                        <Link to="/detailapprove" state={{ token: item.token, idApprove: item.id_approve }} className='btn btn-sm btn-info'>Lihat </Link>
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

export default Approve