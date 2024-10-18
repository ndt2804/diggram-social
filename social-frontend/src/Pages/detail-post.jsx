import React from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/ui/PostCard';
import { useGetSinglePost } from '../libs/react-query/react-query';

const PostDetailPage = () => {
    const { postId } = useParams();
    const { data: post, isLoading, error } = useGetSinglePost(postId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading post</div>;

    return (

        <div className="mx-auto p-10">
            {post && <PostCard post={post} isDetailView={true} />}
        </div>
    );
};

export default PostDetailPage;
