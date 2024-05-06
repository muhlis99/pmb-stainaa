import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assets/stainaa.png"
import avatar from "../assets/userAvatar.png"
import { LogOut, reset } from "../features/authSlice"
import { useDispatch, useSelector } from "react-redux"
import Swal from 'sweetalert2'
import { FaBullhorn, FaCheckDouble, FaEdit, FaRegMoneyBillAlt, FaUsers, FaWpforms } from 'react-icons/fa'

const LayoutAdmin = ({ children }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [toggle, setToggle] = useState(false)

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

    const tambahClass = () => {
        if (toggle) {
            setToggle(false)
        } else {
            setToggle(true)
        }
    }
    return (
        <React.Fragment>
            <div id="db-wrapper" className={toggle ? 'toggled' : ''}>
                <nav className="navbar-vertical navbar">
                    <div className="vh-100" data-simplebar>
                        <Link to="/home" className="navbar-brand d-flex align-items-center" style={{ fontSize: '20px', fontWeight: '600' }}>
                            <img src={logo} alt="" width="33" className="d-inline-block align-text-top" />
                            <span className='ms-2'>PMB STAINAA</span>
                        </Link>
                        <ul className="navbar-nav flex-column" id="sideNavbar">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link ">
                                    <i className="nav-icon fe fe-home me-2"></i>
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/dataFormulir" className="nav-link">
                                    <FaWpforms className='nav-icon me-2' />
                                    Data Formulir
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="#" data-bs-toggle="collapse" data-bs-target="#navPembayaran"
                                    aria-expanded="false" aria-controls="navPembayaran">
                                    <FaRegMoneyBillAlt className="nav-icon me-2" />
                                    Pembayaran
                                </a>
                                <div id="navPembayaran" className="collapse" data-bs-parent="#sideNavbar">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <Link to="/pembayaranlist" className="nav-link  active">Data Pembayaran</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/transaksi" className="nav-link ">Transaksi Pembayaran</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="#" data-bs-toggle="collapse" data-bs-target="#navSeleksi"
                                    aria-expanded="false" aria-controls="navSeleksi">
                                    <FaEdit className='nav-icon me-2' />
                                    Seleksi
                                </a>
                                <div id="navSeleksi" className="collapse" data-bs-parent="#sideNavbar">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <Link to="/paketSoal" className="nav-link">Data Soal</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/hasilSeleksi" className="nav-link ">Hasil Seleksi</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link to="/approve" className="nav-link">
                                    <FaCheckDouble className='nav-icon me-2' />
                                    Approve
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/informasi" className="nav-link">
                                    <FaBullhorn className='nav-icon me-2' />
                                    Informasi
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/users" className="nav-link">
                                    <FaUsers className='nav-icon me-2' />
                                    User
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main id='page-content'>
                    <div className="header">
                        <nav className="navbar-default navbar navbar-expand-lg">
                            <Link id="nav-toggle" onClick={tambahClass} >
                                <i className="fe fe-menu"></i>
                            </Link>
                            <div className="ms-auto d-flex">
                                <ul className="navbar-nav navbar-right-wrap ms-2 d-flex nav-top-wrap">
                                    <li className="dropdown ms-2">
                                        <a className="rounded-circle" href="#" role="button" id="dropdownUser"
                                            data-bs-toggle="dropdown" aria-expanded="false">
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
                                                        <h5 className="mb-1">Admin</h5>
                                                        <p className="mb-0">{user && user.data.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="dropdown-divider"></div>
                                            <ul className="list-unstyled">
                                                <li>
                                                    <a className="dropdown-item" onClick={logOut}>
                                                        <i className="fe fe-power me-2"></i>
                                                        Sign Out
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    {children}
                </main>
            </div>
        </React.Fragment>
    )
}

export default LayoutAdmin