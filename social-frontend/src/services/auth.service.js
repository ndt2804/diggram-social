import axios from "axios";

const API_URL = "http://localhost:2080/api/v1/auth/";

const register = async ({ username, fullname, email, password }) => {
    try {
        const response = await axios.post(API_URL + "register", {
            username,
            fullname,
            email,
            password,
        });
        console.log('Register response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Register failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};
const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `expires=${date.toUTCString()};`;
    }
    // Thiết lập cookie với thuộc tính SameSite
    document.cookie = `${name}=${value};${expires}path=/;SameSite=None;Secure`;
};

// Hàm lấy cookie
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

// Hàm xóa cookie
const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=None;Secure`;
};

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL + "login", {
            email,
            password,
        })
        console.log(`Login response: ${JSON.stringify(response.data)}`);
        if (response.data.accessToken && response.data.refreshToken) {
            setCookie('accessToken', response.data.accessToken, 1); // Lưu accessToken
            setCookie('refreshToken', response.data.refreshToken, 7); // Lưu refreshToken với thời gian sống dài hơn nếu cần
            setCookie('user', JSON.stringify(response.data.existingUser), 1); // Lưu thông tin người dùng
            console.log("User logged in successfully");
        }

        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};
const logout = async () => {
    // Xóa cookie
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    deleteCookie('user');

    try {
        const response = await axios.post(API_URL + 'signout');
        console.log('Logout response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Hàm lấy người dùng hiện tại từ cookie
const getCurrentUser = () => {
    const user = getCookie('user');
    return user ? JSON.parse(user) : null;
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;