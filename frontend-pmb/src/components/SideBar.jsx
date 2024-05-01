import React from 'react'
import logo from "../assets/stainaa.png"
import { Link } from 'react-router-dom'


const SideBar = () => {
    return (
        <nav className="navbar-vertical navbar">
            <div className="vh-100" data-simplebar>
                <Link className="navbar-brand" style={{ fontSize: '20px', fontWeight: '600' }}>
                    <img src={logo} alt="" width="33" height="33" className="d-inline-block align-text-top" />
                    <span className='ms-2'>PMB STAINAA</span>
                </Link>
                <ul className="navbar-nav flex-column" id="sideNavbar">
                    <li className="nav-item">
                        <a className="nav-link " href="#" data-bs-toggle="collapse" data-bs-target="#navDashboard"
                            aria-expanded="false" aria-controls="navDashboard">
                            <i className="nav-icon fe fe-home me-2"></i>
                            Dashboard
                        </a>
                        <div id="navDashboard" className="collapse  show " data-bs-parent="#sideNavbar">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link  active "
                                        href="../../pages/dashboard/admin-dashboard.html">Overview</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link "
                                        href="../../pages/dashboard/dashboard-analytics.html">Analytics</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " href="../../pages/dashboard/chat-app.html">
                            <i className="nav-icon fe fe-message-square me-2"></i>
                            Chat
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default SideBar