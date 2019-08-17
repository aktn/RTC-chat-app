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
  if (
    !message.deleted &&
    !message.message.match(/\b(http|https)?:\/\/\S+/gi) &&
    !message.message.match("base64")
  ) {
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
  } else if (message.deleted) {
    displayMessage = (
      <label className="deleted">
        <span>{message.username} : </span>Deleted
      </label>
    );
  }

  let displayExtraMedia;
  const checkGif = message.message && message.message.indexOf("giphy") > -1;

  let displayImage;
  if (message.message.match("base64")) {
    displayImage = (
      <>
        <span>{message.username} : </span>{" "}
        <img src={message.message} alt="image" />
      </>
    );
  }

  if (checkGif) {
    displayExtraMedia = (
      <label>
        <span>{message.username} : </span>
        <Gify message={message.message} />
      </label>
    );
  } else {
    displayExtraMedia = (
      <label>
        <LinksPreview link={message.message} />
      </label>
    );
  }

  return (
    <div className="displayChat">
      <div className="displayChat__wrapper">
        {displayMessage}
        {displayImage}
        {displayExtraMedia}
      </div>
    </div>
  );
};

export default DisplayChat;
