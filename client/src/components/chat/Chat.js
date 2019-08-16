import React, { Component } from "react";
import Chatbox from "./Chatbox";
import openSocket from "socket.io-client";
import Participants from "./Participants";

const socket = openSocket("http://localhost:9090");

class Chat extends Component {
  state = {
    users: [],
    messages: [],
    text: ""
  };

  componentDidMount() {
    socket.on("get users", users => {
      this.setState(() => ({
        users
      }));
      console.log(this.state.users);
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
        <Participants participants={this.state.users} />
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
