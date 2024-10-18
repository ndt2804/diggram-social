import React from 'react';

import PostCard from "../components/ui/PostCard"
import { useGetAllPosts } from '../libs/react-query/react-query'

const Home = () => {
    const { data: posts, isLoading, isError } = useGetAllPosts();
    console.log(posts);
    if (isLoading) return <div>Loading posts...</div>;
    if (isError) return <div>Error fetching posts</div>;
    return (
        <div className='flex flex-1'>
            <div className='home-container'>
                <div className='home-posts'>
                    <h2 className='h3-bold md:h2-bold text-left w-full'>Home feed</h2>
                    <ul className='flex flex-col flex-1 gap-9 w-full'>
                        {posts && posts.map(post => (
                            <PostCard key={post.$id || post.id} post={post} />
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Home