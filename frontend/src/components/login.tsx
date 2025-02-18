import React, {useEffect, useState} from 'react';
import '../assets/login_register.css';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import { useAuth } from '../context/AuthContext';


const Login= () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const API_URL = "https://api.ratemybuildqr.com"

    const { login } = useAuth();

    const checkUserIsAuth = (userToken) => {
        if(userToken){
            navigate('/')
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        checkUserIsAuth(token)
    }, []);


    const handleLogin = async() => {

        const response = await fetch(`${API_URL}/api/login`, {

            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:
                JSON.stringify({username, password}),
        })

        const data = await response.json()

        if (response.ok){
            login(data.token, data.username);
            navigate('/')
            toast.success('Welcome back! You\'ve successfully logged in.')
        }else {
            toast.error('Invalid credentials. Please ensure your username and password are correct.')
        }

    }

    return (
            <div className='center-login-form'>

                <div className="container">
                    <div className='login-register-label-div'>
                        <h2 className='login-register-label'>Login</h2>
                    </div>
                    <div className='login-register-input-group-div'>

                        <div className="input-group">
                            <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                                <button className='button-login-register' onClick={handleLogin}>Log In</button>
                        </div>
                    </div>

                    <p className="redirect">
                        Don't have an account? <a href='/register'>Register Here</a>
                    </p>
                </div>
            </div>
    );
};


export default Login;
