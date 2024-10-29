import { createChatService, getChatService, getMessagesServices } from "../services/chat.service.js";

export const createChatController = async (req, res) => {
    const { userId, friendId } = req.body;
    const chat = await createChatService(userId, friendId);
    res.status(200).json(chat);
};

export const getChatController = async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        const chat = await getChatService(userId);
        return res.status(200).json(chat);
    } catch (error) {
        console.error('Error fetching friends:', error);
        return res.status(500).json({ error: 'Failed to fetch friends' });
    }
};
export const getMessagesController = async (req, res) => {
    const chatId = req.query.chatId;
    try {
        const mess = await getMessagesServices(chatId);
        return res.status(200).json(mess);
    } catch (error) {
        console.error('Error fetching mess:', error);
        return res.status(500).json({ error: 'Failed to fetch mess' });
    }

}
