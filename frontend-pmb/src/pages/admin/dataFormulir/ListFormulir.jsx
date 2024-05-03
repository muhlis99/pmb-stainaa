import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useNavigate } from 'react-router-dom'
import { IoIosFemale, IoIosMale } from "react-icons/io"
import axios from 'axios'

const ListFormulir = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Formulir, setFormulir] = useState([])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getCheckForm()
    }, [])

    const getCheckForm = async () => {
        try {
            const response = await axios.get(`v1/formulir/getAllCheck`)
            setFormulir(response.data.data)
        } catch (error) {

        }
    }

    return (
        <LayoutAdmin>
            <section className="container-fluid p-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-3 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Data Formulir</h1>
                            </div>
                            <div className="nav btn-group" role="tablist">
                                <button className="btn btn-outline-secondary btn-sm active" data-bs-toggle="tab" data-bs-target="#tabPaneGrid" role="tab" aria-controls="tabPaneGrid" aria-selected="true">
                                    <span className="fe fe-grid"></span>
                                </button>
                                <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="tab" data-bs-target="#tabPaneList" role="tab" aria-controls="tabPaneList" aria-selected="false">
                                    <span className="fe fe-list"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="tabPaneGrid" role="tabpanel" aria-labelledby="tabPaneGrid">
                                <div className="row">
                                    {Formulir.map((item, index) => (
                                        <div key={index} className="col-xl-3 col-lg-6 col-md-6 col-12">
                                            <div className="card mb-4">
                                                <div className="card-body">
                                                    <div className="text-center">
                                                        <h4 className="mb-0 text-capitalize">{item.nama}</h4>
                                                        <p className="mb-0">
                                                            {item.jenkel == 'l' ? <IoIosMale className='me-1 fs-6' /> : <IoIosFemale className='me-1 fs-6' />}
                                                            {item.jenkel == 'l' ? 'Laki-Laki' : 'Perempuan'}
                                                        </p>
                                                        <p className="mb-0 text-capitalize">
                                                            <i className="fe fe-map-pin me-1 fs-6"></i>
                                                            {item.tempatLahir}
                                                        </p>
                                                    </div>
                                                    <div className="d-flex justify-content-between border-bottom py-2 mt-4">
                                                        <span>Data Diri</span>
                                                        <span className={item.datadiri == 1 ? 'text-info' : 'text-danger'}>{item.datadiri == 1 ? 'Selesai' : 'Belum'}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between border-bottom py-2">
                                                        <span>Data Alamat</span>
                                                        <span className={item.dataalamat == 1 ? 'text-info' : 'text-danger'}>{item.dataalamat == 1 ? 'Selesai' : 'Belum'}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between border-bottom py-2">
                                                        <span>Data Orang Tua</span>
                                                        <span className={item.dataortu == 1 ? 'text-info' : 'text-danger'}>{item.dataortu == 1 ? 'Selesai' : 'Belum'}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between border-bottom py-2">
                                                        <span>Data Wali</span>
                                                        <span className={item.datawali == 1 ? 'text-info' : 'text-danger'}>{item.datawali == 1 ? 'Selesai' : 'Belum'}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between pt-2">
                                                        <span>Data Berkas</span>
                                                        <span className={item.databerkas == 1 ? 'text-info' : 'text-danger'}>{item.databerkas == 1 ? 'Selesai' : 'Belum'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="tabPaneList" role="tabpanel" aria-labelledby="tabPaneList">
                    <div className="card">
                        <div className="card-body p-3">
                            <div className="row mb-2">
                                <div className="col-md-3 col-lg-3 col-sm-12 offset-9">
                                    <input type="text" className='form-control form-control-sm float-end' />
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-sm table-bordered text-nowrap mb-0 table-centered">
                                    <thead>
                                        <tr>
                                            <th className='py-2'>NO</th>
                                            <th className='py-2'>Nama</th>
                                            <th className='py-2'>Alamat</th>
                                            <th className='py-2'>Tempat Lahir</th>
                                            <th className='py-2'>Jenis Kelamin</th>
                                            <th className='py-2'>Status Fomulir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Formulir.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td className='text-capitalize'>{item.nama}</td>
                                                <td className='text-capitalize'>{item.alamat}</td>
                                                <td className='text-capitalize'>{item.tempatLahir}</td>
                                                <td className='text-capitalize'>{item.jenkel == 'l' ? 'Laki-Laki' : 'Perempuan'}</td>
                                                <td>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>Data Diri</td>
                                                                <td>&nbsp;:&nbsp;</td>
                                                                <td>{item.datadiri == 1 ? <span className="badge bg-success badge-sm">Sudah</span> : <span className="badge bg-danger badge-sm">Belum</span>}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Data Alamat</td>
                                                                <td>&nbsp;:&nbsp;</td>
                                                                <td>{item.dataalamat == 1 ? <span className="badge bg-success badge-sm">Sudah</span> : <span className="badge bg-danger badge-sm">Belum</span>}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Data Orang Tua</td>
                                                                <td>&nbsp;:&nbsp;</td>
                                                                <td>{item.dataortu == 1 ? <span className="badge bg-success badge-sm">Sudah</span> : <span className="badge bg-danger badge-sm">Belum</span>}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Data Wali</td>
                                                                <td>&nbsp;:&nbsp;</td>
                                                                <td>{item.datawali == 1 ? <span className="badge bg-success badge-sm">Sudah</span> : <span className="badge bg-danger badge-sm">Belum</span>}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Data Berkas</td>
                                                                <td>&nbsp;:&nbsp;</td>
                                                                <td>{item.databerkas == 1 ? <span className="badge bg-success badge-sm">Sudah</span> : <span className="badge bg-danger badge-sm">Belum</span>}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutAdmin>
    )
}

export default ListFormulir