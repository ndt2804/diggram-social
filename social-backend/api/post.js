import { Router } from "express";
import { handleCreatePost, handleGetPost, updatePostController } from "../controllers/post.controller.js";
import multer from 'multer';


const postRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
postRouter.post('/createPost', upload.single('image'), handleCreatePost);
postRouter.get("/getPosts", handleGetPost);
postRouter.put('/posts/:id', updatePostController);

export default postRouter;
