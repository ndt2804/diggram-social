import React, { createContext, useState, useContext, useEffect } from 'react';
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
    const [token, setToken] = useState(null);
    const [friends, setFriends] = useState([]);

    // Hàm đăng nhập
    const login = async (email, password) => {
        try {
            const response = await AuthService.login(email, password);

            // Thiết lập cookie đã được thực hiện trong AuthService.login
            // Không cần thiết phải thiết lập cookie ở đây nữa

            // Cập nhật state
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
            deleteCookie('accessToken');
            deleteCookie('refreshToken'); deleteCookie('user');

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
                setFriends(friendData);
                setUser(userData);
                setToken(getCookie('accessToken'));
            } catch (error) {
                // Xóa token nếu không thể lấy thông tin người dùng
                deleteCookie('accessToken');
                deleteCookie('refreshToken');
                deleteCookie('user');

            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, friends }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };