import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";


const Logout= () => {

    const navigate = useNavigate()

    const API_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.ratemybuildqr.com';

    useEffect(() => {
        const handleLogout = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await fetch(`${API_URL}/api/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                });


                if (response.ok) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('username')

                    navigate('/');

                } else {
                    console.error('Logout failed')
                }
            }
        };

        handleLogout().then(r => {});

    }, [navigate]);

    return null;
};

export default Logout;