import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const DropdownItem = (props) => {
    const navigate = useNavigate();
    return (
        <Link to={props.linkToNavigate} className="menu-item">
            <span className="icon-button">
                {props.leftIcon}
            </span>
            {props.children}
            <span className="icon-right">
                {props.rightIcon}
            </span>
        </Link>
    );
};

export default DropdownItem;