import React from "react";
import Gify from "../bonus/Gify";
import LinksPreview from "../bonus/LinksPreview";
import "./styles/DisplayChat.scss";

const DisplayChat = props => {
  const { message, currentUser } = props;

  const handleDoubleClick = () => {
    props.handleEditing();
  };

  let displayMessage;
  if (!message.deleted) {
    displayMessage = (
      <label>
        <span>{message.username} : </span>
        <label onDoubleClick={handleDoubleClick} className="message">
          {message.editing ? (
            <input
              type="text"
              value={message.message}
              onChange={props.changedValue}
              onKeyDown={props.onPressEnter}
            />
          ) : (
            message.message
          )}
        </label>
        {message.username == currentUser ? (
          <label
            className="deleteIcon"
            onClick={() => props.delete(message.id)}
          >
            ✕
          </label>
        ) : (
          ""
        )}
        {message.edited ? <span className="edited">Edited</span> : ""}
      </label>
    );
  } else {
    displayMessage = (
      <label className="deleted">
        <span>{message.username} : </span>Deleted
      </label>
    );
  }

  let displayExtraMedia;
  const checkGif = message.message && message.message.indexOf("giphy") > -1;
  if (checkGif) {
    displayExtraMedia = <Gify message={message.message} />;
  } else {
    displayExtraMedia = <LinksPreview link={message.message} />;
  }

  return (
    <div className="displayChat">
      <div className="displayChat__wrapper">
        {displayMessage}
        {displayExtraMedia}
      </div>
    </div>
  );
};

export default DisplayChat;
