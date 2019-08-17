import React from "react";
import "./styles/Participants.scss";

const Participants = props => {
  let emoji = ["👨🏻‍🦰", "👩🏽‍🦳", "👮🏼‍", "👷🏾‍", "👱🏻‍", "👴🏽", "👨🏽‍💼", "🦸🏼‍", "🧔🏻"];
  const participantList = props.participants.map((participant, index) => {
    return (
      <li key={index} className="participant">
        <span className="participant__icon">{emoji[index]}</span>
        <span className="participant__name">{participant}</span>
      </li>
    );
  });

  return (
    <div className="participants">
      <h3>Participants</h3>
      <ul className="participants__list">{participantList}</ul>
    </div>
  );
};

export default Participants;
