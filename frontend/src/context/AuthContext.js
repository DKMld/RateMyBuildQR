import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    const login = (token, username) => {
        setIsAuthenticated(true);
        setUsername(username);
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUsername('');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
