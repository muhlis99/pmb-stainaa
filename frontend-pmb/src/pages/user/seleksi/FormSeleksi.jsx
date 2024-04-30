import React, { useEffect, useState } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"
import moment from 'moment'
import axios from 'axios'
import Swal from 'sweetalert2'

const FormSeleksi = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Perntanyaan, setPertanyaan] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [idSeleksi, setIdSeleksi] = useState('')
    const [idPertanyaan, setIdPertanyaan] = useState('')
    const [pilihanUser, setPilihanUser] = useState('')
    const [minutesDifference, setMinutesDifference] = useState('')
    const location = useLocation()

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        calculateMinutes()
    }, [])

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

    useEffect(() => {
        getJawabanTerpilih()
    }, [idPertanyaan, idSeleksi])

    const calculateMinutes = () => {
        const startTime = location.state.waktuNow
        const endTime = new Date()

        const difference = Math.abs((endTime.getTime() - startTime.getTime()) / (1000 * 60))
        const formattedDifference = `${difference.toFixed()} menit`
        setMinutesDifference(formattedDifference)
    }

    useEffect(() => {
        const interval = setInterval(calculateMinutes, 1000) // Perbarui setiap detik
        return () => clearInterval(interval) // Bersihkan interval setelah komponen di-unmount
    }, [])

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

    const getJawabanTerpilih = async () => {
        try {
            if (idPertanyaan && idSeleksi) {
                const response = await axios.get(`v1/jawaban/checkJawaban/${idPertanyaan}/${idSeleksi}`)
                setPilihanUser(response.data.data.jawaban)
            }
        } catch (error) {

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

    const selanjutnya = async () => {
        try {
            if (pilihanUser == '') {
                paginate(page + 1)
            } else {
                await axios.post(`v1/jawaban/postJawaban`, {
                    id_pertanyaan: idPertanyaan,
                    id_seleksi: idSeleksi,
                    jawaban: pilihanUser,
                }).then(function () {
                    setPilihanUser()
                    paginate(page + 1)
                })
            }
        } catch (error) {
        }
    }

    const sebelumnya = () => {
        setPilihanUser()
        paginate(page - 1)
    }

    const selesai = () => {
        try {
            Swal.fire({
                title: "Yakin untuk menyelesaikan?",
                text: 'Pastikan semua pertanyaan tidak ada yang terlewat!',
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (pilihanUser == null) {
                        Swal.fire({
                            title: 'Gagal Selesai',
                            text: 'Anda belum memilih jawaban pertanyaan terakhir',
                            icon: 'warning',
                            confirmButtonColor: '#3085d6'
                        })
                    } else {
                        axios.post(`v1/jawaban/selesai`, {
                            id_pertanyaan: idPertanyaan,
                            id_seleksi: idSeleksi,
                            jawaban: pilihanUser,
                            durasi: minutesDifference
                        }).then(function (response) {
                            Swal.fire({
                                title: 'Berhasil',
                                text: response.data.message,
                                icon: 'success',
                                confirmButtonColor: '#3085d6'
                            }).then(() => {
                                navigate('/pemilihanProdi')
                            })
                        })
                    }

                }
            })
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
                                <h1 className="mb-0 h2 fw-bold">Seleksi {pilihanUser}</h1>
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
                                        <span className='float-end'>{minutesDifference}</span>
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
                                                {page == rows ? <button className='btn btn-success float-end' onClick={selesai}>Selesai</button>
                                                    :
                                                    <button className='btn btn-light float-end' onClick={selanjutnya}>Selanjutnya <FaAngleDoubleRight /></button>
                                                }
                                                {page == perPage ? ""
                                                    :
                                                    <button className='btn btn-light' onClick={sebelumnya}><FaAngleDoubleLeft /> Sebelumnya</button>
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