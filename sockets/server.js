const io = require("socket.io")();

const users = [];
const connections = [];

io.on("connection", client => {
  connections.push(client);

  client.on("new user", function(data) {
    client.username = data;
    users.push(client.username);
    updateUsernames();
  });

  client.on("new message", message => {
    const data = JSON.parse(message);
    io.emit("created message", data);
  });

  client.on("edit message", (id, message) => {
    io.emit("updated message", { id: id, message: message });
  });

  client.on("delete message", messageID => {
    io.emit("deleted message", messageID);
  });

  client.on("disconnect", function(data) {
    if (!client.username) return;
    users.splice(users.indexOf(client.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(client), 1);
  });

  client.on("send image", image => {
    io.emit("emit image", {
      username: image.username,
      message: image.message,
      id: image.id,
      deleted: image.deleted,
      editing: image.editing,
      edited: image.edited
    });
  });

  updateUsernames = () => {
    io.emit("get users", users);
  };
});

const port = 9090;
io.listen(port);
