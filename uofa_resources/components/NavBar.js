import React from 'react';
import Image from 'next/image';

const NavBar = () => {
    return (
        <nav className="navbar flex justify-between items-center">
            <div className="navbar-logo">
                
            </div>
            <div className="navbar-links">
                <ul className="flex">
                    <li><a href="/login" className="mr-4">Login</a></li>
                    <li><a href="/signup">Signup</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
