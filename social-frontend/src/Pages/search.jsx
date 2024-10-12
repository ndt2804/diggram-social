import React, { useState, useEffect } from 'react';

const SearchUser = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch suggested users when component mounts
        fetchSuggestedUsers();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) {
                searchUsers(searchTerm);
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const fetchSuggestedUsers = async () => {
        // In a real application, replace this with an API call
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const mockSuggestedUsers = [
                { id: 1, name: 'John Doe', username: 'johndoe', avatar: 'https://via.placeholder.com/50' },
                { id: 2, name: 'Jane Smith', username: 'janesmith', avatar: 'https://via.placeholder.com/50' },
                { id: 3, name: 'Alice Johnson', username: 'alicej', avatar: 'https://via.placeholder.com/50' },
                { id: 4, name: 'Bob Wilson', username: 'bobwilson', avatar: 'https://via.placeholder.com/50' },
                { id: 5, name: 'Emma Brown', username: 'emmab', avatar: 'https://via.placeholder.com/50' },
            ];
            setSuggestedUsers(mockSuggestedUsers);
        } catch (error) {
            console.error('Error fetching suggested users:', error);
        }
    };

    const searchUsers = async (term) => {
        setIsLoading(true);
        // In a real application, replace this with an API call
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const mockResults = suggestedUsers.filter(user =>
                user.name.toLowerCase().includes(term.toLowerCase()) ||
                user.username.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(mockResults);
        } catch (error) {
            console.error('Error searching users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderUserList = (users, title) => (
        <div>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <h3 className="font-semibold">{user.name}</h3>
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
                    renderUserList(searchResults, 'Search Results')
                ) : (
                    renderUserList(suggestedUsers, 'Suggested Users')
                )}
                {searchTerm && searchResults.length === 0 && (
                    <p className="text-center text-gray-500">No users found</p>
                )}
            </div>
        </div>
    );
};

export default SearchUser;