import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import FriendInfoBox from '../ui/FriendBox'
import { useGetFriendUser } from '../../libs/react-query/react-query'

const RightSidebar = () => {
    const { data: friends, isLoading, error } = useGetFriendUser();
    console.log(friends);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [boxPosition, setBoxPosition] = useState({ top: 0, left: 0 });
    const sidebarRef = useRef(null);

    const handleFriendClick = useCallback((friend, event) => {
        const sidebarRect = sidebarRef.current.getBoundingClientRect();
        const clickPosition = event.clientY - sidebarRect.top;

        const boxHeight = 400;
        const maxTop = sidebarRect.height - boxHeight;

        let topPosition = clickPosition - boxHeight / 2;
        topPosition = Math.max(0, Math.min(topPosition, maxTop));

        setBoxPosition({
            top: topPosition,
            left: -320,
        });
        setSelectedFriend(friend);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSelectedFriend(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const friendList = useMemo(() => {
        if (!friends || !Array.isArray(friends)) return null;
        return friends.map((friend) => {
            const key = friend.id || friend.friendshipId || `${friend.user1.id}-${friend.user2.id}`;
            const friendInfo = friend.user1 ? friend.user2 : friend;
            return (
                <li
                    key={key}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    onClick={(event) => handleFriendClick(friendInfo, event)}
                >
                    <div className="relative">
                        <img
                            src={friendInfo.image_url || '/default-avatar.png'}
                            alt={friendInfo.fullname}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${friendInfo.isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                    </div>
                    <div className="flex-1">
                        <p className="font-medium">{friendInfo.fullname}</p>
                        <p className="text-sm text-gray-500">{friendInfo.status || 'No status'}</p>
                    </div>
                </li>
            );
        });
    }, [friends, handleFriendClick]);

    return (
        <div className="relative flex">
            {selectedFriend && (
                <FriendInfoBox
                    friend={selectedFriend}
                    onClose={() => setSelectedFriend(null)}
                    style={{
                        position: 'absolute',
                        top: `${boxPosition.top}px`,
                        left: `${boxPosition.left}px`,
                    }}
                />
            )}
            <nav ref={sidebarRef} className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] border-r">
                <div className='flex flex-col gap-4'>
                    <h2 className="text-xl font-bold">Friends</h2>
                    {isLoading ? (
                        <p className="p-4">Loading friends...</p>
                    ) : error ? (
                        <p className="p-4 text-red-500">Error loading friends: {error.message}</p>
                    ) : !friendList || friendList.length === 0 ? (
                        <p className="p-4">Không có bạn bè nào để hiển thị.</p>
                    ) : (
                        <ul className='flex flex-col gap-4'>{friendList}</ul>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default RightSidebar;
