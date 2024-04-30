import React, { useEffect, useState } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useNavigate } from 'react-router-dom'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"
import moment from 'moment'
import axios from 'axios'

const FormSeleksi = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Perntanyaan, setPertanyaan] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [waktu, setWaktu] = useState('')
    const [time, setTime] = useState({ sec: 0, min: 0, hr: 0 })
    const [intervalId, setIntervalId] = useState()
    const [idSeleksi, setIdSeleksi] = useState('')
    const [idPertanyaan, setIdPertanyaan] = useState('')
    const [pilihanUser, setPilihanUser] = useState('')

    useEffect(() => {
        pauseOrResume()
    }, [])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        const getSeleksiByToken = async () => {
            try {
                if (user) {
                    const response = await axios.get(`v1/seleksi/byToken/${user.data.token}`)
                    setIdSeleksi(response.data.data.id_seleksi)
                }
            } catch (error) {

            }
        }

        getSeleksiByToken()
    }, [user])

    useEffect(() => {
        getPertanyaan()
    }, [page])

    const getPertanyaan = async () => {
        try {
            const response = await axios.get(`v1/pertanyaan/all?page=${page}`)
            setPertanyaan(response.data.data)
            setPage(response.data.current_page)
            setrows(response.data.total_data)
            setperPage(response.data.per_page)
            setIdPertanyaan(response.data.data[0].id_pertanyaan)
        } catch (error) {

        }
    }

    const updateTimer = () => {
        setTime((prev) => {
            let newTime = { ...prev }
            if (newTime.sec < 59) newTime.sec += 1
            else {
                newTime.min += 1
                newTime.sec = 0
            }
            if (newTime.min === 60) {
                newTime.min = 0
                newTime.hr += 1
            }

            return newTime
        })
    }

    const pauseOrResume = () => {
        if (!intervalId) {
            let id = setInterval(updateTimer, 1000)
            setIntervalId(id)
        } else {
            clearInterval(intervalId)
            setIntervalId("")
        }
    }

    const paginate = (e) => {
        setPage(e)
    }

    const tg = []
    for (let paging = 1; paging <= rows; paging++) {
        if (paging < 10) {
            tg.push(<button key={paging} className={`btn btn-sm ms-1 my-1 px-3 ${paging == page ? 'btn-info' : 'btn-outline-info'}`}>{"0" + paging}</button>)
        } else {
            tg.push(<button key={paging} className={`btn btn-sm ms-1 my-1 px-3 ${paging == page ? 'btn-info' : 'btn-outline-info'}`}>{paging}</button>)
        }
    }

    const jawabanPilihanUser = (e) => {
        setPilihanUser(e)
    }

    return (
        <LayoutUser>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-2 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-2 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Seleksi pilihan : {pilihanUser}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className='row'>
                                    <div className="col-md-12">
                                        <span>{moment().format('DD MMM YYYY')}</span>
                                        <button className='btn btn-sm btn-light float-end'>{`${time.hr < 10 ? 0 : ""}${time.hr} : ${time.min < 10 ? 0 : ""}${time.min} : ${time.sec < 10 ? 0 : ""}${time.sec}`}</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 border py-3">
                                        <div className="row">
                                            <div className="col-md-10 offset-1">
                                                {tg}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row">
                                            {Perntanyaan.map((item) => (
                                                <div key={item.id_pertanyaan} className="col-md-12 py-3">
                                                    <h4>{item.pertanyaan}</h4>
                                                    <ul className='list-group'>
                                                        <li className='list-group-item border-0'>
                                                            <button className={`btn btn-sm ${pilihanUser == 'a' ? 'btn-info' : 'btn-outline-info'}`} onClick={() => jawabanPilihanUser('a')}>A</button>
                                                            <span className='ms-2'>{item.pilihan_a}</span>
                                                        </li>
                                                        <li className='list-group-item border-0'>
                                                            <button className={`btn btn-sm ${pilihanUser == 'b' ? 'btn-info' : 'btn-outline-info'}`} onClick={() => jawabanPilihanUser('b')}>B</button>
                                                            <span className='ms-2'>{item.pilihan_b}</span>
                                                        </li>
                                                        <li className='list-group-item border-0'>
                                                            <button className={`btn btn-sm ${pilihanUser == 'c' ? 'btn-info' : 'btn-outline-info'}`} onClick={() => jawabanPilihanUser('c')}>C</button>
                                                            <span className='ms-2'>{item.pilihan_c}</span>
                                                        </li>
                                                        <li className='list-group-item border-0'>
                                                            <button className={`btn btn-sm ${pilihanUser == 'd' ? 'btn-info' : 'btn-outline-info'}`} onClick={() => jawabanPilihanUser('d')}>D</button>
                                                            <span className='ms-2'>{item.pilihan_d}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                {page == rows ? <button className='btn btn-success float-end'>Selesai</button>
                                                    :
                                                    <button className='btn btn-light float-end' onClick={() => paginate(page + 1)}>Selanjutnya <FaAngleDoubleRight /></button>
                                                }
                                                {page == perPage ? ""
                                                    :
                                                    <button className='btn btn-light' onClick={() => paginate(page - 1)}><FaAngleDoubleLeft /> Sebelumnya</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutUser>
    )
}

export default FormSeleksi