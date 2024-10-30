import React, { useState, useEffect } from 'react';
import socket, { listenForMessages } from '../libs/socket';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const handleNewMessage = (message) => {
            console.log(' New Messages ', message);

            const newNotification = {
                id: notifications.length + 1,
                type: 'message',
                content: `You have new message`,
                timestamp: new Date().toLocaleTimeString(),
            };
            setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
        };

        listenForMessages(handleNewMessage);
        return () => {
            socket.off('receive_message', handleNewMessage);
        };
    }, []);
    const getIcon = (type) => {
        switch (type) {
            case 'message':
                return '✉️';
            case 'friend_request':
                return '👥';
            case 'system':
                return 'ℹ️';
            default:
                return '🔔';
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 border rounded-lg mt-10 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h1>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {notifications.length === 0 ? (
                    <p className="p-4 text-center text-gray-500">No notifications</p>
                ) : (
                    <ul>
                        {notifications.map((notification) => (
                            <li key={notification.id} className="border-b border-gray-200 last:border-b-0 transition duration-300 ease-in-out hover:bg-gray-50">
                                <div className="flex items-center p-4">
                                    <div className="mr-4 text-2xl">
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm font-medium text-gray-900">{notification.content}</p>
                                        <p className="text-xs text-gray-500 mt-1"> {dayjs(notification.timestamp).fromNow()}</p>
                                    </div>
                                    <div className="ml-4">
                                        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                                            Mark as read
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Notifications;