import React from "react";

const DisplayChat = props => {
  const { message, currentUser } = props;
  return (
    <div>
      {message.username}: {message.message}
      {message.username == currentUser ? (
        <label onClick={() => props.delete(message.id)}>✕</label>
      ) : (
        ""
      )}
    </div>
  );
};

export default DisplayChat;
