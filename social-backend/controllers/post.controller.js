import {
    createPost,
    getPost,
    updatePostService,
    createComment,
    getSinglePost,
    getPostOfUser,
    likePost,
    savePost,
    getSavedPost,
} from '../services/post.service.js';

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

export const handleGetPostOfUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await getPostOfUser(userId);
        res.status(201).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Get post of user failed" });
    }
}

export const handleGetSinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await getSinglePost(id);
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Get single post failed" });
    }
}

export const handleCreateComment = async (req, res) => {
    try {
        const { postId, userId, content } = req.body;
        const comment = await createComment(postId, userId, content);
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Get  friend failed" });
    } 12
}

export const handleLikePost = async (req, res) => {
    const { postId, userId } = req.body;
    const post = await likePost(postId, userId);
    res.status(201).json(post);
}
export const handleGetSavedPost = async (req, res) => {
    const { userId } = req.params;
    const posts = await getSavedPost(userId);
    res.status(201).json(posts);
}

export const handleSavePost = async (req, res) => {
    const { postId, userId } = req.body;
    const post = await savePost(postId, userId);
    res.status(201).json(post);
}
