import { Server } from "socket.io";
import supabase from "./supabase.js";
const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        socket.on('send_message', async (data) => {
            await handleSendMessage(data, io);
        });
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
        socket.on('receive_message', (data) => {
            console.log('New message received:', data);
        });
    });

    return io;
};
const handleSendMessage = async (data, io) => {
    const { sender_id, receiver_id, chat_id, messages } = data;
    const { error } = await supabase
        .from('messages')
        .insert([{ sender_id: sender_id, receiver_id: receiver_id, chat_id: chat_id, messages: messages }]);
    if (error) {
        console.error('Error inserting message:', error);
        return;
    }
    io.emit('receive_message', data);
};

export default initSocket;
