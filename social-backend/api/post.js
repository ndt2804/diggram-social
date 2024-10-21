import { Router } from "express";
import { handleCreatePost, handleGetPost, updatePostController, handleCreateComment, handleGetSinglePost, handleGetPostOfUser } from "../controllers/post.controller.js";
import multer from 'multer';


const postRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
postRouter.post('/createPost', upload.single('image'), handleCreatePost);
postRouter.get("/getPosts", handleGetPost);
postRouter.get('/posts/:id', handleGetSinglePost);
postRouter.get('/posts/user/:userId', handleGetPostOfUser);
postRouter.put('/posts/:id', updatePostController);
postRouter.post('/comments', handleCreateComment);
export default postRouter;
