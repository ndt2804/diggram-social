import React, { useState, useMemo } from 'react';
function ModalChat({ isOpen, onClose, onStartChat, friends, isLoading, error }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [initialMessage, setInitialMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredFriends = useMemo(() => {
        if (!friends) return [];
        return friends.filter(friend =>
            friend.fullname.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [friends, searchQuery]);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setSearchQuery(user.fullname);
        setIsDropdownOpen(false);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setIsDropdownOpen(value.length > 0);
        if (value.length === 0) {
            setSelectedUser(null);
        }
    };

    const handleInputFocus = () => {
        if (searchQuery.length > 0 && !selectedUser) {
            setIsDropdownOpen(true);
        }
    };

    const handleStartChat = () => {
        if (selectedUser && initialMessage.trim()) {
            onStartChat(selectedUser, initialMessage);
            handleClose();
        }
    };

    const handleClose = () => {
        setSearchQuery('');
        setInitialMessage('');
        setSelectedUser(null);
        setIsDropdownOpen(false);
        onClose();
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg shadow-xl w-96 max-h-[80vh] flex flex-col">
                <h3 className="text-xl font-bold mb-4">Start New Chat</h3>
                <div className="flex-grow flex flex-col">
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Search for a user"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={handleInputFocus}
                            className="w-full p-2 border rounded"
                        />
                        {isDropdownOpen && (
                            <div className="absolute left-0 right-0 top-full mt-1 bg-white border rounded shadow-lg z-10 max-h-60 overflow-y-auto w-full">
                                {isLoading && <div className="p-3 text-gray-600">Loading...</div>}
                                {error && <div className="p-3 text-red-500">{error.message}</div>}
                                {!isLoading && !error && filteredFriends.length === 0 && (
                                    <div className="p-3 text-gray-500">No users found</div>
                                )}
                                {!isLoading && !error && filteredFriends.map(friend => (
                                    <div
                                        key={friend.id}
                                        className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 w-full text-left"
                                        onClick={() => handleSelectUser(friend)}
                                    >
                                        {friend.fullname}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <textarea
                        placeholder="Type your first message"
                        value={initialMessage}
                        onChange={(e) => setInitialMessage(e.target.value)}
                        className="w-full p-2 border rounded mb-4 flex-grow"
                        rows="3"
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={handleClose}
                            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleStartChat}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            disabled={!selectedUser || !initialMessage.trim()}
                        >
                            Start Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalChat;
