import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import logo from "../img/noun_profile_1669472.png";
import auth from "../api/service";
import edit from "../img/edit.png";
import Navbar from "../components/Navbar";
class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        myAccions: [],
        joinAccions: [],
      },
    };
  }
  componentDidMount = async () => {
    const userInfo = await auth.getUserInfo();
    this.setState({ user: userInfo });
    console.log(this.state.user.myAccions.length, "el useeeer");
  };
  render() {
    console.log(this.state.myAccions, "state");
    return (
      <div className="container-page text-center d-flex justify-content-center">
        <Navbar />
        <div>
          <div className="text-center">
            <div>
              <Link to={`/private/edit-profile`}>
                <button className="btnBorder ">
                  <img className="logo-edit" src={edit} alt="" />
                </button>
              </Link>
            </div>
            <div className="text-center">
              <h3 className=" mb-2">Profile</h3>
            </div>

            <img
              className="profileImg mt-4"
              src={this.state.user.imageUrl ? this.state.user.imageUrl : logo}
              alt=""
            />
          </div>
          <div className="d-flex justify-content-center pt-3">
            <div className="row d-flex align-items-center justify-content-center btnBlueProfile">
              <div className="col text-center textprof">
                {/* <img className="medalProfile" src={accions} alt="" srcset=""/> */}
                <p>
                  <b>{this.state.user.myAccions.length}</b>
                </p>
                <p className="">
                  <i>Created</i>
                </p>
              </div>
              <div className="col text-center textprof">
                <p>
                  <b>{this.state.user.joinAccions.length}</b>
                </p>
                <p className="">
                  <i>Joined</i>
                </p>
                {/* <img className="medalProfile" src={joinMod} alt="" srcset=""/> */}
              </div>
            </div>
          </div>
          <div className="text-justify profile-text justify-content-center">
            <div className="textoProfile ml-5 mt-5 mb-3">
              <p className="mt-4">
                <b>Name:</b> {this.state.user.name}
              </p>

              <p className="mt-4">
                <b>Lastname:</b> {this.state.user.lastName}
              </p>

              <p className="mt-4 aboutme">
                <b>About me:</b> {this.state.user.sobreMi}
              </p>
            </div>

            <div className="d-flex justify-content-center text-center"></div>
            <Link to="/private/add-events">
              <div className="col text-center">
                <button className="btn btnOrangeProf mt-4">
                  Create Action
                </button>
              </div>
            </Link>
            <br />
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(MyProfile);
