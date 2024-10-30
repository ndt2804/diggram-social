import axios from "axios";

const API_URL = "http://localhost:2080/api/v1/";


const getPost = async () => {
    try {
        const response = await axios.get(API_URL + "getPosts", {
        });
        return response.data;
    } catch (error) {
        console.error('Get Posts failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const createPost = async (userId, caption, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('caption', caption);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        console.log('Sending data:', {
            userId,
            caption,
            imageFile: imageFile ? imageFile.name : 'No file',
        });
        const response = await axios.post(`${API_URL}createPost`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Create Post failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};


const updatePost = async (postId, postData) => {
    try {
        const response = await axios.put(`${API_URL}posts/${postId}`, postData);
        return response.data;
    } catch (error) {
        console.error('Update Post failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const createComment = async (postId, userId, content) => {
    try {
        const response = await axios.post(`${API_URL}comments`, { postId, userId, content });
        return response.data;
    } catch (error) {
        console.error('Create Comment failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const PostService = {
    getPost,
    updatePost,
    createPost,
    createComment
};

export default PostService;