import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Body = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-base-300">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Body
