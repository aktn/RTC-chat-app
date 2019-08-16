import React from "react";

const DisplayChat = props => {
  const { message, currentUser, editingStatus } = props;

  const handleDoubleClick = () => {
    props.handleEditing();
  };

  let displayMessage;
  if (!message.deleted) {
    displayMessage = (
      <label>
        {message.username}:
        <label onDoubleClick={handleDoubleClick}>
          {editingStatus ? (
            <input
              type="text"
              value={message.message}
              onChange={props.changedValue}
              onKeyDown={props.onPressEnter}
            />
          ) : (
            message.message
          )}
          {message.edited ? <span>Edited</span> : ""}
        </label>
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
