import React from 'react';
import { IoPersonCircle } from 'react-icons/io5';
const UserMenu = () => {
    return (

        <div className="dropownUserMenu align-self-end">
            <button className="font-icon">{<IoPersonCircle />}</button>
            <div className="dropdown-content">
                <a rel="noopener" target="_blank" href="#">Sign in</a>
                <a rel="noopener" target="_blank" href="#">Sign up</a>
            </div>
        </div>

    );
};

export default UserMenu;