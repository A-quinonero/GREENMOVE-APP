import React, { Component } from "react";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
import logo from "../img/noun_profile_1669472.png";

// import axios from "axios";
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      user: {},
    };
  }
  handleFileUpload = (e) => {
    console.log("The file to be uploaded is :", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    service
      .handleUpload(uploadData)
      .then((response) => {
        this.setState({ imageUrl: response.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file:", err);
      });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    await service.profileUpdate(this.state);
    const finalUser = await service.getUserInfo();
    this.setState({ finalUser });
    this.props.history.push("/private/my-profile");
    console.log("Edited!");
  };
  componentDidMount = () => {
    this.setState(this.props.user);
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="createEvent pb-5 mb-5 m-3">
        <h2 className="text-center ">Edit User</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group">
            <div className="col text-center pb-3">
              <p htmlFor="idProfileImg">Edit profile image</p>
              <img
                className="profileImg"
                src={this.state.user.imageUrl ? this.state.user.imageUrl : logo}
                alt=""
              />
            </div>

            <input
              type="file"
              required
              className="form-control"
              id="idProfileImg"
              name="imageUrl"
              aria-describedby="image"
              placeholder={this.state.imageUrl}
              onChange={(e) => this.handleFileUpload(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="idName">Name</label>
            <input
              required
              className="form-control"
              id="idName"
              aria-describedby="Name"
              placeholder={this.state.name}
              type="text"
              name="name"
              value={this.state.name || ""}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="idName">Lastname</label>
            <input
              required
              className="form-control"
              id="idLastName"
              aria-describedby="Lastname"
              placeholder={this.state.lastName}
              type="text"
              name="lastName"
              value={this.state.lastName || ""}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="idSobreMi">Sobre Mi</label>
            <textarea
              required
              className="form-control"
              id="idSobremi"
              aria-describedby="Sobremi"
              placeholder={this.state.sobreMi}
              type="text"
              name="sobreMi"
              value={this.state.sobreMi || ""}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <div className="text-center">
            <button className="btn btnBlue" type="submit">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default withAuth(EditProfile);
