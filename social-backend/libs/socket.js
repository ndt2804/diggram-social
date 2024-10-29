import { Server } from "socket.io";
import supabase from "./supabase.js";
const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:5173', // Adjust as necessary
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Listen for the 'send_message' event
        socket.on('send_message', async (data) => {
            await handleSendMessage(data, io);
        });

        // Handle user disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });

    return io;
};
const handleSendMessage = async (data, io) => {
    const { sender_id, receiver_id, chat_id, messages } = data;

    // Insert the message into Supabase
    const { error } = await supabase
        .from('messages')
        .insert([{ sender_id: sender_id, receiver_id: receiver_id, chat_id: chat_id, messages: messages }]);

    if (error) {
        console.error('Error inserting message:', error);
        return;
    }

    // Broadcast message to all clients
    io.emit('receive_message', data);
};

export default initSocket;
