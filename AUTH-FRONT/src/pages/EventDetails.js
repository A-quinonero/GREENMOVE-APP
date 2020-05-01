import React, { Component } from "react";
import axios from "axios";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
import BottonJoin from "../components/BottonJoin";
import Message from "../components/Message";
import { Link } from "react-router-dom";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: "",
      members: [],
      creator: "",
      notifications: [],
      eventId: "",
      user: {},
      creatorInfo: [],
    };
  }

  handleSubmit = (e) => {
    const { params } = this.props.match;

    console.log(params.id, "id del evento");
    console.log("USEEEEEEER ID :", this.props.user._id);
    console.log("members", this.state.creator);
    e.preventDefault();

    let result = this.state.members.findIndex(
      (user) => user._id === this.props.user._id
    );
    console.log(result);
    if (result > -1) {
      return service
        .deleteMember({ eventId: params.id, userId: this.props.user._id })
        .then((res) => {
          this.props.history.push(`/private/modal-delete`);
          console.log("Deleted", res);
        })
        .catch((err) => {
          console.log("Error while adding the thing:", err);
        });
    } else {
      return service

        .addMember({ eventId: params.id, userId: this.props.user._id })
        .then((res) => {
          this.props.history.push(`/private/modal/${this.state._id}`);
          console.log("Added", res);
        })
        .catch((err) => {
          console.log("Error while adding the thing:", err);
        });
    }
  };

  getEvent = () => {
    const { params } = this.props.match;
    // console.log(params.id, "paramsEvent")
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

  getMembers = () => {
    const { params } = this.props.match;
    const eventId = params.id;
    // console.log(params.id, "paramsEvent")
    axios
      .get(process.env.REACT_APP_API_URI + `/api/events/${params.id}`)
      .then((responseFromApi) => {
        const creators = responseFromApi.data.creator;
        console.log(responseFromApi, "creators");
        const members = responseFromApi.data.members;
        this.setState({
          members: members,
          eventId: eventId,
          creatorInfo: creators,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getEvent();
    this.getMembers();
  }

  render() {
    console.log(this.state.creatorInfo, "elestado");

    let position = this.state.coordinates;
    console.log(position);
    const icon = L.icon({
      iconUrl: require(`../img/map-marker-alt-solid.svg`),
      iconSize: [24, 36],
      iconAnchor: [12, 36],
      popupAnchor: [0, -25],
    });
    return (
      <div className="p-3">
        <img className="imgEvent" src={this.state.imageUrl} alt="" />

        <h1 className="titleDetails">{this.state.title}</h1>
        <p className="fechayhora">
          <i>
            {this.state.date} - {this.state.duration}h
          </i>
        </p>
        <Link to={`/private/modal-cancel/${this.state.eventId}`}>
          {this.state.creator._id === this.props.user._id ? (
            <div className=" text-center pt-2 pb-3">
              <button className="btn btnRedBig">Cancel Action</button>
            </div>
          ) : (
            <div></div>
          )}
        </Link>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="d-flex justify-content-center bottonFixed">
            <BottonJoin
              type="submit"
              userId={this.props.user._id}
              members={this.state.members}
              creator={this.state.creator._id}
            />
          </div>
          <div className="row pt-1 fotosMembers">
            {this.state.members.length > 3
              ? this.state.members.slice(0, 3).map((member) => {
                  return (
                    <div>
                      <div className="col text-center">
                        <img
                          className="memberImg"
                          src={member.imageUrl}
                          alt=""
                        />
                        <h3 className="text-memb text-dark">{member.name}</h3>
                      </div>
                    </div>
                  );
                })
              : this.state.members.map((member) => {
                  return (
                    <div>
                      <div className="col text-center">
                        <img
                          className="memberImg"
                          src={member.imageUrl}
                          alt=""
                        />
                        <p className="text-memb text-dark">{member.name}</p>
                      </div>
                    </div>
                  );
                })}
            {this.state.members.length > 3 ? (
              <span className="mt-2">
                <i>... {this.state.members.length - 3} more going</i>
              </span>
            ) : (
              <div></div>
            )}
          </div>
          {/* <div className="row pt-3">
            {this.state.members.map((member) => {
              return (
                <div>
                  <div className="col text-center">
                    <img className="memberImg" src={member.imageUrl} alt="" />
                    <h3 className="textMyEvent text-dark">{member.name}</h3>
                  </div>
                </div>
              );
            })}
          </div> */}
          <h5 className="mt-2">The Organizer:</h5>
          <div className="d-flex align-items-center m-2">
            <div>
              <img
                className="creatorImg"
                src={this.state.creator.imageUrl}
                alt=""
              />
            </div>
            <div>
              <span className="ml-3">
                {this.state.creator.name} {this.state.creator.lastName}
              </span>
            </div>
          </div>
          <h5 className="mt-4">Problem:</h5>
          <p>{this.state.descriptionProblem}</p>
          <h5 className="mt-4">Solution:</h5>
          <p>{this.state.descriptionSolution}</p>

          <h5 className="mt-4 mb-3">Location:</h5>
        </form>
        <Map center={position} zoom={12}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {position.length > 0 && (
            <Marker position={position} icon={icon} draggable={false}>
              <Popup>
                {this.state.title}
                <br />
                {this.state.duration}
              </Popup>
            </Marker>
          )}
        </Map>
        {this.state.creator._id === this.props.user._id ? (
          <p className="someAdd">Something to add?</p>
        ) : (
          <span></span>
        )}
        <Message
          userId={this.props.user._id}
          members={this.state.members}
          creator={this.state.creator._id}
          eventId={this.state.eventId}
        />
      </div>
    );
  }
}

export default withAuth(EventDetails);
