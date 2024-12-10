import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check session on mount
    useEffect(() => {
        const session = localStorage.getItem('authSession');
        if (session) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem('authSession', 'active'); // Simulate session
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('authSession'); // Destroy session
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
