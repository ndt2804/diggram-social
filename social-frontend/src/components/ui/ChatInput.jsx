import React, { useState } from 'react';

const MessageInput = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <div className="border-t p-4 flex items-center">
            <input
                type="text"
                className="flex-1 p-2 border rounded-md"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md" onClick={handleSend}>
                Send
            </button>
        </div>
    );
};

export default MessageInput;
