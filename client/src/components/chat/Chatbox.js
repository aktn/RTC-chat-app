import React from "react";
import Picker from "react-giphy-component";
import EmojiPicker from "emoji-picker-react";
import JSEMOJI from "emoji-js";

let jsemoji = new JSEMOJI();

const Chatbox = props => {
  const handleChange = event => {
    props.controlMessage(event.target.value);
  };

  const messageHandler = event => {
    if (event.keyCode === 13) {
      let value = event.target.value;
      if (!value) return;
      event.preventDefault();
      props.emitMessage(value);
      value = "";
    }
  };

  const handleGiphy = gif => {
    props.emitMessage(gif.original.url);
  };

  const handleEmoji = (code, emoji) => {
    let emojiIcon = jsemoji.replace_colons(`:${emoji.name}:`);
    props.controlMessage(props.message + emojiIcon);
  };

  const emojiKeyboard = props.showEmoji ? (
    <EmojiPicker onEmojiClick={handleEmoji} />
  ) : (
    ""
  );

  return (
    <div>
      <input
        onChange={handleChange}
        onKeyDown={messageHandler}
        value={props.message}
        placeholder="Type here ..."
      />
      <span onClick={props.toggleEmoji}>{"😍"}</span>
      {emojiKeyboard}
      <Picker onSelected={handleGiphy} />
    </div>
  );
};

export default Chatbox;
