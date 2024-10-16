import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/auth.service';

// Tạo AuthContext
const AuthContext = createContext();

// Hàm để đọc cookie
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

// Hàm để xóa cookie
const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=None;Secure`;
};

// Cung cấp AuthContext cho các component con
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(getCookie('accessToken'));
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hàm đăng nhập
    const login = async (email, password) => {
        try {
            const response = await AuthService.login(email, password);
            const { existingUser, accessToken } = response;
            setUser(existingUser);
            setToken(accessToken);
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    // Hàm đăng xuất
    const logout = async () => {
        try {
            await AuthService.logout();
            setUser(null);
            setToken(null);
            setFriends([]);
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            deleteCookie('user');
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    // Hàm kiểm tra trạng thái xác thực khi component mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const [userData, friendData] = await Promise.all([
                    AuthService.getCurrentUser(),
                    AuthService.getFriendUser()
                ]);
                setUser(userData);
                setFriends(friendData);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, friends }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
