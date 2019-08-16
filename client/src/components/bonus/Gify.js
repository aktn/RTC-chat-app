import React from "react";

const Gify = props => {
  const giffy = <img src={props.message} height="200" width="200" alt="Gify" />;

  return <div>{giffy}</div>;
};

export default Gify;
