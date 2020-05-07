import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      MyActions: [],
      user: {},
    };
  }
  getProfile = () => {
    axios
      .get(
        process.env.REACT_APP_API_URI + `/api/my-events/${this.props.user._id}`
      )
      .then((responseFromApi) => {
        this.setState({
          MyActions: responseFromApi.data.myAccions,
        });
      });
  };

  componentDidMount() {
    this.setState({ user: this.props.user });
    this.getProfile();
  }

  render() {
    const isLoading = this.state.MyActions === 0 ? true : false;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/private/my-profile" />;
    } else if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="pt-3 m-3">
          <nav>
            <h3 className="text-center mb-3">Actions</h3>
            <div
              className="btn-group-active row d-flex justify-content-around "
              data-toggle="buttons"
              role="group"
              aria-label="Basic example"
            >
              <div className="m-2">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/private/my-actions"
                >
                  <button type="radio" id="1" className="btn btnOn">
                    Created
                  </button>
                </Link>
              </div>
              <div className="m-2">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/private/join-actions"
                >
                  <button type="radio" id="2" className="btn btnOff">
                    Joined
                  </button>
                </Link>
              </div>
            </div>
          </nav>
          <div className="row d-flex justify-content-between eventGroup">
            {this.state.MyActions.map((event) => {
              return (
                <div key={event._id} className="col-6">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/private/events/${event._id}`}
                  >
                    <div className="posRel">
                      <div
                        className="imgMyEvent d-flex justify-content-center align-items-center"
                        style={{ backgroundImage: `url(${event.imageUrl})` }}
                      ></div>
                      <div className="ZZtop text-center">
                        <div className="textMyEvent">
                          <b>{event.title}</b>
                        </div>
                        <p className="">
                          <i>{event.location}</i>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}
export default withAuth(MyEvents);
