import { useContext, useState, useRef, useEffect } from 'react'
import { AuthContext } from '../../context/auth.context'
import FriendInfoBox from '../ui/FriendBox'

const RightSidebar = () => {
    const { friends } = useContext(AuthContext);
    console.log(friends);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [boxPosition, setBoxPosition] = useState({ top: 0, left: 0 });
    const sidebarRef = useRef(null);

    const handleFriendClick = (friend, event) => {
        const sidebarRect = sidebarRef.current.getBoundingClientRect();
        const clickPosition = event.clientY - sidebarRect.top;

        // Assume FriendInfoBox height is 400px (adjust as needed)
        const boxHeight = 400;
        const maxTop = sidebarRect.height - boxHeight;

        let topPosition = clickPosition - boxHeight / 2; // Center the box on click
        topPosition = Math.max(0, Math.min(topPosition, maxTop)); // Keep within bounds

        setBoxPosition({
            top: topPosition,
            left: -320, // Assuming the box width is 320px
        });
        setSelectedFriend(friend.user2);
    };

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

    if (friends.length === 0) {
        return <p className="p-4">Không có bạn bè nào để hiển thị.</p>;
    }

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
                    <ul className='flex flex-col gap-4'>
                        {friends.map((friend) => (
                            <li
                                key={friend.id}
                                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                                onClick={(event) => handleFriendClick(friend, event)}
                            >
                                <div className="relative">
                                    <img
                                        src={friend.user2.image_url || '/default-avatar.png'}
                                        alt={friend.user2.fullname}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${friend.user2.isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{friend.user2.fullname}</p>
                                    <p className="text-sm text-gray-500">{friend.user2.status || 'No status'}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default RightSidebar;