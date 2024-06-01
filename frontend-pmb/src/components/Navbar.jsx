import React, { useEffect, useState } from 'react'
import logo from "../assets/stainaa.png"
import avatar from "../assets/userAvatar.png"
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, reset } from "../features/authSlice"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import axios from 'axios'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [nama, setNama] = useState('')
    const [idPendaftar, setIdPendaftar] = useState('')
    const [dataForm, setDataForm] = useState('')
    const [dataPembayaran, setDataPembayaran] = useState('')

    const logOut = () => {
        Swal.fire({
            title: "Anda Yakin Untuk Keluar?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(LogOut())
                dispatch(reset())
                navigate("/login")
            }
        })
    }

    useEffect(() => {
        getByToken()
        getStatus()
    }, [user])

    const getByToken = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/formulir/getByToken/${user.data.token}`)
                setNama(response.data.data.nama)
                setIdPendaftar(response.data.data.id)
            }
        } catch (error) {

        }
    }

    const getStatus = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/approve/byToken/${user.data.token}`)
                setDataForm(response.data.data.status_formulir)
                setDataPembayaran(response.data.data.status_pembayaran)
            }
        } catch (error) {

        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center">
                        <img src={logo} alt="" width="33" height="33" className="d-inline-block" />
                        <span className='ms-2 display-6'>PMB STAINAA</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-5 me-auto mb-2 mb-lg-0 gap-5">
                            <li className="nav-item">
                                <Link to="/dashboard" className='nav-link fs-4'>
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/cekdetaildata" className='nav-link fs-4'>
                                    Formulir
                                </Link>
                            </li>
                            <li className="nav-item">
                                {dataForm == 'belum' ?
                                    <Link to="#" className='nav-link fs-4'>Pembayaran</Link>
                                    :
                                    <Link to="/pembayaran" className='nav-link fs-4'>Pembayaran</Link>
                                }
                            </li>
                            <li className="nav-item">
                                {dataPembayaran == 'belum' ?
                                    <Link to='#' className='nav-link fs-4'>
                                        Seleksi
                                    </Link>
                                    :
                                    <Link to='/infoseleksi' className='nav-link fs-4'>
                                        Seleksi
                                    </Link>
                                }
                            </li>
                        </ul>
                        <div className="ms-auto d-flex align-items-center">
                            <ul className="navbar-nav navbar-right-wrap d-flex nav-top-wrap ms-2">
                                <li className="dropdown ms-2">
                                    <a className="rounded-circle" href="#" role="button" id="dropdownUser" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <div className="avatar avatar-md avatar-indicators avatar-online">
                                            <img alt="avatar" src={avatar}
                                                className="rounded-circle" />
                                        </div>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
                                        <div className="dropdown-item">
                                            <div className="d-flex">
                                                <div className="avatar avatar-md avatar-indicators avatar-online">
                                                    <img alt="avatar" src={avatar}
                                                        className="rounded-circle" />
                                                </div>
                                                <div className="ms-3 lh-1">
                                                    <h5 className="mb-1">{nama}</h5>
                                                    {user && <p className="mb-0">{user.data.email}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <ul className="list-unstyled">
                                            <li>
                                                <a className="dropdown-item cursor-pointer" onClick={logOut}>
                                                    <i className="fe fe-power me-2"></i>
                                                    Sign Out
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar