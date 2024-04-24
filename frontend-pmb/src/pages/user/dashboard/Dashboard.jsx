import React from 'react'
import LayoutUser from '../../LayoutUser'

const Dashboard = () => {
    return (
        <LayoutUser>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-4 mb-4 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Dashboard</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row"></div>
            </div>
        </LayoutUser>
    )
}

export default Dashboard