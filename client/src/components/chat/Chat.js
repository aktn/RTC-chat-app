import React, { Component } from "react";
import Chatbox from "./Chatbox";
import Participants from "./Participants";
import DisplayChat from "./DisplayChat";
import {
  getParticipants,
  braodcastCreatedMessage,
  broadcastDeletedMessage,
  broadcastEditedMessage,
  getCreatedMessage,
  getDeletedMessage,
  getEditedMessage
} from "../../socketManager";
import "./styles/Chat.scss";

class Chat extends Component {
  state = {
    users: [],
    messages: [],
    text: "",
    editingMessage: false,
    showEmoji: false,
    showGiphy: false
  };

  componentDidMount() {
    getParticipants(users =>
      this.setState(() => ({
        users
      }))
    );

    getCreatedMessage(message =>
      this.setState(() => ({
        messages: [...this.state.messages, message]
      }))
    );

    getDeletedMessage(messageID => {
      const { messages } = this.state;

      const objIndex = messages.findIndex(message => message.id === messageID);
      const updatedObj = {
        ...messages[objIndex],
        deleted: true
      };

      this.setState(() => ({
        messages: [
          ...messages.slice(0, objIndex),
          updatedObj,
          ...messages.slice(objIndex + 1)
        ]
      }));
    });

    getEditedMessage(data => {
      const { messages } = this.state;

      const objIndex = messages.findIndex(msg => msg.id === data.id);
      const updatedObj = {
        ...messages[objIndex],
        message: data.message,
        edited: true
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
    braodcastCreatedMessage(
      JSON.stringify(data),
      this.setState({
        text: ""
      })
    );
  };

  deleteMessage = messageID => {
    broadcastDeletedMessage(messageID);
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
      message: message
    };

    this.setState({
      messages: [
        ...messages.slice(0, objIndex),
        updatedObj,
        ...messages.slice(objIndex + 1)
      ]
    });
  };

  handleUpdate = (e, id) => {
    if (e.keyCode == 13) {
      const message = e.target.value;
      if (!message) return;
      broadcastEditedMessage(id, message);
    }
  };

  handleEmojiState = () => {
    this.setState({
      showEmoji: !this.state.showEmoji
    });
  };

  handleGiphyState = () => {
    this.setState({
      showGiphy: !this.state.showGiphy
    });
  };

  render() {
    return (
      <div className="chat">
        <Participants participants={this.state.users} />
        <div className="chat__panel">
          {this.state.messages.map((message, index) => (
            <DisplayChat
              message={message}
              currentUser={this.props.username}
              key={index}
              delete={this.deleteMessage}
              editingStatus={this.state.editingMessage}
              handleEditing={this.handleEditing}
              changedValue={event => this.editMessage(event, message.id)}
              onPressEnter={event => this.handleUpdate(event, message.id)}
            />
          ))}
          <Chatbox
            emitMessage={this.createMessage}
            message={this.state.text}
            controlMessage={this.handleMessage}
            showEmoji={this.state.showEmoji}
            toggleEmoji={this.handleEmojiState}
            showGiphy={this.state.showGiphy}
            toggleGiphy={this.handleGiphyState}
          />
        </div>
      </div>
    );
  }
}

export default Chat;
