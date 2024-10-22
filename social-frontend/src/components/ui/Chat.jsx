import React, { useState, useRef, useEffect } from 'react';
const ChatArea = ({ chat, onSendMessage, toggleRightChat, selectedChat }) => {
    console.log('selectedContact in ChatArea:', selectedChat);
    console.log('chat in ChatArea:', chat);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [chat?.messages]);

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    if (!chat) {
        return <div className="flex-1 flex items-center justify-center">Select a chat or start a new one</div>;
    }

    return (
        <div className="flex-1 flex flex-col   bg-white">
            {/* <div className={`flex flex-col ${isRightChatVisible ? 'w-2/3' : 'w-full'}`}> */}
            <div className="p-4 border-b flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold">{chat.name}</h2>
                    {chat.isGroup && <p className="text-sm text-gray-500">{chat.members?.length || 0} members</p>}
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-400 cursor-pointer">🔍</span>
                    <span className="text-gray-400 cursor-pointer" onClick={() => {
                        console.log('Three dots clicked');
                        toggleRightChat();
                    }}>⋯</span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chat.messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            <p>{msg.text}</p>
                            <p className="text-xs text-gray-500 text-right mt-1">
                                {msg.timestamp || 'Time not available'}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
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
            {/* </div> */}
        </div>
    );
};

export default ChatArea;
