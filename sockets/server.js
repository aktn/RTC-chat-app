const io = require("socket.io")();

const users = [];
const connections = [];

io.on("connection", client => {
  connections.push(client);

  client.on("new user", function(data) {
    client.username = data;
    console.log(client.username);
    users.push(client.username);
    updateUsernames();
  });

  client.on("new message", message => {
    console.log(message);
    const data = JSON.parse(message);
    io.emit("created message", data);
  });

  client.on("edit message", (id, message) => {
    console.log("Message ID to be updated is ", message);
    io.emit("updated message", { id: id, message: message });
  });

  client.on("delete message", messageID => {
    console.log("Message ID to be deleted is ", messageID);
    io.emit("deleted message", messageID);
  });

  client.on("disconnect", function(data) {
    if (!client.username) return;
    users.splice(users.indexOf(client.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(client), 1);
    console.log("Disconnected");
  });

  updateUsernames = () => {
    io.emit("get users", users);
    console.log(users);
  };
});

const port = 9090;
io.listen(port);
