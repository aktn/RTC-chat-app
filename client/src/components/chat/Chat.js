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
    });
    socket.on("created message", message => {
      console.log(message);
      this.setState({
        messages: [...this.state.messages, message]
      });
      console.log(this.state.messages);
    });
  }

  handleMessage = message => {
    this.setState({
      text: message
    });
  };

  createMessage = message => {
    const data = {
      id: Math.random(),
      username: this.props.username,
      message: message,
      deleted: false,
      editing: false,
      edited: false
    };
    socket.emit(
      "new message",
      JSON.stringify(data),
      this.setState({
        text: ""
      })
    );
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
