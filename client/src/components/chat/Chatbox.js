import React from "react";
import Picker from "react-giphy-component";
import EmojiPicker from "emoji-picker-react";
import JSEMOJI from "emoji-js";
import "./styles/Chatbox.scss";

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
    props.toggleGiphy();
  };

  const handleEmoji = (code, emoji) => {
    let emojiIcon = jsemoji.replace_colons(`:${emoji.name}:`);
    props.controlMessage(props.message + emojiIcon);
  };

  const emojiKeyboard = props.showEmoji ? (
    <div className="positionBoard">
      <EmojiPicker onEmojiClick={handleEmoji} />
    </div>
  ) : (
    ""
  );

  const giphySelection = props.showGiphy ? (
    <Picker onSelected={handleGiphy} />
  ) : (
    ""
  );

  const handleImage = e => {
    const img = e.target.files[0];
    props.handleImageUpload(img);
  };

  return (
    <div className="chatbox">
      <input
        onChange={handleChange}
        onKeyDown={messageHandler}
        value={props.message}
        placeholder="Type here ..."
        autoFocus
      />
      <span className="emojiKeyboard" onClick={props.toggleEmoji}>
        {"😍"}
      </span>
      {emojiKeyboard}
      <span className="gifSelection" onClick={props.toggleGiphy}>
        {"Gif"}
      </span>
      <input
        type="file"
        id="file"
        onChange={handleImage}
        className="imgUpload"
        size="20"
      />
      <label htmlFor="file">+</label>
      {giphySelection}
    </div>
  );
};

export default Chatbox;
