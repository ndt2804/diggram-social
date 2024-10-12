import React, { useState } from 'react';

const ChatArea = ({ messages, selectedContact }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        // Implement send message functionality here
        console.log('Sending message:', message);
        setMessage('');
    };

    return (
        <div className="flex-1 flex flex-col bg-white">
            <div className="p-4 border-b flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold">{selectedContact?.name || 'Marketing department'}</h2>
                    <p className="text-sm text-gray-500">11 members</p>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-400 cursor-pointer">🔍</span>
                    <span className="text-gray-400 cursor-pointer">⋯</span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isSentByCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-lg max-w-xs ${msg.isSentByCurrentUser ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            <p>{msg.text}</p>
                            <p className="text-xs text-gray-500 text-right mt-1">
                                {msg.timestamp || 'Time not available'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type something..."
                        className="flex-1 p-2 border rounded"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button className="p-2 bg-gray-100 rounded"><span className="text-gray-400">📎</span></button>
                    <button className="p-2 bg-gray-100 rounded"><span className="text-gray-400">😊</span></button>
                    <button onClick={handleSendMessage} className="p-2 bg-black text-white rounded"><span>➤</span></button>
                </div>
            </div>
        </div>
    );
};

export default ChatArea;