import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostStats from './PostStats.jsx';
import { useCreateComment } from '../../libs/react-query/react-query';
import { useUserContext } from '../../context/auth.context.jsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
const PostCard = ({ post, isDetailView = false }) => {
    const [content, setContent] = useState('');
    const [recentComment, setRecentComment] = useState(null);
    const [showAllComments, setShowAllComments] = useState(false);
    const { user } = useUserContext();
    const createCommentMutation = useCreateComment();
    const commentCount = post.comments ? post.comments.length : 0
    const handleCommentSubmit = async (postId) => {
        if (content.trim()) {
            const newComment = {
                id: Date.now(),
                content,
                userId: user.id,
                created_at: new Date().toISOString(),
                users: {
                    fullname: user.fullname,
                    image_url: user.image_url
                }
            };
            setRecentComment(newComment);
            createCommentMutation.mutate({
                postId,
                userId: user.id,
                content,
                userFullname: user.fullname,
                userImageUrl: user.image_url
            });
            setContent('');
        }
    };

    const renderComment = (comment) => (
        <div key={comment.id} className="w-full p-2 mt-4 flex-col justify-start items-start flex">
            <div className="w-full flex-col justify-center items-start gap-3.5 flex mb-2">
                <div className="w-full justify-between items-center inline-flex">
                    <div className="justify-start items-center gap-2.5 flex">
                        <div className="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                            <img className="rounded-full object-cover" src={comment.users.image_url || "https://pagedone.io/asset/uploads/1714988283.png"} alt="User image" />
                        </div>
                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                            <h5 className="text-gray-900 text-sm font-semibold leading-snug">{comment.users.fullname}</h5>
                            <h6 className="text-gray-500 text-xs font-normal leading-5">{dayjs(comment.created_at).fromNow()}</h6>
                        </div>
                    </div>
                </div>
                <p className="text-gray-800 text-sm font-normal leading-snug">{comment.content}</p>
            </div>
        </div>
    );
    const latestComments = post.comments ? post.comments.slice(-2).reverse() : [];

    return (
        <div className='post-card'>
            <div className='flex-between'>
                <div className='flex items-center gap-3'>
                    <Link to={`/profile/${post.userId}`}>
                        <img
                            src={post.users?.image_url || './assets/icons/profile-placeholder.svg'}
                            alt='creator'
                            className='rounded-full w-12 lg:h-12'
                        />
                    </Link>
                    <div className='flex flex-col'>
                        <p className='base-medium lg:body-bol'>
                            {post.users?.fullname || 'Unknown Creator'}
                        </p>
                        <div className='flex-center gap-2 text-light-3'>
                            <p className='subtle-semibold lg:small-regular'>
                                {dayjs(post.created_at).fromNow()}
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
                        {Array.isArray(post.tags) && post.tags.map((tag, index) => (
                            <li key={`${post.id}-tag-${index}`} className='text-light-3'>
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

            <div className='flex flex-col mt-2'>
                {isDetailView ? (
                    <>
                        <PostStats postId={post.id} />
                        {commentCount >= 2 && (
                            <button
                                onClick={() => setShowAllComments(!showAllComments)}
                                className="text-blue-500 hover:underline cursor-pointer mt-2"
                            >
                                {showAllComments ? 'Hide comments' : `See more comments`}
                            </button>
                        )}
                    </>
                ) : (
                    <PostStats postId={post.id} />
                )}
            </div>

            {/* Comments section */}
            {isDetailView && (
                <div className="comments-section mt-4">
                    {showAllComments ? (
                        <>
                            <h3 className="text-xl font-bold mb-4">All Comments</h3>
                            {post.comments && post.comments.map(renderComment)}
                        </>
                    ) : (
                        <>
                            <h3 className="text-xl font-bold mb-4">Latest Comments</h3>
                            {latestComments.map(renderComment)}
                        </>
                    )}
                </div>
            )}

            {!isDetailView && recentComment && renderComment(recentComment)}

            {/* Comment input */}
            <div className="w-full flex-col justify-start items-start lg:gap-9 gap-6 flex">
                <div className="w-full relative flex justify-between gap-2">
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="rounded-3xl border block mt-3.5 p-2 w-full text-sm text-gray-900 bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write comments here...."
                    />
                    <button
                        onClick={() => handleCommentSubmit(post.id)}
                        className="absolute right-6 top-[26px]"
                        disabled={createCommentMutation.isLoading}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M11.3011 8.69906L8.17808 11.8221M8.62402 12.5909L8.79264 12.8821C10.3882 15.638 11.1859 17.016 12.2575 16.9068C13.3291 16.7977 13.8326 15.2871 14.8397 12.2661L16.2842 7.93238C17.2041 5.17273 17.6641 3.79291 16.9357 3.06455C16.2073 2.33619 14.8275 2.79613 12.0679 3.71601L7.73416 5.16058C4.71311 6.16759 3.20259 6.6711 3.09342 7.7427C2.98425 8.81431 4.36221 9.61207 7.11813 11.2076L7.40938 11.3762C7.79182 11.5976 7.98303 11.7083 8.13747 11.8628C8.29191 12.0172 8.40261 12.2084 8.62402 12.5909Z" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
