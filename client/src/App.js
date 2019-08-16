import React, { Component } from "react";
import "./App.scss";
import NewUser from "./components/user/NewUser";

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
        <NewUser emitUser={this.createUser} />
      </div>
    );
  }
}

export default App;
