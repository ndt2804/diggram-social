import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import {
    createUserAccount,
    signInAccount,
    signOutAccount,
    getUserByUsername,
    getFriendUser,
    getCurrentUser,
    getPost,
    createPost,
    updatePost,
    createComment,
    getSinglePost,
    getPostOfUser,
    likePost,
    savePost,
    getSavedPost,
    createChat,
    getChat,
    getMessages,
    searchUser,
    suggestedUser,
} from "../api/api"

// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user) => createUserAccount(user),
    });
};


export const useSignInAccount = () => {
    return useMutation({
        mutationFn: ({ email, password }) => signInAccount(email, password),
        onMutate: (variables) => {
            console.log('Starting sign in mutation with:', variables);
        },
        onError: (error) => {
            console.error('Sign in error:', error);
        },
        onSuccess: (data) => {
            console.log('Sign in successful:', data);
        },
    });
};

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount,
    });
};

// ============================================================
// USER QUERIES
// ============================================================

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser(),
    });
};

export const useGetUsers = (limit) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: () => getUsers(limit),
    });
};

export const useGetUserByUsername = (username) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_BY_USERNAME, username],
        queryFn: () => getUserByUsername(username),
        enabled: !!username,
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user) => updateUser(user),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],

            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
            });
        },
    });
};

export const useGetFriendUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_FRIEND_USER],
        queryFn: getFriendUser,
    });
};
export const useSearchUsers = (searchTerm) => {
    return useQuery({
        queryKey: ['searchUsers', searchTerm],
        queryFn: () => searchUser(searchTerm),
        enabled: !!searchTerm,
    });
};
export const useSuggestedUsers = () => {
    return useQuery({
        queryKey: ['suggestedUsers'],
        queryFn: suggestedUser,
    });
};
// ============================================================
// POST QUERIES
// ============================================================


export const useGetAllPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS],
        queryFn: getPost,
    });
};
export const useGetPostOfUser = (userId) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_OF_USER],
        queryFn: () => getPostOfUser(userId),
        enabled: !!userId,
    });
};
export const useGetSinglePost = (postId) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => getSinglePost(postId),
        enabled: !!postId,
    });
};


export const useSearchPosts = (searchTerm) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
        queryFn: () => searchPosts(searchTerm),
        enabled: !!searchTerm,
    });
};

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts,
    });
};

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
        },
    });
};

export const useGetPostById = (postId) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId,
    });
};

export const useGetUserPosts = (userId) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
        queryFn: () => getUserPosts(userId),
        enabled: !!userId,
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post) => updatePost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
            });
        },
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ postId, imageId }) =>
            deletePost(postId, imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
        },
    });
};

export const useLikePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, userId }) => likePost(postId, userId),
        onMutate: async ({ postId, userId }) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries(['posts', postId]);

            // Snapshot the previous value
            const previousPost = queryClient.getQueryData(['posts', postId]);

            // Optimistically update to the new value
            queryClient.setQueryData(['posts', postId], (old) => {
                if (!old) return old;
                const likes = old.likes || [];
                const userLikeIndex = likes.findIndex(like => like.userId === userId);
                const isLiked = userLikeIndex !== -1;

                return {
                    ...old,
                    likes: isLiked
                        ? likes.filter(like => like.userId !== userId)
                        : [...likes, { userId }],
                };
            });

            // Return a context object with the snapshotted value
            return { previousPost };
        },
        onError: (err, { postId }, context) => {
            // If the mutation fails, use the context to roll back
            queryClient.setQueryData(['posts', postId], context.previousPost);
            console.error('Error liking post:', err);
        },
        onSettled: (data, error, { postId }) => {
            // Always refetch after error or success to ensure our local data is correct
            queryClient.invalidateQueries(['posts', postId]);
        },
    });
};
export const useGetSavedPost = (userId) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_SAVED_POST, userId],
        queryFn: () => getSavedPost(userId),
        enabled: !!userId,
    });
};

export const useSavePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, userId }) => savePost(postId, userId),
        onMutate: async ({ postId, userId }) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries(['posts', postId]);

            // Snapshot the previous value
            const previousPost = queryClient.getQueryData(['posts', postId]);

            // Optimistically update to the new value
            queryClient.setQueryData(['posts', postId], (old) => {
                if (!old) return old;
                const savedBy = old.savedBy || [];
                const isSaved = savedBy.includes(userId);

                return {
                    ...old,
                    savedBy: isSaved
                        ? savedBy.filter(id => id !== userId)
                        : [...savedBy, userId],
                };
            });

            // Return a context object with the snapshotted value
            return { previousPost };
        },
        onError: (err, { postId }, context) => {
            // If the mutation fails, use the context to roll back
            queryClient.setQueryData(['posts', postId], context.previousPost);
            console.error('Error saving/unsaving post:', err);
        },
        onSettled: (data, error, { postId }) => {
            // Always refetch after error or success to ensure our local data is correct
            queryClient.invalidateQueries(['posts', postId]);
        },
    });
};

export const useCreateComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ postId, userId, content }) => createComment(postId, userId, content),
        onSuccess: (newComment, variables) => {
            queryClient.setQueryData([QUERY_KEYS.GET_ALL_POSTS], (oldData) => {
                if (!oldData) return oldData;
                return oldData.map(post => {
                    if (post.id === variables.postId) {
                        return {
                            ...post,
                            comments: [...(post.comments || []), {
                                ...newComment,
                                user: {
                                    id: variables.userId,
                                },
                                created_at: new Date().toISOString()
                            }]
                        };
                    }
                    return post;
                });
            });

            queryClient.setQueryData([QUERY_KEYS.GET_POST_BY_ID, variables.postId], (oldPost) => {
                if (!oldPost) return oldPost;
                return {
                    ...oldPost,
                    comments: [...(oldPost.comments || []), {
                        ...newComment,
                        user: {
                            id: variables.userId,
                        },
                        created_at: new Date().toISOString()
                    }]
                };
            });
        },
    });
};
export const useCreateChat = () => {
    return useMutation({
        mutationFn: (userId, friendId) => createChat(userId, friendId),
    });
};

export const useGetChats = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CHATS],
        queryFn: getChat,
    });
};
export const useGetMessages = (chatId) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_MESSAGES, chatId], // Include chatId in the key
        queryFn: () => getMessages(chatId), // Wrap in a function
        enabled: !!chatId, // Run the query only if chatId is truthy
    });
};

export const QUERY_KEYS = {
    GET_MESSAGES: 'getMessages',
    GET_ALL_POSTS: 'getAllPosts',
    GET_POST_OF_USER: 'getPostOfUser',
    GET_POST_BY_ID: 'getPostById',
    GET_USER_BY_USERNAME: 'getUserByUsername',
    GET_FRIEND_USER: 'getFriendUser',
    GET_RECENT_POSTS: 'getRecentPosts',
    GET_POSTS: 'getPosts',
    GET_INFINITE_POSTS: 'getInfinitePosts',
    SEARCH_POSTS: 'searchPosts',
    GET_USER_POSTS: 'getUserPosts',
    GET_CURRENT_USER: 'getCurrentUser',
    GET_CHATS: 'getChats',
    // Add any other query keys you might need
};
