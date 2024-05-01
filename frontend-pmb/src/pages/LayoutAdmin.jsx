import React from 'react'
import SideBar from '../components/SideBar'
import NavAdmin from '../components/NavAdmin'

const LayoutAdmin = ({ children }) => {
    return (
        <React.Fragment>
            <div id="db-wrapper">
                <SideBar />
                <main id='page-content'>
                    <div className="header">
                        <NavAdmin />
                    </div>
                    {children}
                </main>
            </div>
        </React.Fragment>
    )
}

export default LayoutAdmin