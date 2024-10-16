import { createPost, getPost, updatePostService } from '../services/post.service.js';

export const updatePostController = async (req, res) => {
    const { id } = req.params;
    const postData = req.body;

    try {
        const updatedPost = await updatePostService(id, postData);
        if (updatedPost) {
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const handleCreatePost = async (req, res) => {
    try {
        const { userId, caption } = req.body;
        const imageFile = req.file;
        const post = await createPost(userId, caption, imageFile);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export async function handleGetPost(req, res) {
    try {
        const posts = await getPost();
        res.status(201).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Get  friend failed" });
    }
}