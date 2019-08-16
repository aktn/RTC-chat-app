import React, { Component } from "react";
import "./App.scss";
import NewUser from "./components/user/NewUser";
import Chat from "./components/chat/Chat";

class App extends Component {
  state = {
    username: null
  };

  createUser = username => {
    this.setState({ username });
    console.log(username);
  };

  render() {
    return (
      <div>
        {!this.state.username ? (
          <NewUser emitUser={this.createUser} />
        ) : (
          <Chat />
        )}
      </div>
    );
  }
}

export default App;
