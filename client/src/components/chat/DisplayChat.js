import React from "react";
import Gify from "../bonus/Gify";
import LinksPreview from "../bonus/LinksPreview";

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

  let displayExtraMedia;
  const checkGif = message.message && message.message.indexOf("giphy") > -1;
  if (checkGif) {
    displayExtraMedia = <Gify message={message.message} />;
  } else {
    displayExtraMedia = <LinksPreview link={message.message} />;
  }

  return (
    <div>
      {displayMessage}
      {displayExtraMedia}
    </div>
  );
};

export default DisplayChat;
