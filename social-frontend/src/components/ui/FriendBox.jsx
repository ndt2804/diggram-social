import React from 'react';

const FriendInfoBox = ({ friend, onClose, style }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg w-80" style={style}>
            <div className="relative p-4 bg-yellow-100 rounded-t-lg">
                <img
                    src={friend.avatar || '/default-avatar.png'}
                    alt={friend.fullname}
                    className="w-20 h-20 rounded-full mx-auto mb-2"
                />
                <h2 className="text-xl font-bold text-center">{friend.fullname}</h2>
                <p className="text-sm text-center">{friend.status || 'No status'}</p>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    ✕
                </button>
            </div>
            <div className="p-4">
                <div className="flex justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Staff</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Admin</span>
                </div>
                <div className="flex justify-between mb-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Server Booster</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Member</span>
                </div>
                <input
                    type="text"
                    placeholder={`Message @${friend.fullname}...`}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="flex justify-around p-2 bg-gray-100 rounded-b-lg">
                <button className="text-2xl">🎁</button>
                <button className="text-2xl">GIF</button>
                <button className="text-2xl">📎</button>
                <button className="text-2xl">😊</button>
                <button className="text-2xl">⋯</button>
            </div>
        </div>
    );
};

export default FriendInfoBox;