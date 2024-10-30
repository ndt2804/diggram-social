import React, { useState, useRef, useEffect } from 'react';
import { useGetMessages } from '../../libs/react-query/react-query';
import { useUserContext } from '../../context/auth.context';
import socket from '../../libs/socket';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const ChatArea = ({ chat, toggleRightChat }) => {
    const { user } = useUserContext();
    console.log('user in chat', user);
    const [messages, setMessages] = useState([]);
    console.log(messages);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const { data, isLoading, error } = useGetMessages(chat.id);

    useEffect(() => {
        if (data) {
            setMessages(data);
            scrollToBottom();
        }
    }, [data]);

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            scrollToBottom();
        };

        socket.on('receive_message', handleReceiveMessage);
        return () => {
            socket.off('receive_message', handleReceiveMessage);
        };
    }, []);

    const handleSendMessage = () => {
        if (input.trim()) {
            const messageData = {
                chat_id: chat.id,
                sender_id: user.id,
                receiver_id: chat.userId,
                messages: input,
                created_at: new Date().toISOString()
            };
            socket.emit('send_message', messageData);
            setInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    if (isLoading) return <div>Loading messages...</div>;
    if (error) {
        console.error('Error fetching messages:', error);
        return <div>Error fetching messages.</div>;
    }
    if (!chat) {
        return <div className="flex-1 flex items-center justify-center">Select a chat or start a new one</div>;
    }

    return (
        <div className="flex-1 flex flex-col bg-white">
            <div className="p-4 border-b flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold">{chat.fullname}</h2>
                    {chat.isGroup && <p className="text-sm text-gray-500">{chat.members?.length || 0} members</p>}
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-400 cursor-pointer">🔍</span>
                    <span className="text-gray-400 cursor-pointer" onClick={toggleRightChat}>⋯</span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-lg max-w-xs ${msg.sender_id === user.id ? 'bg-blue-500' : 'bg-gray-100'}`}>
                            <p>{msg.messages}</p>
                            <p className="text-xs text-right mt-1">                              {dayjs(msg.created_at).fromNow()} </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type something..."
                        className="flex-1 p-2 border rounded"
                        onKeyPress={handleKeyPress}
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
