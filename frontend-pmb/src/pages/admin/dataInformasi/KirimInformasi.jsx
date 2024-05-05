import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import { FaCalendarAlt } from 'react-icons/fa'

const KirimInformasi = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { isError, user } = useSelector((state) => state.auth)
    const [biodata, setBiodata] = useState([])
    const [DataInformasi, setDataInformasi] = useState([])

    useEffect(() => { console.log(location.state.token) }, [location])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getBiodataByToken()
        getDataInformasi()
    }, [location])

    const getBiodataByToken = async () => {
        try {
            const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
            setBiodata(response.data.data)
        } catch (error) {

        }
    }

    const getDataInformasi = async () => {
        try {
            const response = await axios.get(`v1/informasi/allbytoken/${location.state.token}`)
            setDataInformasi(response.data.data)
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
                                <h1 className="mb-0 h2 fw-bold">Informasi</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className='col-lg-6 col-md-6 col-sm-12'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><h5>Nama</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{biodata.nama}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5>Jenis Kelamin</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{biodata.jenis_kelamin == 'l' ? 'Laki-Laki' : 'Perempuan'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-12'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><h5>Tempat Lahir</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='text-capitalize'>{biodata.tempat_lahir}</td>
                                                </tr>
                                                <tr>
                                                    <td><h5>Tanggal Lahir</h5></td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='text-capitalize'>{moment(biodata.tanggal_lahir).format('DD MMMM YYYY')}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="row">
                            {DataInformasi.map((item) => (
                                <div key={item.id_infomasi} className="col-lg-4 col-md-4 col-sm-12">
                                    <div className="card">
                                        <div className="card-header py-1">
                                            <h5 className='card-title mt-2'>{item.judul}</h5>
                                        </div>
                                        <div className="card-body py-0">
                                            <div className='mb-2'>
                                                <span>
                                                    <FaCalendarAlt /> {moment(item.tanggal).format('DD MMMM YYYY')}
                                                </span>
                                            </div>
                                            <p>{item.isi.substr(0, 114)}<em>...Selengkapnya</em></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </LayoutAdmin>
    )
}

export default KirimInformasi