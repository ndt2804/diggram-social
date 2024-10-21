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
        mutationFn: ({
            postId,
            likesArray,
        }) => likePost(postId, likesArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            });
        },
    });
};

export const useSavePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, postId }) =>
            savePost(userId, postId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            });
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
                                    // Note: You might need to fetch the user's fullname and image_url separately
                                    // or pass them as part of the variables
                                },
                                created_at: new Date().toISOString()
                            }]
                        };
                    }
                    return post;
                });
            });

            // Optionally, you can also update the individual post query if you have one
            queryClient.setQueryData([QUERY_KEYS.GET_POST_BY_ID, variables.postId], (oldPost) => {
                if (!oldPost) return oldPost;
                return {
                    ...oldPost,
                    comments: [...(oldPost.comments || []), {
                        ...newComment,
                        user: {
                            id: variables.userId,
                            // Note: You might need to fetch the user's fullname and image_url separately
                            // or pass them as part of the variables
                        },
                        created_at: new Date().toISOString()
                    }]
                };
            });
        },
    });
};

export const QUERY_KEYS = {
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
    // Add any other query keys you might need
};
