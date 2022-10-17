import DropdownMenuAuthentication from './DropdownMenuAuthentication';
import { useState } from 'react'

const NavItem = ({ icon, menu: Menu }) => {

    const [open, setOpen] = useState(false);
    return (
        <li className="nav-item">
            <a href="#" className="icon-button"
                onClick={() => setOpen(!open)}>
                {icon}
            </a>

            {open && <Menu />}
        </li >
    );
};

export default NavItem;