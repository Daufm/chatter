const API_BASE_URL = 'http://localhost:3000/api';

export const getContacts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/contacts`);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
};

export const getGroups = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/groups`);
    if (!response.ok) {
      throw new Error('Failed to fetch groups');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
};

export const getMessages = async (recipientId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/messages?recipient=${recipientId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};