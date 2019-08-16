import React, { Component } from "react";
import Chatbox from "./Chatbox";
import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:9090");

class Chat extends Component {
  state = {
    messages: [],
    text: ""
  };

  componentDidMount() {
    socket.on("get users", users => {
      this.setState(() => ({
        users: users
      }));
      console.log(users);
    });
  }

  handleMessage = message => {
    this.setState({
      text: message
    });
    console.log(message);
  };

  createMessage = message => {
    console.log(message);
  };

  render() {
    return (
      <div>
        Chat component
        <Chatbox
          emitMessage={this.createMessage}
          message={this.state.text}
          controlMessage={this.handleMessage}
        />
      </div>
    );
  }
}

export default Chat;
