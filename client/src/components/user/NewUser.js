import React, { Component } from "react";
import "./NewUser.scss";

class NewUser extends Component {
  createUser = e => {
    e.preventDefault();
    const username = e.target.name.value;
    this.props.emitUser(username);
  };

  render() {
    return (
      <div className="joinChat">
        <form onSubmit={this.createUser}>
          <h3>Got a nick name?</h3>
          <input type="text" className="joinChat__name" autoFocus id="name" />
          <input type="submit" className="joinChat__join" value="Join" />
        </form>
      </div>
    );
  }
}
export default NewUser;
