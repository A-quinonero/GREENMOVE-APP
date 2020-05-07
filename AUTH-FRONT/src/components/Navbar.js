import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoutLogo from "../img/sign-out-alt-solid.svg";
import { withAuth } from "../lib/AuthProvider"; //	<-- UPDATE HERE

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      button: !this.state.button,
    });
  }
  render() {
    const {  logout } = this.props; //	<-- UPDATE HERE
    return (
      <nav className="logout">
        <Link to={"/"} id="home-btn"></Link>
            <div >
            <a href='true'  onClick={logout}>
              <img className="logoutLogo" src= {logoutLogo} alt="Logout"/>
            </a>{" "}
        </div>
        </nav>
    );
  }
}
export default withAuth(Navbar);