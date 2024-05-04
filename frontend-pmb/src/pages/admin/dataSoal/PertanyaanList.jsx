import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const PertanyaanList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { isError, user } = useSelector((state) => state.auth)
    const [PaketSoal, setPaketSoal] = useState([])
    const [soalTerinput, setSoalTerinput] = useState('')

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
    }, [location])

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

    return (
        <LayoutAdmin>
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
                                        <button className='btn btn-sm btn-success'>Tambah Pertanyaan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className='card mt-3'>
                            <div className="card-header d-flex gap-2">
                                <button className='btn btn-sm btn-info'>Edit</button>
                                <button className='btn btn-sm btn-danger'>Hapus</button>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5>1. Bagaimana dengan ini?</h5>
                                        <ol style={{ listStyleType: 'upper-alpha' }}>
                                            <li>

                                            </li>
                                            <li>

                                            </li>
                                            <li>

                                            </li>
                                            <li>

                                            </li>
                                        </ol>
                                        <h5>Kunci Jawaban : C</h5>
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

export default PertanyaanList