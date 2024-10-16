import supabase from "../libs/supabase.js";
import { v4 as uuidv4 } from 'uuid';


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