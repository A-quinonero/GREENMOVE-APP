import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
class Login extends Component {
  state = {
    username: "",
    password: "",
    listOfUsers: [],
    messageErrUser: "",
    messageErrPassword: "",
  };

  componentDidMount = () => {
    this.getAllUsers();
  };
  getAllUsers = () => {
    axios
      .get(process.env.REACT_APP_API_URI + `/api/allprofiles`)
      .then((responseFromApi) => {
        this.setState({
          listOfUsers: responseFromApi.data,
        });
      });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    let errorMessage = this.state.listOfUsers.findIndex(
      (user) => username === user.username
    );
    if (errorMessage === -1) {
      this.setState({
        messageErrUser:
          errorMessage === -1 ? (
            <span className="text-danger">User doesn't exist</span>
          ) : (
            <span></span>
          ),
      });
    } else {
      this.props.login({ username, password });
    }

    let errorPassword = this.state.listOfUsers.findIndex(
      (user) => password === user.password
    );

    if (errorPassword === -1) {
      this.setState({
        messageErrPassword:
          errorPassword === -1 ? (
            <span className="text-danger">Wrong Password</span>
          ) : (
            <span></span>
          ),
      });
    } else {
      this.props.login({ username, password });
    }
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { username, password } = this.state;
    return (
      <div className="fondoApp position-absolute">
        <div className=" m-3 padLog">
          <nav>
            <div
              className="btn-group-active row d-flex justify-content-center mb-3"
              data-toggle="buttons"
              role="group"
              aria-label="Basic example"
            >
              <div className="m-2">
                <Link style={{ textDecoration: "none" }} to="/signup">
                  <button type="radio" id="1" className="btn btnOffLog">
                    Sign up
                  </button>
                </Link>
              </div>
              <div className="m-2 ">
                <Link style={{ textDecoration: "none" }} to="/login">
                  <button type="radio" id="2" className="btn btnOnLog">
                    Log in
                  </button>
                </Link>
              </div>
            </div>
          </nav>
          <div className="loginsignup-form">
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group">
                <input
                  required
                  type="text"
                  className="form-control formLog"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.handleChange}
                />
                {this.state.messageErrUser}
              </div>
              <div className="form-group">
                <input
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control formLog"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.messageErrPassword}

              <div className="text-center pt-3">
                <input type="submit" value="Log in" className="btnBlueLog" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(Login);
