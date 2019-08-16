import React from "react";

const Participants = props => {
  let emoji = ["👨🏻‍🦰", "👩🏽‍🦳", "👮🏼‍", "👷🏾‍", "👱🏻‍", "👴🏽", "👨🏽‍💼", "🦸🏼‍", "🧔🏻"];
  const participantList = props.participants.map((participant, index) => {
    return (
      <li key={index}>
        {emoji[index]}
        {participant}
      </li>
    );
  });

  return (
    <div className="participants">
      <ul>{participantList}</ul>
    </div>
  );
};

export default Participants;
