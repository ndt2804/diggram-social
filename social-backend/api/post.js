import { Router } from "express";
import { handleCreatePost, handleGetPost, updatePostController } from "../controllers/post.controller.js";



const postRouter = Router();

postRouter.post("/createPost", handleCreatePost);
postRouter.get("/getPosts", handleGetPost);
postRouter.put('/posts/:id', updatePostController);
export default postRouter;
