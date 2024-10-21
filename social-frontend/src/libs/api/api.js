import axios from "axios";

const API_URL = "http://localhost:2080/api/v1/";

export const axiosPrivate = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const refreshAccessToken = async () => {
    try {
        const response = await axios.post(`${API_URL}refresh-token`, {

        }, {
            withCredentials: true
        });
        return response.data.accessToken;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        throw error;
    }
};
// Thêm interceptor để xử lý token hết hạn
axiosPrivate.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            // Token hết hạn, thực hiện logout
            const newAccessToken = await refreshAccessToken();
            console.log("Token is Refreshed");
            setCookie('accessToken', newAccessToken, { expires: 1, path: '/', secure: true, sameSite: 'None' });
        }
        return Promise.reject(error);
    }
);

// ============================================================
// AUTH API
// ============================================================

export const createUserAccount = async ({ username, fullname, email, password }) => {
    try {
        const response = await axios.post(API_URL + "auth/register", {
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


export const signInAccount = async (email, password) => {
    try {
        const response = await axiosPrivate.post(`auth/login`, {
            email,
            password,
        });

        console.log(`Login response: ${JSON.stringify(response.data)}`);
        const { accessToken, refreshToken, existingUser } = response.data;
        setCookie('accessToken', accessToken, { expires: 1, path: '/', secure: true, sameSite: 'None' });
        setCookie('refreshToken', refreshToken, { expires: 7, path: '/', secure: true, sameSite: 'None' });
        setCookie('user', JSON.stringify(existingUser), { expires: 1, path: '/', secure: true, sameSite: 'None' });

        return { existingUser, accessToken, refreshToken };
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const signOutAccount = async () => {
    const user = await getCurrentUser();
    try {
        const response = await axiosPrivate.post(`auth/sign-out`, {
            userId: user.id,
        });
        console.log('Logout response:', response.data);
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        deleteCookie('user');
        return response.data;
    } catch (error) {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getCurrentUser = () => {
    const user = getCookie('user');
    return user ? JSON.parse(user) : null;
};


export const getUserByUsername = async (username) => {
    const response = await axiosPrivate.get(`user/${username}`);
    return response.data;
}

// ============================================================
// POST API
// ============================================================

export const getPost = async () => {
    try {
        const response = await axiosPrivate.get("getPosts");
        return response.data;
    } catch (error) {
        console.error('Get Posts failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getPostOfUser = async (userId) => {
    try {
        const response = await axiosPrivate.get(`${API_URL}posts/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Get Posts failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getSinglePost = async (postId) => {
    try {
        const response = await axiosPrivate.get(`${API_URL}posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Get Single Post failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createPost = async (userId, caption, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('caption', caption);
        if (imageFile) {
            formData.append('image', imageFile);
        }
        const response = await axiosPrivate.post(`${API_URL}createPost`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Create Post failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updatePost = async (postId, postData) => {
    try {
        const response = await axiosPrivate.put(`${API_URL}posts/${postId}`, postData);
        return response.data;
    } catch (error) {
        console.error('Update Post failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createComment = async (postId, userId, content) => {
    try {
        const response = await axiosPrivate.post(`${API_URL}comments`, { postId, userId, content });
        return response.data;
    } catch (error) {
        console.error('Create Comment failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// ============================================================
// FRIEND API
// ============================================================

export const getFriendUser = async () => {
    const userCookie = getCookie('user');
    const userId = JSON.parse(userCookie)?.id;
    try {
        const response = await axiosPrivate.get(`${API_URL}friends?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get friends:', error);
        throw error;
    }
};


// ============================================================
// COOKIE API
// ============================================================


export const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `expires=${date.toUTCString()};`;
    }
    document.cookie = `${name}=${value};${expires}path=/;SameSite=None;Secure`;
};

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

export const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=None;Secure`;
};