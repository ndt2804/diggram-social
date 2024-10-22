import React, { useState } from 'react';
import { useGetSavedPost } from '../libs/react-query/react-query';
import { useUserContext } from '../context/auth.context';

const SavedItem = ({ item, onRemove }) => {
    const post = item.posts;
    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            {post.imageUrl && (
                <img src={post.imageUrl} alt={post.caption} className="w-20 h-20 object-cover rounded mr-4" />
            )}
            <div className="flex-grow">
                <h3 className="font-semibold text-lg">{post.caption}</h3>
                <p className="text-gray-600 text-sm">Posted by: {post.users.fullname}</p>
                <p className="text-gray-400 text-xs mt-1">Saved on: {new Date(item.created_at).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col items-end ml-4">
                <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    Remove
                </button>
                <a
                    href={`/post/${post.id}`}
                    className="text-blue-500 hover:text-blue-700 mt-2"
                >
                    View
                </a>
            </div>
        </div>
    );
};

const Saved = () => {
    const { user } = useUserContext();
    const [filter, setFilter] = useState('all');

    const { data: savedPosts, isLoading, error } = useGetSavedPost(user?.id);

    if (!user) return <div>Please log in to view saved posts.</div>;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const removeSavedItem = (id) => {
        console.log(`Remove item with id: ${id}`);
    };

    const filteredItems = filter === 'all' ? savedPosts : savedPosts.filter(item => item.posts.type === filter);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Saved Items</h1>
            <div className="mb-6 flex space-x-4">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter('post')}
                    className={`px-4 py-2 rounded ${filter === 'post' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Posts
                </button>
                <button
                    onClick={() => setFilter('image')}
                    className={`px-4 py-2 rounded ${filter === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Images
                </button>
            </div>
            <div className="space-y-4">
                {filteredItems && filteredItems.map(item => (
                    <SavedItem key={item.id} item={item} onRemove={removeSavedItem} />
                ))}
            </div>
            {(!filteredItems || filteredItems.length === 0) && (
                <p className="text-center text-gray-500 mt-8">No saved items found.</p>
            )}
        </div>
    );
};

export default Saved;
