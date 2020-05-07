import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Signup extends Component {
  state = { username: "", password: "", name: "", lastName: "" };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, name, lastName } = this.state;
    this.props.signup({ username, password, name, lastName });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, name, lastName } = this.state;
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
                  <button type="radio" id="1" className="btn btnOnLog">
                    Sign up
                  </button>
                </Link>
              </div>
              <div className="m-2 ">
                <Link style={{ textDecoration: 'none' }} to="/login">
                  <button type="radio" id="2" className="btn btnOffLog">
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
                  name="name"
                  className="form-control formLog"
                  placeholder="Name"
                  value={name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  required
                  type="text"
                  name="lastName"
                  className="form-control formLog"
                  placeholder="Lastname"
                  value={lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  required
                  type="text"
                  name="username"
                  className="form-control formLog"
                  placeholder="Username"
                  value={username}
                  onChange={this.handleChange}
                />
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
              <div className="text-center pt-3">
                <input type="submit" value="Sign up" className="btnOrangeLog" />
              </div>
            </form>
            <div className="logRedirect text-center pb-3">
              <h5>Already have account?</h5>
              <div className="mt-3">
                <Link style={{ textDecoration: 'none' }} to={"/login"} className="btnBlue2 ">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(Signup);
