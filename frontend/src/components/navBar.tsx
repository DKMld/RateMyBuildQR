import React, {useEffect, useState} from 'react';
import '../assets/login_register.css';
import '../assets/navBar.css';
import {NavLink} from "react-router-dom";


const NavBar = () => {

    const [username, setUsername] = useState('')

    useEffect(() => {
        const getUsername = localStorage.getItem('username')
        if (getUsername){
            setUsername(getUsername)
        }
    }, []);

    return (
        <container>
                <nav >
                    <ul >
                        <div className='title-div'>
                            <li className='title'><a href="/">Rate My Build QR</a></li>
                        </div>

                        {username?(
                            <div className='nav-items-div'>
                                <li><NavLink style={{color:'blue'}}s to={`/${username}/cars`}>Cars</NavLink></li>
                                {/*<li><NavLink style={{color:'blue'}} to='/login'>Profile</NavLink></li>*/}
                                <li><NavLink style={{color:'red'}} to='/logout'>Logout</NavLink></li>
                            </div>
                        ) : (
                            <div className='nav-items-div'>
                                <li><NavLink to='/Register'>Register</NavLink></li>
                                <li><NavLink to='/login'>Login</NavLink></li>
                            </div>
                        )}


                    </ul>
                </nav>
        </container>
    );
};


export default NavBar;