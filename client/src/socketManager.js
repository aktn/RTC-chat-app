import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:9090");

// Participants
const addNewUser = user => {
  socket.emit("new user", user);
};

const getParticipants = callback => {
  socket.on("get users", users => callback(users));
};

// Broadcasting Messages
const braodcastCreatedMessage = data => {
  socket.emit("new message", data);
};

const broadcastDeletedMessage = messageID => {
  socket.emit("delete message", messageID);
};

const broadcastEditedMessage = (messageID, message) => {
  socket.emit("edit message", messageID, message);
};

export {
  addNewUser,
  getParticipants,
  braodcastCreatedMessage,
  broadcastDeletedMessage,
  broadcastEditedMessage
};
