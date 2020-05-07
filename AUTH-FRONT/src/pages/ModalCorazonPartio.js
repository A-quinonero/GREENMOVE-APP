import React, { Component } from "react";
import { Link } from "react-router-dom";
import modalCorazon from "../img/corasonPartio.png";
import { withAuth } from "../lib/AuthProvider";

class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {}, members: [] };
  }

  componentDidMount = () => {
    this.setState(this.props.user);
  };
  render() {
    return (
      <div className="mt-5">
        <div className="text-center">
          <img className="modalImg" src={modalCorazon} alt="" />
        </div>
        <div className="text-center mt-5 textModal">
          <p>
            Oooh <b>{this.state.name}...</b>
          </p>
          <p>We are sorry to hear </p>
          <p>that you're not coming</p>
        </div>
        <div className="text-center mt-5 textModal2 mb-5">
          <p>
            <i>Hopefully you can join</i>{" "}
          </p>
          <p>
            {" "}
            <i>us in the next one</i>{" "}
          </p>
        </div>
        <div className="text-center pb-3">
          <Link style={{ textDecoration: "none" }} to="/private">
            <button className="btn btnOrange">Back to Explore</button>
          </Link>
        </div>
        <div className="text-center">
          <Link style={{ textDecoration: "none" }} to="/private/my-profile">
            <button className="btn btnBlue">Go to Profile</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withAuth(ModalCreate);
