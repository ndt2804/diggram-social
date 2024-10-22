import supabase from "../libs/supabase.js";

export const createChatService = async (userId, friendId) => {
    const { data, error } = await supabase.from('chats').insert({
        userId,
        friendId,
    }).select();

    if (error) {
        throw error;
    }

    return data[0];
};

export async function getChatService(userId) {
    try {
        // Fetch chats
        const { data: chats, error: chatsError } = await supabase
            .from('chats')
            .select('id, created_at, userId, friendId')
            .or(`userId.eq.${userId},friendId.eq.${userId}`);

        if (chatsError) {
            console.error("Error fetching chats:", chatsError.message);
            throw new Error("Failed to fetch chats.");
        }

        // Get unique user IDs (excluding the current user)
        const userIds = [...new Set(chats.flatMap(chat => [chat.userId, chat.friendId]))].filter(id => id !== Number(userId));

        // Fetch user details
        const { data: users, error: usersError } = await supabase
            .from('users')
            .select('id, username, fullname, email, image_url')
            .in('id', userIds);

        if (usersError) {
            console.error("Error fetching users:", usersError.message);
            throw new Error("Failed to fetch user details.");
        }

        // Create a map of user details for quick lookup
        const userMap = Object.fromEntries(users.map(user => [user.id, user]));

        // Format chats with user details
        const formattedChats = chats.map(chat => {
            const otherUserId = chat.userId === Number(userId) ? chat.friendId : chat.userId;
            const otherUser = userMap[otherUserId];
            return {
                id: chat.id,
                created_at: chat.created_at,
                name: otherUser?.fullname || otherUser?.username || 'Unknown User',
                image_url: otherUser?.image_url,
                userId: otherUserId
            };
        });

        return formattedChats;
    } catch (e) {
        console.error('Error in getChatService:', e);
        throw new Error('Error fetching chats');
    }
}
