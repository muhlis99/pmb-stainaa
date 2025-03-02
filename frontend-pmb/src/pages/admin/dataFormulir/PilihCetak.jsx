import React, { useState, useEffect } from 'react'
import LayoutAdmin from '../../LayoutAdmin'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const PilihCetak = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)
    const location = useLocation()
    const [nama, setNama] = useState('')

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        const getDataByToken = async () => {
            try {
                const response = await axios.get(`v1/formulir/getByToken/${location.state.token}`)
                setNama(response.data.data.nama);
            } catch (error) {
                console.log(error.response);
            }
        }
        getDataByToken()
    }, [location])

    return (
        <LayoutAdmin>
            <section className="container-fluid p-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-3 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Data Formulir <span className='text-danger'>{nama}</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row  align-items-center justify-content-center g-0 h-lg-100 py-8">
                    <div className="col-lg-7 col-md-8 py-8 py-xl-0">
                        <div className="card shadow">
                            <div className="card-header py-2 px-3">
                                <Link to="/dataFormulir" className='btn btn-sm btn-danger'>Kembali</Link>
                            </div>
                            <div className="card-body">
                                <div className="row text-center">
                                    <Link to={`/printform/${location.state.token}`} target="_blank" className="col-12 btn btn-sm btn-primary mb-2">Print Formulir</Link>
                                    <Link to={`/printformayah/${location.state.token}`} target="_blank" className="col-12 btn btn-sm btn-success mb-2">Print Formulir Ayah</Link>
                                    <Link to={`/printformibu/${location.state.token}`} target="_blank" className="col-12 btn btn-sm btn-info mb-2">Print Formulir Ibu</Link>
                                    <Link to={`/printsuratpernyataan/${location.state.token}`} target="_blank" className="col-12 btn btn-sm btn-secondary mb-2">Print Surat Pertnyataan</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutAdmin>
    )
}

export default PilihCetak