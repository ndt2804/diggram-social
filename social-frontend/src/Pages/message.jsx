import React, { useState } from 'react';
import ContactList from '../components/ui/Contact';
import ChatArea from '../components/ui/Chat';
import MessageInput from '../components/ui/ChatInput';
import RightChat from '../components/ui/RightSideChat';

function MessageComponent() {
    const [selectedContact, setSelectedContact] = useState(null);
    const [isRightChatVisible, setIsRightChatVisible] = useState(false);
    const [messages, setMessages] = useState([
        { text: 'Hey Amanda, are you around? 😏', isSentByCurrentUser: false, timestamp: '10:30 AM' },
        { text: 'Hey 👋 Whats up?', isSentByCurrentUser: true, timestamp: '10:32 AM' },
        { text: 'Do you mind sending me the brief for the new campaign? Ethan told me about it and I want to go over it with him.', isSentByCurrentUser: false, timestamp: '10:33 AM' },
        { text: 'Of course. I\'ll go through the specifics and get back to you shortly.', isSentByCurrentUser: true, timestamp: '10:35 AM' },
    ]);


    const contacts = [
        { id: 1, name: 'Ethan Anderson' },
        { id: 2, name: 'Noah Martinez' },
        { id: 3, name: 'Olivia Mitchell' },
        { id: 4, name: 'Ava Williams' },
        { id: 5, name: 'Liam Johnson' },
        { id: 6, name: 'Benjamin Parker' },
        { id: 7, name: 'Olivia Adams' },
        { id: 8, name: 'Sophie Jones' },
    ];

    const handleSendMessage = (message) => {
        setMessages([...messages, { text: message, isSentByCurrentUser: true }]);
    };

    const handleMute = () => {
        // Implement mute functionality
        console.log('Mute conversation');
    };

    const handleGoToProfile = () => {
        // Implement go to profile functionality
        console.log('Go to profile');
    };

    const handleDeleteConversation = () => {
        // Implement delete conversation functionality
        console.log('Delete conversation');
    };

    const toggleRightChat = () => {
        setIsRightChatVisible(!isRightChatVisible);
    };

    return (
        <div className="h-screen flex flex-1">
            <ContactList contacts={contacts} onSelect={setSelectedContact} />
            <div className="flex-1 flex flex-col">
                <ChatArea
                    messages={messages}
                    selectedContact={selectedContact}
                    onSelect={toggleRightChat}
                />
            </div>
            {isRightChatVisible && (
                <RightChat
                    selectedContact={selectedContact}
                    onMute={handleMute}
                    onGoToProfile={handleGoToProfile}
                    onDeleteConversation={handleDeleteConversation}
                />
            )}
        </div>
    );
}

export default MessageComponent;