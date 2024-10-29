import { io } from 'socket.io-client';

// Create a new socket connection
const socket = io('http://localhost:2080'); // Replace with your server URL

// Optional: Set up any event listeners or emitters here
socket.on('connect', () => {
    console.log('Connected to server:', socket.id);
});

// Function to send messages
export const sendMessage = (message) => {
    socket.emit('send_message', message);
};

// Function to listen for messages
export const listenForMessages = (callback) => {
    socket.on('receive_message', (message) => {
        callback(message);
    });
};

// Export the socket instance if needed
export default socket;
