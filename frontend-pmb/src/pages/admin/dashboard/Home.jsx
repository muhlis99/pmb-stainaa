import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { useNavigate } from 'react-router-dom'
import { FaFemale, FaMale, FaUsers } from "react-icons/fa"
import Chart from "chart.js/auto"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from "react-chartjs-2"
import axios from 'axios'

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const [Grafik, setGrafik] = useState([])
    const [jumlah, setJumlah] = useState([])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getDataGrafik()
    }, [])

    useEffect(() => {
        getJumlahMahasiswa()
    }, [])

    const getDataGrafik = async () => {
        try {
            const response = await axios.get(`v1/home/grafik`)
            setGrafik(response.data.data)
        } catch (error) {

        }
    }

    const getJumlahMahasiswa = async () => {
        try {
            const response = await axios.get(`v1/home/jumlahMhs`)
            setJumlah(response.data)
        } catch (error) {

        }
    }

    const labels = Grafik.map(item => (
        item.tahun
    ))

    const Jumlah = Grafik.map(item => (
        item.jumlahMahasiswa
    ))

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            }
        }
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'PMB Pertahun',
                backgroundColor: "rgb(3, 103, 252, 0.7)",
                borderColor: "rgb(28, 118, 253)",
                borderWidth: 2,
                borderRadius: 5,
                data: Jumlah,
            },
        ]
    }

    return (
        <LayoutAdmin>
            <section className="container-fluid p-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-3 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Dashboard</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 lh-1">
                                    <div>
                                        <span className="fs-6 text-uppercase fw-semibold ls-md">Mahasiswa</span>
                                    </div>
                                    <div>
                                        <FaUsers className='fs-3 text-primary' />
                                    </div>
                                </div>
                                <h2 className="fw-bold mb-1">{jumlah.jmlMhs}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 lh-1">
                                    <div>
                                        <span className="fs-6 text-uppercase fw-semibold ls-md">Mahasiswa Putra</span>
                                    </div>
                                    <div>
                                        <FaMale className='fs-3 text-primary' />
                                    </div>
                                </div>
                                <h2 className="fw-bold mb-1">{jumlah.jmlMhsCowok}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 lh-1">
                                    <div>
                                        <span className="fs-6 text-uppercase fw-semibold ls-md">Mahasiswa Putri</span>
                                    </div>
                                    <div>
                                        <FaFemale className='fs-3 text-primary' />
                                    </div>
                                </div>
                                <h2 className="fw-bold mb-1">{jumlah.jmlMhsCewek}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-6 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <span>Jumlah Pendaftaran Pertahun</span>
                            </div>
                            <div className="card-body">
                                <Bar options={options} data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutAdmin>
    )
}

export default Home