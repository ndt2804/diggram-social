import React from 'react';
import { Link } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import PostService from '../../services/post.service';
import { useGetSinglePost } from '../../libs/react-query/react-query';
const PostStats = ({ postId }) => {
    const queryClient = useQueryClient();
    const { data: post, isLoading, error } = useGetSinglePost(postId);
    const commentCount = post?.comments ? post.comments.length : 0;

    const mutation = useMutation({
        mutationFn: PostService.updatePost,
        onSuccess: () => {
            // Invalidates the queries to refresh data
            queryClient.invalidateQueries(['post', postId]);
        },
    });

    // Xử lý khi nhấn nút Like
    const handleLike = () => {
        if (post) {
            mutation.mutate({ ...post, likes: post.likes + 1 });
        }
    };

    // Xử lý khi nhấn nút Save
    const handleSave = () => {
        if (post) {
            mutation.mutate({ ...post, saved: !post.saved });
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    const containerStyles = location.pathname.startsWith("/profile")
        ? "w-full"
        : "";
    return (
        <div className={`flex justify-between items-center z-20 ${containerStyles}`}>
            <div className="flex items-center gap-2">
                <img
                    // src={checkIsLiked(post.likes, userId)
                    //     ? './assets/icons/heart.svg'
                    //     : './assets/icons/hearted.svg'}

                    src='./assets/icons/heart.svg'
                    alt="like"
                    width={20}
                    height={20}
                    onClick={(e) => handleLike(e)}
                    className="cursor-pointer"
                />
                <p className="text-sm lg:text-base">{post.likes}</p>
                <Link to={`/posts/${post.id}`}>
                    <img
                        src='./assets/icons/comment.svg'
                        alt="Comment"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                    />
                </Link>

                <span className="text-sm lg:text-base">{commentCount}</span>
            </div>
            <div className="flex items-center gap-2">
                <img
                    // src={post.saved ? './assets/icons/saved.svg' : './assets/icons/save.svg'}
                    src='./assets/icons/saved.svg'

                    alt="Save"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={(e) => handleSave(e)}
                />
            </div>

        </div>

    );
};

export default PostStats;
