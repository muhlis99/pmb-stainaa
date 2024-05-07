import React, { useEffect, useState } from 'react'
import LayoutUser from '../../LayoutUser'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { FaCalendarAlt } from 'react-icons/fa'

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Informasi, setInformasi] = useState([])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getDataInformasiByToken()
    }, [user])

    const getDataInformasiByToken = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/informasi/allbytoken/${user.data.token}`)
                setInformasi(response.data.data)
            }
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
                                <h1 className="mb-0 h2 fw-bold">Dashboard</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-2">
                            <div className="card-body">
                                <h4>Selamat datang di PMB STAINAA</h4>
                                <span>Silakan selesaikan data pendaftaran sebagaimana berikut</span>
                                <ol>
                                    <li>Lengkapi data formulir meliputi data diri, data alamat, data orang tua, data wali serta berkas pendaftaran.</li>
                                    <li>Langkah selanjutnya yaitu melakukan pembayaran biaya pendaftaran.</li>
                                    <li>Langkah selanjutnya yaitu melakukan seleksi masuk.</li>
                                </ol>
                            </div>
                        </div>
                        {Informasi.map((item, index) => (
                            <div className="card mb-2">
                                <div className="card-header py-1">
                                    <h5 className="card-title mt-1">{item.judul}</h5>
                                </div>
                                <div className="card-body py-2">
                                    <div className='mb-2'>
                                        <span>
                                            <FaCalendarAlt /> {moment(item.tanggal).format('DD MMMM YYYY')}
                                        </span>
                                    </div>
                                    <p>{item.isi.substr(0, 114)}<em className='cursor-pointer'>...Selengkapnya</em></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LayoutUser>
    )
}

export default Dashboard