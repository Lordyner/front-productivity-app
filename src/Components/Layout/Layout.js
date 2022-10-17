import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="App">
            <Navbar />
            <div className='container'>
                <Outlet />
            </div>

            <Footer />

        </div>
    );
};

export default Layout;