import React from 'react';
import NavItem from './NavItem';
import { IoPersonCircle, IoCreateSharp, IoHomeSharp, IoStatsChartSharp } from 'react-icons/io5';
import DropdownMenuAuthentication from './DropdownMenuAuthentication';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {

    const { auth } = useAuth();

    return (
        <nav className="navbar">
            <ul className="navbar-nav">

                <li className="nav-item">
                    <Link className="icon-button" to='/dashboard'><IoHomeSharp /></Link>
                </li>
                {
                    auth?.accessToken && <>
                        <li className="nav-item">
                            <Link className="icon-button" to='/newOpportunity'><IoCreateSharp /></Link>
                        </li>
                    </>
                }
                <NavItem icon={<IoPersonCircle />} menu={DropdownMenuAuthentication} />
            </ul>
        </nav >


    );
};

export default Navbar;