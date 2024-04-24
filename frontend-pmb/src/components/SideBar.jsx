import React from 'react'

const SideBar = () => {
    return (
        <nav className="navbar navbar-vertical navbar-expand-lg" style={{ display: 'none' }}>
            <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
                <div className="navbar-vertical-content">
                    <ul className="navbar-nav flex-column" id="navbarVerticalNav">
                        <li className="nav-item">
                            <hr className="navbar-vertical-line" />
                            <div className="nav-item-wrapper"><a className="nav-link dropdown-indicator label-1" href="#nv-e-commerce" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-e-commerce">
                                <div className="d-flex align-items-center">
                                    <div className="dropdown-indicator-icon"><span className="fas fa-caret-right"></span></div><span className="nav-link-icon"><span data-feather="shopping-cart"></span></span><span className="nav-link-text">E commerce</span>
                                </div>
                            </a>
                                <div className="parent-wrapper label-1">
                                    <ul className="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-e-commerce">
                                        <li className="collapsed-nav-item-title d-none">E commerce</li>
                                        <li className="nav-item">
                                            <a className="nav-link dropdown-indicator" href="#nv-admin" data-bs-toggle="collapse" aria-expanded="true" aria-controls="nv-admin">
                                                <div className="d-flex align-items-center">
                                                    <div className="dropdown-indicator-icon"><span className="fas fa-caret-right"></span></div><span className="nav-link-text">Admin</span>
                                                </div>
                                            </a>
                                            <div className="parent-wrapper">
                                                <ul className="nav collapse parent show" data-bs-parent="#e-commerce" id="nv-admin">
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="../apps/e-commerce/admin/add-product.html">
                                                            <div className="d-flex align-items-center"><span className="nav-link-text">Add product</span></div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="nav-item-wrapper">
                                <a className="nav-link label-1" href="../apps/chat.html" role="button" data-bs-toggle="" aria-expanded="false">
                                    <div className="d-flex align-items-center"><span className="nav-link-icon"><span data-feather="message-square"></span></span><span className="nav-link-text-wrapper"><span className="nav-link-text">Chat</span></span></div>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navbar-vertical-footer"><button className="btn navbar-vertical-toggle border-0 fw-semibold w-100 white-space-nowrap d-flex align-items-center"><span className="uil uil-left-arrow-to-left fs-8"></span><span className="uil uil-arrow-from-right fs-8"></span><span className="navbar-vertical-footer-text ms-2">Collapsed View</span></button></div>
        </nav>
    )
}

export default SideBar