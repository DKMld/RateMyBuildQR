import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from '../context/AuthContext';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const API_URL = "https://api.ratemybuildqr.com"

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
          logout();
          navigate('/');
          toast.success('You have successfully logged out. See you next time!');
        } else {
          toast.error('Oops! Something went wrong while logging out. Please try again later.');
        }
      }
    };

    handleLogout().then(() => {});
  }, [logout, navigate]);

  return null;
};

export default Logout;