import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/login_register.css';
import '../assets/navBar.css';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const { isAuthenticated, username} = useAuth();

    return (
        <container>
            <nav>
                <ul>
                    <div className='title-div'>
                        <li className='title'>
                            <a href="/">Rate My Build QR</a>
                        </li>
                    </div>

                    {isAuthenticated ? (
                        <div className='nav-items-div'>
                            <li>
                                <NavLink style={{ color: 'white' }} to={`/${username}/cars`}>
                                    Cars
                                </NavLink>
                            </li>
                            <li>
                                <NavLink style={{ color: 'white' }} to='/logout'>
                                    Logout
                                </NavLink>
                            </li>
                        </div>
                    ) : (
                        <div className='nav-items-div'>
                            <li>
                                <NavLink to='/Register'>Register</NavLink>
                            </li>
                            <li>
                                <NavLink to='/login'>Login</NavLink>
                            </li>
                        </div>
                    )}
                </ul>
            </nav>
        </container>
    );
};

export default NavBar;
