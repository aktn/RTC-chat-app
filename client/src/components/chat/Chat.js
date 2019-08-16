import React, { Component } from "react";
import Chatbox from "./Chatbox";
import openSocket from "socket.io-client";
import Participants from "./Participants";
import DisplayChat from "./DisplayChat";

const socket = openSocket("http://localhost:9090");

class Chat extends Component {
  state = {
    users: [],
    messages: [],
    text: "",
    editingMessage: false
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

    socket.on("deleted message", messageID => {
      const { messages } = this.state;

      const objIndex = messages.findIndex(message => message.id === messageID);
      const updatedObj = {
        ...messages[objIndex],
        deleted: true
      };

      this.setState({
        messages: [
          ...messages.slice(0, objIndex),
          updatedObj,
          ...messages.slice(objIndex + 1)
        ]
      });
    });

    socket.on("updated message", data => {
      const { messages } = this.state;

      const objIndex = messages.findIndex(msg => msg.id === data.id);
      const updatedObj = {
        ...messages[objIndex],
        message: data.message
      };

      this.setState({
        messages: [
          ...messages.slice(0, objIndex),
          updatedObj,
          ...messages.slice(objIndex + 1)
        ]
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

  deleteMessage = messageID => {
    socket.emit("delete message", messageID);
    console.log(messageID);
  };

  handleEditing = () => {
    this.setState({
      editingMessage: true
    });
    console.log(this.state.editingMessage);
  };

  editMessage = (event, id) => {
    const message = event.target.value;
    console.log("Edit" + message + id);
    const { messages } = this.state;

    const objIndex = messages.findIndex(msg => msg.id === id);
    const updatedObj = {
      ...messages[objIndex],
      message: message,
      edited: true
    };

    this.setState({
      messages: [
        ...messages.slice(0, objIndex),
        updatedObj,
        ...messages.slice(objIndex + 1)
      ]
    });
  };

  handleEdit = (e, id) => {
    if (e.keyCode == 13) {
      const message = e.target.value;
      socket.emit("edit message", id, message);
      console.log("it works");
    }
  };

  render() {
    return (
      <div>
        <Participants participants={this.state.users} />
        {this.state.messages.map((message, index) => (
          <DisplayChat
            message={message}
            currentUser={this.props.username}
            key={index}
            delete={this.deleteMessage}
            editingStatus={this.state.editingMessage}
            handleEditing={this.handleEditing}
            changed={event => this.editMessage(event, message.id)}
            keyHandler={event => this.handleEdit(event, message.id)}
          />
        ))}
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
