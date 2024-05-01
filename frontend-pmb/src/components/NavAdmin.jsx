import React from 'react'
import avatar from "../assets/userAvatar.png"
import { Link } from 'react-router-dom'

const NavAdmin = () => {
    return (
        <nav className="navbar-default navbar navbar-expand-lg">
            <Link id="nav-toggle">
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
                                        <h5 className="mb-1">Annette Black</h5>
                                        <p className="mb-0">annette@geeksui.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-divider"></div>
                            <ul className="list-unstyled">
                                <li className="dropdown-submenu dropstart-lg">
                                    <a className="dropdown-item dropdown-list-group-item dropdown-toggle" href="#">
                                        <i className="fe fe-circle me-2"></i>
                                        Status
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                <span className="badge-dot bg-success me-2"></span>
                                                Online
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                <span className="badge-dot bg-secondary me-2"></span>
                                                Offline
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                <span className="badge-dot bg-warning me-2"></span>
                                                Away
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                <span className="badge-dot bg-danger me-2"></span>
                                                Busy
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="../../pages/profile-edit.html">
                                        <i className="fe fe-user me-2"></i>
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="../../pages/student-subscriptions.html">
                                        <i className="fe fe-star me-2"></i>
                                        Subscription
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="fe fe-settings me-2"></i>
                                        Settings
                                    </a>
                                </li>
                            </ul>
                            <div className="dropdown-divider"></div>
                            <ul className="list-unstyled">
                                <li>
                                    <a className="dropdown-item" href="../../index.html">
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
    )
}

export default NavAdmin