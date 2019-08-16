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

  updateUsernames = () => {
    io.emit("get users", users);
    console.log(users);
  };
});

const port = 9090;
io.listen(port);
