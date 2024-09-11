import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    if (!post.creator) return null;

    return (
        <div className='post-card'>
            <div className='flex-between'>
                <div className='flex items-center gap-3'>
                    <Link to={`profile/${post.creator.id}`}>
                        <img
                            src={post.creator.imageUrl || './assets/icons/profile-placeholder.svg'}
                            alt='creator'
                            className='rounded-full w-12 lg:h-12'
                        />
                    </Link>
                    <div className='flex flex-col'>
                        <p className='base-medium lg:body-bold text-light-1'>
                            {post.creator.name}
                        </p>
                        <div className='flex-center gap-2 text-light-3'>
                            <p className='subtle-semibold lg:small-regular'>
                            </p>
                            -
                            <p className='subtle-semibold lg:small-regular'>
                                {post.location}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Link to={`/posts/${post.id}`}>
                <div className='small-medium lg:base-medium py-5'>
                    <p>{post.caption}</p>
                    <ul className='flex gap-1 mt-2'>
                        {post.tags.map((tag) => (
                            <li key={tag} className='text-light-3'>
                                #{tag}
                            </li>
                        ))}
                    </ul>
                </div>

                <img
                    src={post.imageUrl || './assets/icons/profile-placeholder.svg'}
                    alt='post image'
                    className='post-card_img'
                />
            </Link>

            {/* Đảm bảo bạn có component PostStats hoặc điều chỉnh theo nhu cầu */}
        </div>
    );
};

export default PostCard;
