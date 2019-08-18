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
  getEditedMessage,
  broadcastImage,
  getImage
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
      this.handleMessageState(updatedObj, objIndex);
    });

    getEditedMessage(data => {
      const { messages } = this.state;

      const objIndex = messages.findIndex(msg => msg.id === data.id);
      const updatedObj = {
        ...messages[objIndex],
        message: data.message,
        edited: true
      };
      this.handleMessageState(updatedObj, objIndex);
    });

    getImage(image => {
      console.log(image);
      this.setState(() => ({
        messages: [...this.state.messages, image]
      }));
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
      edited: false,
      editing: false
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

  // Get message ID to be edited & change its editing status
  handleEditing = ID => {
    const { messages } = this.state;
    const objIndex = this.state.messages.findIndex(msg => msg.id === ID);
    const updatedObj = {
      ...messages[objIndex],
      editing: true
    };
    // Call the setState
    this.handleMessageState(updatedObj, objIndex);
  };

  // Control specific message's value to be edited
  editMessage = (event, id) => {
    const message = event.target.value;
    const { messages } = this.state;

    const objIndex = messages.findIndex(msg => msg.id === id);
    const updatedObj = {
      ...messages[objIndex],
      message: message
    };
    // Call the setState
    this.handleMessageState(updatedObj, objIndex);
  };

  // Update the message value after being hit enter
  handleUpdate = (e, id) => {
    if (e.keyCode == 13) {
      const message = e.target.value;
      if (!message) return;
      broadcastEditedMessage(id, message);

      const { messages } = this.state;
      const objIndex = messages.findIndex(msg => msg.id === id);
      const updatedObj = {
        ...messages[objIndex],
        editing: !messages[objIndex].editing
      };
      // Call the setState
      this.handleMessageState(updatedObj, objIndex);
    }
  };

  // Manage the message state here
  handleMessageState = (updatedObj, objIndex) => {
    const { messages } = this.state;
    this.setState({
      messages: [
        ...messages.slice(0, objIndex),
        updatedObj,
        ...messages.slice(objIndex + 1)
      ]
    });
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

  handleImageUpload = e => {
    const reader = new FileReader();
    reader.onload = event => {
      const message = {};
      message.id = Math.random();
      message.username = this.props.username;
      message.message = event.target.result;
      message.deleted = false;
      message.edited = false;
      message.editing = false;
      broadcastImage(message);
    };
    reader.readAsDataURL(e);
  };

  render() {
    return (
      <div className="chat">
        <Participants participants={this.state.users} />
        <div className="chat__panel">
          <div className="display-chat">
            {this.state.messages.map((message, index) => (
              <DisplayChat
                message={message}
                currentUser={this.props.username}
                key={index}
                delete={this.deleteMessage}
                handleEditing={() => this.handleEditing(message.id)}
                changedValue={event => this.editMessage(event, message.id)}
                onPressEnter={event => this.handleUpdate(event, message.id)}
              />
            ))}
          </div>
          <Chatbox
            emitMessage={this.createMessage}
            message={this.state.text}
            controlMessage={this.handleMessage}
            showEmoji={this.state.showEmoji}
            toggleEmoji={this.handleEmojiState}
            showGiphy={this.state.showGiphy}
            toggleGiphy={this.handleGiphyState}
            handleImageUpload={this.handleImageUpload}
          />
        </div>
      </div>
    );
  }
}

export default Chat;
