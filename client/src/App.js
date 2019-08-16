import React, { Component } from "react";
import "./App.scss";
import NewUser from "./components/user/NewUser";
import Chat from "./components/chat/Chat";
import { addNewUser } from "./socketManager";

class App extends Component {
  state = {
    username: null
  };

  createUser = username => {
    // socket.emit("new user", username);
    // this.setState({ username });
    addNewUser(username, this.setState({ username }));
  };

  render() {
    return (
      <div>
        {!this.state.username ? (
          <NewUser emitUser={this.createUser} />
        ) : (
          <Chat username={this.state.username} />
        )}
      </div>
    );
  }
}

export default App;
