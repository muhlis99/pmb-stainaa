import React from 'react'
import LayoutAdmin from '../../LayoutAdmin'

const Home = () => {
    return (
        <LayoutAdmin>
            <section className="container-fluid p-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-3 mb-3 d-lg-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-lg-0">
                                <h1 className="mb-0 h2 fw-bold">Dashboard</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-lg-6 col-md-12 col-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 lh-1">
                                    <div>
                                        <span className="fs-6 text-uppercase fw-semibold ls-md">Sales</span>
                                    </div>
                                    <div>
                                        <span className="fe fe-shopping-bag fs-3 text-primary"></span>
                                    </div>
                                </div>
                                <h2 className="fw-bold mb-1">$10,800</h2>
                                <span className="text-success fw-semibold">
                                    <i className="fe fe-trending-up me-1"></i>
                                    +20.9$
                                </span>
                                <span className="ms-1 fw-medium">Number of sales</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-12 col-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 lh-1">
                                    <div>
                                        <span className="fs-6 text-uppercase fw-semibold ls-md">Courses</span>
                                    </div>
                                    <div>
                                        <span className="fe fe-book-open fs-3 text-primary"></span>
                                    </div>
                                </div>
                                <h2 className="fw-bold mb-1">2,456</h2>
                                <span className="text-danger fw-semibold">120+</span>
                                <span className="ms-1 fw-medium">Number of pending</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-12 col-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 lh-1">
                                    <div>
                                        <span className="fs-6 text-uppercase fw-semibold ls-md">Students</span>
                                    </div>
                                    <div>
                                        <span className="fe fe-users fs-3 text-primary"></span>
                                    </div>
                                </div>
                                <h2 className="fw-bold mb-1">1,22,456</h2>
                                <span className="text-success fw-semibold">
                                    <i className="fe fe-trending-up me-1"></i>
                                    +1200
                                </span>
                                <span className="ms-1 fw-medium">Students</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-12 col-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 lh-1">
                                    <div>
                                        <span className="fs-6 text-uppercase fw-semibold ls-md">Instructor</span>
                                    </div>
                                    <div>
                                        <span className="fe fe-user-check fs-3 text-primary"></span>
                                    </div>
                                </div>
                                <h2 className="fw-bold mb-1">22,786</h2>
                                <span className="text-success fw-semibold">
                                    <i className="fe fe-trending-up me-1"></i>
                                    +200
                                </span>
                                <span className="ms-1 fw-medium">Instructor</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutAdmin>
    )
}

export default Home