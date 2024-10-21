import React, { useState, useContext } from 'react';
import PostService from '../services/post.service';

const CreatePost = () => {
    // const { user } = useContext(AuthContext);
    // const [content, setContent] = useState('');
    // const [images, setImages] = useState([]);

    // const handleImageChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     const newImages = files.map(file => ({
    //         file,
    //         preview: URL.createObjectURL(file)
    //     }));
    //     setImages(prevImages => [...prevImages, ...newImages]);
    // };

    // const removeImage = (index) => {
    //     setImages(prevImages => prevImages.filter((_, i) => i !== index));
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const imageFile = images.length > 0 ? images[0].file : null;
    //     try {
    //         const res = await PostService.createPost(user.id, content, imageFile);
    //         setContent('');
    //         setImages([]);
    //         alert('Post created successfully!');
    //     } catch (error) {
    //         console.error('Error creating post:', error);
    //         alert('Failed to create post');
    //     }
    // };

    const renderPreviewImages = () => {
        const imageCount = images.length;
        const displayImages = images.slice(0, 4);

        return (
            <div className={`grid ${imageCount > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
                {displayImages.map((img, index) => (
                    <div key={index} className="relative">
                        <img src={img.preview} alt={`Preview ${index}`} className="w-full h-40 object-cover rounded" />
                        {index === 3 && imageCount > 4 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                                <span className="text-white text-2xl font-bold">+{imageCount - 4}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <form onSubmit={handleSubmit} className="flex-1">
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="6"
                            required
                            placeholder="What's on your mind?"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="images" className="block text-gray-700 font-bold mb-2">Images</label>
                        <input
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                        {images.map((img, index) => (
                            <div key={index} className="relative">
                                <img src={img.preview} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Create Post
                    </button>
                </form>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">Preview</h2>
                    <div className="border border-gray-300 rounded-md p-4">
                        <div className="flex items-center mb-4">
                            <img src={user.image_url || '/default-avatar.png'} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                            <span className="font-semibold">{user.fullname}</span>
                        </div>
                        <p className="mb-4 whitespace-pre-wrap">{content || 'Your content will appear here...'}</p>
                        {renderPreviewImages()}
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default CreatePost;
