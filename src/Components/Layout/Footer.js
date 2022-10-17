import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <Link to='/'>FAQ</Link>
            <Link to='/'>Learn more about us</Link>
        </footer>
    );
};

export default Footer;