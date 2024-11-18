import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetPostOfUser, useGetFriendUser, useGetUserByUsername } from '../libs/react-query/react-query';
import { useUserContext } from '../context/auth.context';

const favoriteImages = [
    'https://i.pinimg.com/originals/3d/54/a3/3d54a3afe927891ec41fec08f2c563d8.jpg',
    // ... other favorite images
];

const Me = () => {
    const { username } = useParams();
    const { data: friends, isLoading, error } = useGetFriendUser();
    const { user: currentUser } = useUserContext();
    const { data: profileUser, isLoading: isLoadingUser, isError: isErrorUser } = useGetUserByUsername(username);
    const { data: posts, isLoading: isLoadingPosts, isError: isErrorPosts } = useGetPostOfUser(profileUser?.id);
    const isExists = friends?.some(user => user.id === profileUser?.id);
    if (isLoading) return <div>Loading posts...</div>;
    if (error) return <div>Error loading posts</div>;
    if (isLoadingUser || isLoadingPosts) return <div>Loading...</div>;
    if (isErrorUser || isErrorPosts || !profileUser) return <div>Error loading profile or posts</div>;
    const isOwnProfile = currentUser && currentUser.username === profileUser.username;
    if (isLoadingPosts) return <div>Loading posts...</div>;
    if (isErrorPosts) return <div>Error loading posts</div>;

    return (
        <div className="bg-gray-100 p-4">
            <div className="w-2/3 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div
                    className="h-72 bg-gray-300 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${profileUser.background_profile || '/default-background.jpg'})`
                    }}
                >
                </div>
                <div className="relative -translate-y-16 text-center">
                    <img src={profileUser.image_url || '/default-avatar.png'}
                        alt="Avatar" className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto" />
                    <h2 className="mt-4 text-2xl font-semibold">{profileUser.fullname}</h2>
                    <p className="my-8 text-gray-600 italic">{profileUser.bio || "No bio available"}</p>


                    <div className="mt-2">
                        {isOwnProfile ? (
                            <>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Edit Profile</button>
                                <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded ml-2 hover:bg-gray-400">Settings</button>
                            </>
                        ) : (
                            <>
                                {
                                    isExists ? (
                                        <>

                                            <button className="bg-blue-500 text-white py-2 px-4 rounded ml-2 hover:bg-blue-600">Friends</button>

                                            {/* <FriendButton isFriend={isFriend} onUnfriend={handleUnfriend} /> */}
                                            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded ml-2 hover:bg-gray-400">Message</button>
                                        </>

                                    ) : (<>
                                        {/* <FriendButton isFriend={isFriend} onUnfriend={handleUnfriend} /> */}
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded ml-2 hover:bg-blue-600">Add Friend</button>
                                        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded ml-2 hover:bg-gray-400">Message</button>
                                    </>)
                                }

                            </>
                        )}
                    </div>
                    <div className="mt-4">
                        <span className="mx-4">Posts: {posts.length || 0}</span>
                        <span className="mx-4">Followers: {profileUser.followers_count || 0}</span>
                        <span className="mx-4">Following: {profileUser.following_count || 0}</span>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold">Ảnh yêu thích</h3>
                    <div className="flex space-x-2 overflow-x-auto">
                        {favoriteImages.map((img, index) => (
                            <div key={index} className="w-16 h-16 rounded-full overflow-hidden shadow-md">
                                <img src={img} alt={`Favorite ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 mt-4">
                    {posts.map((post) => (
                        <div key={post.id} className="overflow-hidden rounded-lg shadow-md">
                            <Link to={`/posts/${post.id}`}>
                                <img src={post.imageUrl} alt={`Post ${post.id}`} className="w-full h-full object-cover" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Me;
// const FriendButton = ({ isFriend, onUnfriend }) => {
//     const [showConfirm, setShowConfirm] = useState(false);

//     const handleUnfriend = () => {
//         onUnfriend(); // Gọi hàm hủy kết bạn
//         setShowConfirm(false); // Đóng hộp thoại sau khi hủy
//     };

//     return (
//         <div>
//             <button
//                 className="bg-blue-500 text-white py-2 px-4 rounded ml-2 hover:bg-blue-600"
//                 onClick={() => setShowConfirm(true)}
//             >
//                 {isFriend ? 'Friends' : 'Add Friend'}
//             </button>

//             {showConfirm && (
//                 <div className="confirm-box bg-white shadow-md p-4 rounded mt-2">
//                     <p>Bạn có chắc chắn muốn hủy kết bạn?</p>
//                     <button
//                         className="bg-gray-300 py-1 px-2 rounded hover:bg-red-600"
//                         onClick={handleUnfriend}
//                     >
//                         Hủy kết bạn
//                     </button>
//                     <button
//                         className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400 ml-2"
//                         onClick={() => setShowConfirm(false)}
//                     >
//                         Hủy
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };