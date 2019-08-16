import React, { Component } from "react";
import Chatbox from "./Chatbox";

class Chat extends Component {
  state = {
    messages: [],
    text: ""
  };

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
