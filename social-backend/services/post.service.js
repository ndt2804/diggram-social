import supabase from "../libs/supabase.js";

const uploadImage = async (buffer, originalname, mimetype) => {
    const filePath = `public/${originalname}`;
    const { data, error } = await supabase.storage
        .from('social')
        .upload(filePath, buffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: mimetype
        });

    if (error) {
        throw error;
    }

    const { data: urlData, error: urlError } = await supabase
        .storage
        .from('social')
        .getPublicUrl(filePath);

    if (urlError) {
        throw urlError;
    }
    return urlData.publicUrl;
};

export const createPost = async (userId, caption, imageFile) => {
    const { buffer, originalname, mimetype } = imageFile;
    const imageUrl = await uploadImage(buffer, originalname, mimetype);
    const { data, error } = await supabase
        .from('posts')
        .insert([
            { userId: userId, caption, imageUrl: imageUrl }
        ])
        .select("*");

    if (error) {
        throw error;
    }
    return data
};

export const getPost = async () => {
    const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select(`
            id,
            userId,
            caption,
            imageUrl,
            created_at,
            users (
                fullname,
                image_url
            ),
            comments (
                id,   
                userId,
                content,
                created_at,
                users (
                    fullname,
                    image_url
                ) 
            )
            `).order('created_at', { ascending: false });


    if (postsError) {
        console.error('Error fetching posts:', postsError);
    }
    return posts;
}
export const getPostOfUser = async (userId) => {
    const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select(`
            id,
            userId,
            caption,
            imageUrl,
            created_at,
            users (
                fullname,
                image_url
            ),
            comments (
                id,   
                userId,
                content,
                created_at,
                users (
                    fullname,
                    image_url
                ) 
            )
            `).eq('userId', userId).order('created_at', { ascending: false });


    if (postsError) {
        console.error('Error fetching posts:', postsError);
    }
    return posts;
}

export const getSinglePost = async (postId) => {
    const { data: posts, error: postsError } = await supabase
        .from('posts')

        .select(`
            id,
            userId,
            caption,
            imageUrl,
            created_at,
            users (
                fullname,
                image_url
            ),
            comments (
                id,   
                userId,
                content,
                created_at,
                users (
                    fullname,
                    image_url
                ) 
            ),
            likes (
                userId
            ),
            saved (
                userId
            )
            `).eq('id', postId)
        .single();
    if (postsError) {
        console.error('Error fetching posts:', postsError);
    }
    return posts;
}

export const updatePostService = async (postId, postData) => {
    const { data, error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', postId)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const createComment = async (postId, userId, content) => {
    const { data, error } = await supabase
        .from('comments')
        .insert([
            { postId: postId, userId: userId, content }
        ])
        .select("*");

    if (error) {
        throw error;
    }
    return data;
};
export const likePost = async (postId, userId) => {
    try {
        const { data: existingLike } = await supabase
            .from('likes')
            .select('id')
            .eq('postId', postId)
            .eq('userId', userId)
            .single();
        if (existingLike) {
            const { error: deleteError } = await supabase
                .from('likes')
                .delete()
                .eq('id', existingLike.id);

            if (deleteError) {
                throw deleteError;
            }
            return { action: 'unliked', message: 'Post unliked successfully' };
        } else {
            const { data, error } = await supabase
                .from('likes')
                .insert([{ postId, userId }])
                .select();

            if (error) {
                throw error;
            }
            return { action: 'liked', message: 'Post liked successfully', data };
        }
    } catch (error) {
        console.error('Error in likePost:', error);
        throw error;
    }
};

export const getSavedPost = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }

    const { data, error } = await supabase
        .from('saved')
        .select(`
            id,
            created_at,
            posts (
                id,
                userId,
                caption,
                imageUrl,
                created_at,
                users (
                    id,
                    fullname,
                    image_url
                )
            )
        `)
        .eq('userId', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching saved posts:', error);
        throw error;
    }

    return data;
}
export const savePost = async (postId, userId) => {
    try {
        const { data: existingSaved } = await supabase
            .from('saved')
            .select('id')
            .eq('postId', postId)
            .eq('userId', userId)
            .single();
        if (existingSaved) {
            const { error: deleteError } = await supabase
                .from('saved')
                .delete()
                .eq('id', existingSaved.id);

            if (deleteError) {
                throw deleteError;
            }
            return { action: 'unsaved', message: 'Post unsaved successfully' };
        } else {
            const { data, error } = await supabase
                .from('saved')
                .insert([{ postId, userId }])
                .select();

            if (error) {
                throw error;
            }
            return { action: 'saved', message: 'Post saved successfully', data };
        }
    } catch (error) {
        console.error('Error in savePost:', error);
        throw error;
    }
};

