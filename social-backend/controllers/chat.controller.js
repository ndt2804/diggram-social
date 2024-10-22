import { createChatService, getChatService } from "../services/chat.service.js";

export const createChatController = async (req, res) => {
    const { userId, friendId } = req.body;
    const chat = await createChatService(userId, friendId);
    res.status(200).json(chat);
};

export const getChatController = async (req, res) => {
    const userId = req.query.userId;
    const chat = await getChatService(userId);
    res.status(200).json(chat);
};
