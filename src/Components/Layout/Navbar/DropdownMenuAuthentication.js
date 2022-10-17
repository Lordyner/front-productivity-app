import React from 'react';
import DropdownItem from './DropdownItem';
import { IoPersonAddSharp, IoLogOutOutline } from 'react-icons/io5';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';
const DropdownMenu = () => {

    const { auth, setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const logout = useLogout();
    const signOut = async () => {

        await logout();
        navigate('/signIn');
    }

    return (

        <>
            {
                auth?.accessToken &&
                <div className="dropdown">
                    <a className="menu-item" onClick={signOut}>
                        <span className="icon-button">
                            <IoLogOutOutline />
                        </span>
                        Logout
                    </a>
                </div>
            }
            {
                !auth?.accessToken &&
                <div className="dropdown">
                    <DropdownItem
                        leftIcon={<IoPersonAddSharp />}
                        linkToNavigate='signUp'
                    >Sign up</DropdownItem>
                    <DropdownItem
                        leftIcon={<IoPersonAddSharp />}
                        linkToNavigate='signIn'
                    >Sign in</DropdownItem>
                </div >
            }

        </>
    );
};

export default DropdownMenu;