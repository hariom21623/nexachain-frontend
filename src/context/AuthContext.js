import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('nexa_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData, token) => {
        localStorage.setItem('nexa_token', token);
        localStorage.setItem('nexa_user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('nexa_token');
        localStorage.removeItem('nexa_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);