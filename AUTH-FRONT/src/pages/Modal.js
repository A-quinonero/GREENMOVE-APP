import React, { Component } from "react";
import { Link } from "react-router-dom";
import activityLogo from "../img/modal.png";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {}, members: [] };
  }
  getEvent = () => {
    const { params } = this.props.match;
    axios
      .get(process.env.REACT_APP_API_URI + `/api/events/${params.id}`)
      .then((responseFromApi) => {
        const event = responseFromApi.data;
        this.setState(event);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount = () => {
    this.setState(this.props.user);
    this.getEvent();
  };
  render() {
    return (
      <div className="mt-5">
        <div className="text-center">
          <img className="modalImg" src={activityLogo} alt="" srcset="" />
        </div>
        <div className="text-center mt-5 textModal">
          <p>
            Congratulations <b>{this.state.name}</b> !
          </p>
          <p>You are going to attend:</p>
          <p>
            <b>{this.state.title}</b>
          </p>
        </div>
        <div className="text-center mt-5 textModal2 mb-5">
          <p>
            <i>
              You and <b>{this.state.members.length - 1}</b> more people are
            </i>{" "}
          </p>
          <p>
            <i>collaborating in this action</i>
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

export default withAuth(Modal);
