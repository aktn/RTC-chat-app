import React from "react";

const DisplayChat = props => {
  const { message, currentUser } = props;

  let displayMessage;
  if (!message.deleted) {
    displayMessage = (
      <label>
        {message.username}:{message.message}
        {message.username == currentUser ? (
          <label onClick={() => props.delete(message.id)}>✕</label>
        ) : (
          ""
        )}
      </label>
    );
  } else {
    displayMessage = <label>Deleted</label>;
  }

  return <div>{displayMessage}</div>;
};

export default DisplayChat;
