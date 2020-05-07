import React, { Component } from "react";

class BottonJoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      members: [],
      creator: "",
      notifications: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    let result = this.props.members.findIndex(
      (user) => user._id === this.props.userId
    );

    if (result > -1) {
      return (
        <div className="text-right m-3 ">
          <button className="btn btnBlueBig">Not Going</button>
        </div>
      );
    } else if (this.props.userId === this.props.creator) {
      return <div></div>;
    } else {
      return (
        <div className="text-right m-3  ">
          <button className=" btn btnOrangeBig">Going</button>
        </div>
      );
    }
  }
}

export default BottonJoin;
