import React from 'react';
import { Link } from 'react-router-dom';
import PostStats from './PostStats.jsx';
import { useQuery } from '@tanstack/react-query';
import PostService from '../../services/post.sercive.js';
const PostCard = () => {
    const {
        data: posts,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['posts'],
        queryFn: PostService.getPost,
    });

    if (isLoading) return <div>Loading posts...</div>;
    if (isError) return <div>Error loading posts: {error.message}</div>;
    if (!posts || posts.length === 0) return <div>No posts available</div>;
    return (
        <>
            {posts.map(post => (
                <div key={post.id} className='post-card'>
                    <div className='flex-between'>
                        <div className='flex items-center gap-3'>
                            {post.creator && (
                                <Link to={`/profile/${post.creator.id}`}>
                                    <img
                                        src={post.creator.imageUrl || './assets/icons/profile-placeholder.svg'}
                                        alt='creator'
                                        className='rounded-full w-12 lg:h-12'
                                    />
                                </Link>
                            )}
                            <div className='flex flex-col'>
                                <p className='base-medium lg:body-bold text-light-1'>
                                    {post.creator?.name || 'Unknown Creator'}
                                </p>
                                <div className='flex-center gap-2 text-light-3'>
                                    <p className='subtle-semibold lg:small-regular'>
                                        {/* Add creation date if available */}
                                    </p>
                                    {post.location && (
                                        <>
                                            -
                                            <p className='subtle-semibold lg:small-regular'>
                                                {post.location}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to={`/posts/${post.id}`}>
                        <div className='small-medium lg:base-medium py-5'>
                            <p>{post.caption || 'No caption'}</p>
                            <ul className='flex gap-1 mt-2'>
                                {Array.isArray(post.tags) && post.tags.map((tag) => (
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
                    <PostStats post={post} />
                    <div className="w-full flex-col justify-start items-start lg:gap-9 gap-6 flex">
                        <div className="w-full relative flex justify-between gap-2">
                            <input type="text"
                                className=" rounded-3xl border  block mt-3.5 p-2 w-full text-sm text-gray-900 bg-white   border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write comments here...." />
                            <a href="" class="absolute right-6 top-[26px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                    fill="none">
                                    <path
                                        d="M11.3011 8.69906L8.17808 11.8221M8.62402 12.5909L8.79264 12.8821C10.3882 15.638 11.1859 17.016 12.2575 16.9068C13.3291 16.7977 13.8326 15.2871 14.8397 12.2661L16.2842 7.93238C17.2041 5.17273 17.6641 3.79291 16.9357 3.06455C16.2073 2.33619 14.8275 2.79613 12.0679 3.71601L7.73416 5.16058C4.71311 6.16759 3.20259 6.6711 3.09342 7.7427C2.98425 8.81431 4.36221 9.61207 7.11813 11.2076L7.40938 11.3762C7.79182 11.5976 7.98303 11.7083 8.13747 11.8628C8.29191 12.0172 8.40261 12.2084 8.62402 12.5909Z"
                                        stroke="#111827" stroke-width="1.6" stroke-linecap="round" />
                                </svg>
                            </a>
                            {/* <textarea id="chat" rows="1"
                                className=" rounded-3xl border  block mt-4 p-2 w-full text-sm text-gray-900 bg-white   border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                            <a href="" className="absolute right-6 top-[26px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                    fill="none">
                                    <path
                                        d="M11.3011 8.69906L8.17808 11.8221M8.62402 12.5909L8.79264 12.8821C10.3882 15.638 11.1859 17.016 12.2575 16.9068C13.3291 16.7977 13.8326 15.2871 14.8397 12.2661L16.2842 7.93238C17.2041 5.17273 17.6641 3.79291 16.9357 3.06455C16.2073 2.33619 14.8275 2.79613 12.0679 3.71601L7.73416 5.16058C4.71311 6.16759 3.20259 6.6711 3.09342 7.7427C2.98425 8.81431 4.36221 9.61207 7.11813 11.2076L7.40938 11.3762C7.79182 11.5976 7.98303 11.7083 8.13747 11.8628C8.29191 12.0172 8.40261 12.2084 8.62402 12.5909Z"
                                        stroke="#111827" stroke-width="1.6" stroke-linecap="round" />
                                </svg>
                            </a> */}
                        </div>
                    </div>


                </div>
            ))}
        </>
    );
};

export default PostCard;
