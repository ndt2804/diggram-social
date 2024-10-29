import React, { useState } from 'react';
import { useCreateChat, useGetChats, useGetFriendUser } from '../../libs/react-query/react-query';
import ModalChat from './modal-chat';

const ContactList = ({ onSelect, onStartNewChat }) => {
    const { data: friends, isLoading, error } = useGetFriendUser();
    const { data: chats, isLoading: isChatsLoading } = useGetChats();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const { mutate: createChat } = useCreateChat();
    const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);


    const handleNewChat = () => {
        setIsNewChatModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsNewChatModalOpen(false);
    };

    const handleStartChat = (selectedUser, initialMessage) => {
        onStartNewChat(selectedUser, initialMessage);
        setIsNewChatModalOpen(false);
    };

    const filteredChats = chats?.filter(chat =>
        chat.fullname.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeTab === 'all' || (activeTab === 'group' && chat.isGroup))
    ) || [];


    return (
        <div className="w-1/4 border-r p-4 flex flex-col h-full">

            <div className="flex justify-between items-center mb-4 p-4">
                <h2 className="font-bold">Direct Messages</h2>
                <button
                    onClick={handleNewChat}

                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    New Chat
                </button>
            </div>
            {/* Search input */}
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded mb-4"
            />

            {/* Tabs */}
            <div className="flex mb-4">
                <button
                    className={`flex-1 py-2 ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('all')}
                >
                    All Chats
                </button>
                <button
                    className={`flex-1 py-2 ${activeTab === 'group' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('group')}
                >
                    Group Chats
                </button>
            </div>

            {/* Contact list */}
            <ul className="overflow-y-auto flex-grow">
                {isChatsLoading ? (
                    <li className="p-2">Loading chats...</li>
                ) : (
                    filteredChats.map((chat) => (
                        <li
                            key={chat.id}
                            onClick={() => onSelect(chat)}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {chat.fullname}
                            {chat.isGroup && <span className="ml-2 text-xs text-gray-500">(Group)</span>}
                        </li>
                    ))
                )}
            </ul>
            <ModalChat
                isOpen={isNewChatModalOpen}
                friends={friends}
                onClose={handleCloseModal}
                onStartChat={handleStartChat}
            />
        </div>
    );
};

export default ContactList;
