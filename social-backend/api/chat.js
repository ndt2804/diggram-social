import { Router } from "express";
import { createChatController, getChatController, getMessagesController } from "../controllers/chat.controller.js";
import { auth } from '../middlewares/auth.js'

const chatRouter = Router();
chatRouter.post('/createChat', auth, createChatController);
chatRouter.get('/getChat', auth, getChatController);
chatRouter.get('/getMessages', auth, getMessagesController)
export default chatRouter;
