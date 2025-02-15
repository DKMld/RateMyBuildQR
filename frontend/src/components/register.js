import React, {use, useEffect, useState} from 'react';
import '../assets/login_register.css';
import {useNavigate} from "react-router-dom";


const Register = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const API_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.ratemybuildqr.com';

    const checkUserIsAuth = (userToken) => {
        if(userToken){
            navigate('/')
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        checkUserIsAuth(token)
    }, []);


    const handleRegister = async() => {
        const response = await fetch(`${API_URL}/api/register`, {

            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({username, password})
        })

        if (response.ok){
            setMessage(`Thank you for your registration ${username}`)
            navigate('/login')
        }else {
            setMessage('Registration failed!')
        }

    }

    return (
        <div className='center-login-form'>
                <div className="container">

                    <h2>Register</h2>

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
                        <button className='button-login-register' onClick={handleRegister}>Register</button>
                    </div>
                    <p className="redirect">
                        Already have an account? <a href='/frontend/src/components/login'>Login here</a>
                    </p>
                </div>
            </div>
            );
        };


            export default Register;




