import React from "react";

const DisplayChat = props => {
  const { message } = props;
  return (
    <div>
      {message.username}: {message.message}
    </div>
  );
};

export default DisplayChat;
