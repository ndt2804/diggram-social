import axios from "axios";

const API_URL = "http://localhost:2080/api/v1/auth/";
const URL = "http://localhost:2080/api/v1/";

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

        const { accessToken, refreshToken, existingUser } = response.data;

        // Lưu token vào cookies
        setCookie('accessToken', accessToken, { expires: 1 }); // Thời gian sống 1 ngày
        setCookie('refreshToken', refreshToken, { expires: 7 }); // Thời gian sống 7 ngày
        setCookie('user', JSON.stringify(existingUser), { expires: 1 }); // Thời gian sống 1 ngày

        return { existingUser, accessToken, refreshToken };
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

const getFriendUser = async () => {
    try {
        const response = await axios.get(URL + "friends", { withCredentials: true }
        )
        return response.data;
    } catch (error) {
        console.error('Friends failed:', error.response ? error.response.data : error.message);
        throw error;
    }
}

const getUser = async (username) => {
    const response = await axios.get(URL + `user/${username}`);
    return response.data;
}
const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    getFriendUser,
    getUser,
};

export default AuthService;