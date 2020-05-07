import React, { Component } from "react";
import modalCorazon from "../img/corasonPartio.png";
import { withAuth } from "../lib/AuthProvider";
import CancelMessage from "../components/CancelMessage";
import axios from "axios";

class ModalCancel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      members: [],
      eventId: "",
      creatorInfo: [],
      eventTitle: "",
    };
  }

  getMembers = () => {
    const { params } = this.props.match;
    const eventId = params.id;
    axios
      .get(process.env.REACT_APP_API_URI + `/api/events/${params.id}`)
      .then((responseFromApi) => {
        const creators = responseFromApi.data.creator;
        const members = responseFromApi.data.members;
        const eventTitle = responseFromApi.data.title;
        this.setState({
          members: members,
          eventTitle: eventTitle,
          eventId: eventId,
          creatorInfo: creators,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.setState(this.props.user);
    this.getMembers();
  };

  render() {
    return (
      <div className="mt-5">
        <div className="text-center">
          <img className="modalImg" src={modalCorazon} alt=""/>
        </div>
        <div className="text-center mt-5 textModal">
          <p>
            Oooh <b>{this.state.name}...</b>
          </p>
          <p>We are sorry to hear </p>
          <p>that you're not doing</p>
          <p>the action</p>
        </div>
        <div className="text-center mt-5 textModal2 mb-5">
          <CancelMessage
            className=""
            userId={this.props.user._id}
            members={this.state.members}
            creator={this.state.creatorInfo._id}
            eventId={this.state.eventId}
            eventTitle={this.state.eventTitle}
          />
        </div>
      </div>
    );
  }
}

export default withAuth(ModalCancel);
