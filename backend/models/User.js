// models/User.js

// Mock user data
const users = [];

// Function to create a user
export const createUser = (username, password) => {
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  return newUser.id;
};

// Function to get a user by username
export const getUserByUsername = (username) => {
  return users.find((user) => user.username === username);
};

// Function to get a user by ID
export const getUserById = (id) => {
  return users.find((user) => user.id === id);
};
