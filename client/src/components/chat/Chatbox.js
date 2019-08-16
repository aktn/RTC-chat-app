import React from "react";

const Chatbox = props => {
  const handleChange = event => {
    props.controlMessage(event.target.value);
    console.log("this is ej");
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

  return (
    <div>
      <input
        onChange={handleChange}
        onKeyDown={messageHandler}
        value={props.message}
        placeholder="Type here ..."
      />
    </div>
  );
};

export default Chatbox;
