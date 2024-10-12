import React, { useState, useEffect } from 'react';

const Explore = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        // In a real application, replace this with an API call to fetch images
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockImages = [
                { id: 1, url: 'https://www.stylecraze.com/wp-content/uploads/2013/05/21-Most-Beautiful-Asian-Women.jpg', alt: 'Random image 1' },
                { id: 2, url: 'https://www.stylecraze.com/wp-content/uploads/2013/05/21-Most-Beautiful-Asian-Women.jpg', alt: 'Random image 2' },
                { id: 3, url: 'https://www.stylecraze.com/wp-content/uploads/2013/05/21-Most-Beautiful-Asian-Women.jpg', alt: 'Random image 3' },
                { id: 4, url: 'https://www.stylecraze.com/wp-content/uploads/2013/05/21-Most-Beautiful-Asian-Women.jpg', alt: 'Random image 4' },
                { id: 5, url: 'https://www.stylecraze.com/wp-content/uploads/2013/05/21-Most-Beautiful-Asian-Women.jpg', alt: 'Random image 5' },
                { id: 6, url: 'https://www.stylecraze.com/wp-content/uploads/2013/05/21-Most-Beautiful-Asian-Women.jpg', alt: 'Random image 6' },
                { id: 7, url: 'https://www.stylecraze.com/wp-content/uploads/2013/05/21-Most-Beautiful-Asian-Women.jpg', alt: 'Random image 7' },
                { id: 8, url: 'https://www.stylecraze.com/wp-content/uploads/2013/05/21-Most-Beautiful-Asian-Women.jpg', alt: 'Random image 8' },
                { id: 9, url: 'https://www.stylecraze.com/wp-content/uploads/2013/05/21-Most-Beautiful-Asian-Women.jpg', alt: 'Random image 9' },
            ];
            setImages(mockImages);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching images:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Explore</h1>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl">Loading...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image) => (
                        <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-md">
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out flex items-center justify-center">
                                <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300 ease-in-out">
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Explore;