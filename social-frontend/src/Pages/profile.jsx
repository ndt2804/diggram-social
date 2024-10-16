import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useQuery } from '@tanstack/react-query';
import PostService from '../services/post.service';
import AuthService from '../services/auth.service';

const favoriteImages = [
    'https://i.pinimg.com/originals/3d/54/a3/3d54a3afe927891ec41fec08f2c563d8.jpg',
    // ... other favorite images
];

const Me = () => {
    const { user: currentUser } = useContext(AuthContext);
    const { username } = useParams();
    const { friends } = useContext(AuthContext);
    const {
        data: user,
        isLoading: isLoadingUser,
        isError: isErrorUser,
        error: userError
    } = useQuery({
        queryKey: ['user', username],
        queryFn: () => AuthService.getUser(username || currentUser.username),
        enabled: !!username || !!currentUser
    });

    const {
        data: posts,
        isLoading: isLoadingPosts,
        isError: isErrorPosts,
        error: postsError
    } = useQuery({
        queryKey: ['posts', username],
        queryFn: () => PostService.getPost(username || currentUser.username),
        enabled: !!username || !!currentUser
    });
    console.log(user);
    if (isLoadingUser || isLoadingPosts) return <div>Loading...</div>;
    if (isErrorUser) return <div>Error loading user: {userError.message}</div>;
    if (isErrorPosts) return <div>Error loading posts: {postsError.message}</div>;
    if (!user) return <div>User not found</div>;
    if (!posts || posts.length === 0) return <div>No posts available</div>;

    return (
        <div className="bg-gray-100 p-4">
            <div className="w-2/3 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div
                    className="h-72 bg-gray-300 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${user.background_profile || '/default-background.jpg'})`
                    }}
                >
                </div>
                <div className="relative -translate-y-16 text-center">
                    <img src={user.image_url || '/default-avatar.png'}
                        alt="Avatar" className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto" />
                    <h2 className="mt-4 text-2xl font-semibold">{user.fullname}</h2>
                    <p className="my-8 text-gray-600 italic">{user.bio || "No bio available"}</p>


                    <div className="mt-2">
                        {currentUser && currentUser.username === user.username && (
                            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded ml-2 hover:bg-gray-400">Edit Profile</button>
                        )}
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-2">Share Profile</button>
                    </div>
                    <div className="mt-4">
                        <span className="mx-4">Posts: {posts.length}</span>
                        <span className="mx-4">Followers: {user.followers_count || 0}</span>
                        <span className="mx-4">Friends: {friends.length}</span>
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
                            <Link to={`/post/${post.id}`}>
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