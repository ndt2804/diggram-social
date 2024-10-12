import React, { useState } from 'react';

const ContactList = ({ contacts, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all'); // 'all' or 'group'

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeTab === 'all' || (activeTab === 'group' && contact.isGroup))
    );

    return (
        <div className="w-1/4 border-r p-4 flex flex-col h-full">
            <h2 className="font-bold mb-4">Direct Messages</h2>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded mb-4"
            />

            {/* Tabs */}
            <div className="flex mb-4">
                <button
                    className={`flex-1 py-2 ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('all')}
                >
                    All Chats
                </button>
                <button
                    className={`flex-1 py-2 ${activeTab === 'group' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('group')}
                >
                    Group Chats
                </button>
            </div>

            {/* Contact list */}
            <ul className="overflow-y-auto flex-grow">
                {filteredContacts.map((contact) => (
                    <li
                        key={contact.id}
                        onClick={() => onSelect(contact)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                        {contact.name}
                        {contact.isGroup && <span className="ml-2 text-xs text-gray-500">(Group)</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList;