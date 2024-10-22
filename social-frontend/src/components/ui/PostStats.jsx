import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/auth.context';
import { useGetSinglePost, useLikePost, useSavePost } from '../../libs/react-query/react-query';


const PostStats = ({ postId }) => {
    const { user } = useUserContext();
    const { data: post, isLoading, error } = useGetSinglePost(postId);
    const commentCount = post?.comments ? post.comments.length : 0;
    const likedCount = post?.likes ? post.likes.length : 0;
    const [isLiked, setIsLiked] = useState(false);
    const { mutate: likePost } = useLikePost();
    const { mutate: savePost } = useSavePost();
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        if (post) {
            const likedByUser = post.likes?.some(like => like.userId === user.id);
            setIsLiked(likedByUser);
            const savedByUser = post.saved?.some(saved => saved.userId === user.id);
            setIsSaved(savedByUser);
        }
    }, [post, user.id]);

    const handleLike = async () => {
        try {
            const result = await likePost({ postId, userId: user.id });
            setIsLiked(result.action === 'liked');
        } catch (error) {
            console.error('Error liking/unliking post:', error);
        }
    };

    const handleSave = async () => {
        try {
            const result = await savePost({ postId, userId: user.id });
            setIsSaved(result.action === 'liked');
        } catch (error) {
            console.error('Error saved/save post:', error);
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
                    src={isLiked ? './assets/icons/hearted.svg' : './assets/icons/heart.svg'}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={(e) => handleLike(e)}
                    className="cursor-pointer"
                />
                <p className="text-sm lg:text-base">{likedCount}</p>
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
                    src={isSaved ? './assets/icons/save.svg' : './assets/icons/saved.svg'}
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
