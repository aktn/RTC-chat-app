import React, { Component } from "react";

class NewUser extends Component {
  createUser = e => {
    e.preventDefault();
    this.props.emitUser(e.target.name.value);
  };

  render() {
    return (
      <div className="joinChat">
        <form onSubmit={this.createUser}>
          <h3>Got a nick name?</h3>
          <input type="text" className="name" id="name" />
          <input type="submit" className="join" value="Join" />
        </form>
      </div>
    );
  }
}
export default NewUser;
