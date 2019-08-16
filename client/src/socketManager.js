import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:9090");

// Participants
const addNewUser = user => {
  socket.emit("new user", user);
};

const getParticipants = callback => {
  socket.on("get users", users => callback(users));
};

export { addNewUser, getParticipants };
