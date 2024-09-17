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
        const { userId, caption, imageUrl, tags } = req.body;

        if (!userId || !caption || !imageUrl) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newPost = await createPost({ userId, caption, imageUrl, tags });

        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error in handleCreatePost:', error);
        res.status(500).json({ error: 'Internal server error' });
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