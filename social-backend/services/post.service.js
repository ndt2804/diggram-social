import supabase from "../libs/supabase.js";

export const createPost = async ({ userId, caption, imageUrl, tags }) => {
    const { data, error } = await supabase
        .from('posts')
        .insert({
            userId: userId,
            caption,
            imageUrl: imageUrl,
            tags
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating post:', error);
        throw new Error('Failed to create post');
    }

    return data;
};
export const getPost = async () => {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
    if (error) {
        console.error('Error creating post:', error);
        throw new Error('Failed to create post');
    }

    return data;
};

export const updatePostService = async (postId, postData) => {
    const { data, error } = await supabase
        .from('posts') // Tên bảng trong Supabase
        .update(postData)
        .eq('id', postId)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};