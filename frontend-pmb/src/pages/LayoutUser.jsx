import React from 'react'
import Navbar from '../components/Navbar'


const LayoutUser = ({ children }) => {
    return (
        <React.Fragment>
            <main>
                <Navbar />
                <section className='my-6'>{children}</section>
            </main>

        </React.Fragment>
    )
}

export default LayoutUser