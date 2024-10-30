import React, { useState, useEffect } from 'react';
import { useGetAllPosts } from '../libs/react-query/react-query';
import ImageViewer from '../components/ui/image-viewer';
const Explore = () => {
    const { data: posts, isLoading, isError } = useGetAllPosts();
    console.log(posts)
    if (isLoading) return <div>Loading posts...</div>;
    if (isError) return <div>Error fetching posts</div>;
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseViewer = () => {
        setSelectedImage(null);
    };
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Explore</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {posts.map((image) => (
                    <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-md">
                        <img
                            src={image.imageUrl}
                            alt={image.alt}
                            className="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out flex items-center justify-center">
                            <button
                                onClick={() => handleImageClick(image.imageUrl)}
                                className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300 ease-in-out">
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <ImageViewer imageUrl={selectedImage} onClose={handleCloseViewer} />
            )}
        </div>
    );
};

export default Explore;