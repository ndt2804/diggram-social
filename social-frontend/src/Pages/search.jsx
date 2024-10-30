import React, { useState } from 'react';
import { useSearchUsers, useSuggestedUsers } from '../libs/react-query/react-query';

const SearchUser = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: suggestedUsers, isLoading: loadingSuggested } = useSuggestedUsers();
    const { data: searchResults, isLoading: loadingSearch } = useSearchUsers(searchTerm);

    // Tính toán trạng thái loading
    const isLoading = loadingSuggested || (searchTerm && loadingSearch);

    // Hàm render danh sách người dùng
    const renderUserList = (users, title) => (
        <div>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                        <img src={user.image_url} alt={user.fullname} className="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <h3 className="font-semibold">{user.fullname}</h3>
                            <p className="text-sm text-gray-500">@{user.username}</p>
                        </div>
                        <button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Search Users</h1>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search for users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {isLoading ? (
                    <p className="text-center">Loading...</p>
                ) : searchTerm ? (
                    renderUserList(searchResults || [], 'Search Results')
                ) : (
                    renderUserList(suggestedUsers || [], 'Suggested Users')
                )}
                {searchTerm && searchResults && searchResults.length === 0 && (
                    <p className="text-center text-gray-500">No users found</p>
                )}
            </div>
        </div>
    );
};

export default SearchUser;
