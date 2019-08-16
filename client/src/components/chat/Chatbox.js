import React from "react";
import Picker from "react-giphy-component";

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

  const log = gif => {
    props.emitMessage(gif.original.url);
    console.log(gif);
  };

  return (
    <div>
      <input
        onChange={handleChange}
        onKeyDown={messageHandler}
        value={props.message}
        placeholder="Type here ..."
      />
      <Picker onSelected={log} />
    </div>
  );
};

export default Chatbox;
