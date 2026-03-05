import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_BASE_URL = "http://localhost:5150/api";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/auth/verify-me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.status === "success") {
                    setUser(response.data.data);
                } else {
                    handleLogout();
                }
            } catch (error) {
                console.error("Auth verification failed:", error);
                handleLogout(); // Clear invalid token
            } finally {
                setIsLoading(false);
            }
        };

        verifyUser();
    }, [token]);

    const handleLogin = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem("token", userToken);
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
