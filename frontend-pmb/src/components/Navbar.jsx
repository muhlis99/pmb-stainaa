import React from 'react'
import logo from "../assets/stainaa.png"
import avatar from "../assets/userAvatar.png"
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, reset } from "../features/authSlice"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

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

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container px-0">
                    <Link className="navbar-brand" style={{ fontSize: '28px', fontWeight: '700' }}>
                        <img src={logo} alt="" width="33" height="33" className="d-inline-block align-text-top" />
                        <span className='ms-2'>PMB STAINAA</span>
                    </Link>
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
                                                <h5 className="mb-1">{user && user.data.nama}</h5>
                                                {user && <p className="mb-0">{user.data.email}</p>}
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
                    <button className="navbar-toggler collapsed ms-2" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="icon-bar top-bar mt-0"></span>
                        <span className="icon-bar middle-bar"></span>
                        <span className="icon-bar bottom-bar"></span>
                    </button>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-default py-0 py-lg-2">
                <div className="container px-0">
                    <div className="collapse navbar-collapse" id="navbar-default">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDashboard" data-bs-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false" data-bs-display="static">Dashboard</a>
                                <ul className="dropdown-menu dropdown-menu-arrow" aria-labelledby="navbarDashboard">
                                    <li>
                                        <a className="dropdown-item" href="../admin-dashboard.html">Overview</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="../dashboard-analytics.html">Analytics</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarPages" data-bs-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">Pages</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarPages">
                                    <li className="dropdown-submenu dropend">
                                        <a className="dropdown-item dropdown-list-group-item dropdown-toggle"
                                            href="#">Courses</a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="../admin-course-overview.html" className="dropdown-item">All
                                                    Courses</a>
                                            </li>
                                            <li>
                                                <a href="../admin-course-category.html" className="dropdown-item">Course
                                                    Category</a>
                                            </li>
                                            <li>
                                                <a href="../admin-course-category-single.html"
                                                    className="dropdown-item">Category Single</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="dropdown-submenu dropend">
                                        <a className="dropdown-item dropdown-list-group-item dropdown-toggle" href="#">Users</a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="../admin-instructor.html" className="dropdown-item">Instructor</a>
                                            </li>
                                            <li>
                                                <a href="../admin-students.html" className="dropdown-item">Students</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu dropend">
                                        <a className="dropdown-item dropdown-list-group-item dropdown-toggle" href="#">CMS</a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="../admin-cms-overview.html" className="dropdown-item">Overview</a>
                                            </li>
                                            <li>
                                                <a href="../admin-cms-post.html" className="dropdown-item">All Post</a>
                                            </li>
                                            <li>
                                                <a href="../admin-cms-post-new.html" className="dropdown-item">New Post</a>
                                            </li>
                                            <li>
                                                <a href="../admin-cms-post-category.html" className="dropdown-item">Category</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="dropdown-submenu dropend">
                                        <a className="dropdown-item dropdown-list-group-item dropdown-toggle"
                                            href="#">Project</a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a className="dropdown-item" href="../project-grid.html">Grid</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="../project-list.html">List</a>
                                            </li>

                                            <li className="dropdown-submenu dropend">
                                                <a className="dropdown-item dropdown-list-group-item dropdown-toggle"
                                                    href="#">Single</a>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a className="dropdown-item"
                                                            href="../project-overview.html">Overview</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="../project-task.html">Task</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="../project-budget.html">Budget</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="../project-team.html">Team</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="../project-files.html">Files</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="../project-summary.html">Summary</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="../add-project.html">Create Project</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu dropend">
                                        <a className="dropdown-item dropdown-list-group-item dropdown-toggle" href="#">Site
                                            Setting</a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a className="dropdown-item" href="../setting-general.html">General</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="../setting-google.html">google</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="../setting-social.html">Social</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="../setting-social-login.html">Social
                                                    Login</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="../setting-payment.html">Payment</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="../setting-smpt.html">SMPT</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar