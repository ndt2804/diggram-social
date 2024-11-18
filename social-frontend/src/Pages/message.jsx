import React, { useState } from 'react';
import ContactList from '../components/ui/Contact';
import ChatArea from '../components/ui/Chat';
import RightChat from '../components/ui/RightSideChat';
function MessageComponent() {
    const [contacts, setContacts] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [isRightChatVisible, setIsRightChatVisible] = useState(false);

    const toggleRightChat = () => {
        setIsRightChatVisible(prev => !prev);
    };
    const handleSelectContact = (contact) => {
        setSelectedChat(contact);
    };

    const handleStartNewChat = (selectedUser, initialMessage) => {
        const newChat = {
            id: Date.now(),
            name: selectedUser.fullname,
            messages: [{ sender: 'user', text: initialMessage, timestamp: new Date().toLocaleTimeString() }]
        };
        setContacts(prevContacts => [newChat, ...prevContacts]);
        setSelectedChat(newChat);
    };
    const handleSendMessage = (message) => {
        if (selectedChat) {
            const newMessage = {
                sender: 'user',
                text: message,
                timestamp: new Date().toLocaleTimeString()
            };
            const updatedChat = {
                ...selectedChat,
                messages: [...selectedChat.messages, newMessage]
            };
            setSelectedChat(updatedChat);
            setContacts(prevContacts =>
                prevContacts.map(c => c.id === updatedChat.id ? updatedChat : c)
            );
        }
    };
    const handleMute = (chatId) => {
        // Implement mute logic
    };

    const handleGoToProfile = (userId) => {
        // Implement navigation to user profile
    };

    const handleDeleteConversation = (chatId) => {
        // Implement delete conversation logic
    };

    return (
        <div className="h-screen flex flex-1">
            <ContactList
                contacts={contacts}
                onSelect={handleSelectContact}
                onStartNewChat={handleStartNewChat}
            />
            <div className="flex-1 flex ">
                {selectedChat ? (
                    <ChatArea
                        chat={selectedChat}
                        onSendMessage={handleSendMessage}
                        toggleRightChat={toggleRightChat}
                        isRightChatVisible={isRightChatVisible}
                    />
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500 mx-auto">
                        Select a chat or start a new one
                    </div>
                )}
                {isRightChatVisible && selectedChat && (
                    <RightChat
                        selectedContact={selectedChat}
                        onClose={toggleRightChat}
                        onMute={handleMute}
                        onGoToProfile={handleGoToProfile}
                        onDeleteConversation={handleDeleteConversation}
                    />
                )}
            </div>
        </div>
    );
}

export default MessageComponent;
