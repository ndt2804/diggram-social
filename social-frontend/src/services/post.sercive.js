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

const updatePost = async (postId, postData) => {
    try {
        const response = await axios.put(`${API_URL}posts/${postId}`, postData);
        return response.data;
    } catch (error) {
        console.error('Update Post failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const PostService = {
    getPost,
    updatePost,
};

export default PostService;