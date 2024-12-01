// models/Message.js

// Mock message data
const messages = [];

// Function to create a message
export const createMessage = (sender, receiver, text) => {
  const newMessage = {
    id: messages.length + 1,
    sender,
    receiver,
    text,
    timestamp: new Date(),
  };
  messages.push(newMessage);
  return newMessage.id;
};

// Function to get all messages
export const getAllMessages = () => {
  return messages;
};
