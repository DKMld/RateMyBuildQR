import React, {useEffect, useState} from 'react';
import '../assets/login_register.css';
import {useNavigate} from "react-router-dom";


const Login= () => {

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



    const handleLogin = async() => {

        const response = await fetch(`${API_URL}api/login`, {

            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:
                JSON.stringify({username, password}),
        })

        const data = await response.json()

        if (response.ok){
            setMessage(`Logged In ${username}`)
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            navigate('/')

        }else {
            setMessage('Login failed!')
        }

    }

    return (
            <div className='center-login-form'>

                <div className="container">
                    <h2>Login</h2>
                    {/*<h1>{responseData}</h1>*/}
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
                    <p className="redirect">
                        Don't have an account? <a href='/register'>Register Here</a>
                    </p>
                </div>
            </div>
    );
};


export default Login;
