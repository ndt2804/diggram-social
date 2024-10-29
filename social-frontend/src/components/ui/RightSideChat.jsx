import React from 'react';

const RightChat = ({ selectedContact, onMute, onGoToProfile, onDeleteConversation }) => {
    console.log('RightChat rendering, selectedContact:', selectedContact);
    if (!selectedContact) {
        console.log('RightChat not rendering: selectedContact is null or undefined');
        return null;
    }
    return (
        <div className="w-1/3 border-l p-4 bg-red-200 border-4 border-red-500 overflow-y-auto">
            <div className="flex items-center mb-4">
                <img
                    src={selectedContact.image_url || 'default-avatar.png'}
                    alt={selectedContact.fullname}
                    className="w-16 h-16 rounded-full mr-4"
                />
                <h2 className="text-xl font-bold">{selectedContact.fullname}</h2>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold mb-2">Shared Files</h3>
                {/* Add logic to display shared files */}
                <p className="text-gray-500">No files shared yet</p>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold mb-2">Shared Images</h3>
                {/* Add logic to display shared images */}
                <p className="text-gray-500">No images shared yet</p>
            </div>

            <div className="mt-auto">
                <button
                    onClick={onMute}
                    className="w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded mb-2"
                >
                    Mute Conversation
                </button>
                <button
                    onClick={onGoToProfile}
                    className="w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded mb-2"
                >
                    Go to Profile
                </button>
                <button
                    onClick={onDeleteConversation}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                    Delete Conversation
                </button>
            </div>
        </div>
    );
};

export default RightChat;
