import React, { useState, useEffect } from 'react';

const Sidebar = ({ onSelectRecipient }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/users/contacts', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setContacts(data);
        }
      } catch {
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="w-full md:w-80 bg-white border-r border-gray-200 h-full flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 h-full overflow-y-auto flex-shrink-0">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
      </div>

      {/* Contacts Section */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Contacts</h3>
        <div className="space-y-2">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              onClick={() => onSelectRecipient({ id: contact._id, name: contact.username, type: 'contact' })}
              className="flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                {contact.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {contact.username}
                </p>
                <p className="text-xs text-gray-500">Last seen recently</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Groups Section - Coming soon */}
      {/* <div className="p-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Groups</h3>
        <div className="space-y-2">
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => onSelectRecipient(group)}
              className="flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                {group.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {group.name}
                </p>
                <p className="text-xs text-gray-500">{group.memberCount} members</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;