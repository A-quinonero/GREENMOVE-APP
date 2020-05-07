import React, { Component } from "react";
import service from "../api/service";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

class CancelMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      members: [],
      creator: "",
      notifications: "",
      eventId: "",
      eventTitle: "",
    };
  }

  handleSubmitCancel = (e) => {
    e.preventDefault();
    service
      .addMessage(this.state)
      .then((res) => {
        console.log("CancelMessage sent", res);
      })
      .catch((err) => {
        console.log("Error while adding the thing:", err);
      });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      eventId: this.props.eventId,
      members: this.props.members,
      creator: this.props.creator,
    });
  };

  deleteAction = async () => {
    try {
      const eventId = this.state.eventId;
      const userId = this.props.user._id;
      axios.post(process.env.REACT_APP_API_URI + `/api/delete-event`, {
        eventId,
        userId,
      });
      await axios.delete(
        process.env.REACT_APP_API_URI + `/api/events/${eventId}`
      );
      await this.props.history.push("/private")
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (this.props.creator === this.props.userId) {
      return (
        <form onSubmit={(e) => this.handleSubmitCancel(e)}>
          <div className="text-center ">
            <div>
              <div className="textAreaCreator m-5 mt-3">
                <textarea
                  name="notifications"
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Tell something about the cancelation to the members..."
                  value={this.state.notifications}
                ></textarea>
              </div>
              <div className="text-center m-3 ">
                <button
                  onClick={() => this.deleteAction()}
                  className="btn btnOrange"
                >
                  Send it!
                </button>
              </div>
            </div>
          </div>
        </form>
      );
    } else {
      return <div></div>;
    }
  }
}
export default withAuth(CancelMessage);
