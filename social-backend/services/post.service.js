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

