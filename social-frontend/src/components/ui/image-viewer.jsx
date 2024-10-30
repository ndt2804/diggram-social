import React, { useState } from 'react';

const ImageViewer = ({ imageUrl, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <img src={imageUrl} alt="view" className="max-w-full max-h-full" />
            <button onClick={onClose} className="absolute top-4 right-4 text-white">
                X
            </button>
        </div>
    );
};

export default ImageViewer;
