import React, { Component } from "react";
import "./App.scss";
import NewUser from "./components/user/NewUser";
import Chat from "./components/chat/Chat";
import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:9090");

class App extends Component {
  state = {
    username: null
  };

  createUser = username => {
    socket.emit("new user", username);
    this.setState({ username });
    console.log(username);
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
