import React, { useState, useEffect } from 'react';

const SavedItem = ({ item, onRemove }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            {item.type === 'image' && (
                <img src={item.content} alt={item.title} className="w-20 h-20 object-cover rounded mr-4" />
            )}
            <div className="flex-grow">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <p className="text-gray-400 text-xs mt-1">Saved on: {item.savedDate}</p>
            </div>
            <div className="flex flex-col items-end ml-4">
                <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    Remove
                </button>
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 mt-2"
                >
                    View
                </a>
            </div>
        </div>
    );
};

const Saved = () => {
    const [savedItems, setSavedItems] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // Fetch saved items when component mounts
        fetchSavedItems();
    }, []);

    const fetchSavedItems = async () => {
        // In a real application, this would be an API call to fetch the user's saved items
        const mockSavedItems = [
            { id: 1, type: 'post', title: 'Interesting Article', description: 'A fascinating read about...', savedDate: '2023-05-15', link: '#' },
            { id: 2, type: 'image', title: 'Beautiful Landscape', description: 'Scenic mountain view', content: 'https://source.unsplash.com/random/800x600?landscape', savedDate: '2023-05-14', link: '#' },
            { id: 3, type: 'link', title: 'Useful Resource', description: 'A great tool for developers', savedDate: '2023-05-13', link: 'https://example.com' },
            { id: 4, type: 'post', title: 'Tech News', description: 'Latest updates in the tech world', savedDate: '2023-05-12', link: '#' },
            { id: 5, type: 'image', title: 'Cute Cat', description: 'Adorable kitten picture', content: 'https://source.unsplash.com/random/800x600?cat', savedDate: '2023-05-11', link: '#' },
        ];
        setSavedItems(mockSavedItems);
    };

    const removeSavedItem = (id) => {
        // In a real application, you would also make an API call to remove the item from the user's saved items
        setSavedItems(savedItems.filter(item => item.id !== id));
    };

    const filteredItems = filter === 'all' ? savedItems : savedItems.filter(item => item.type === filter);

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
                <button
                    onClick={() => setFilter('link')}
                    className={`px-4 py-2 rounded ${filter === 'link' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Links
                </button>
            </div>
            <div className="space-y-4">
                {filteredItems.map(item => (
                    <SavedItem key={item.id} item={item} onRemove={removeSavedItem} />
                ))}
            </div>
            {filteredItems.length === 0 && (
                <p className="text-center text-gray-500 mt-8">No saved items found.</p>
            )}
        </div>
    );
};

export default Saved;