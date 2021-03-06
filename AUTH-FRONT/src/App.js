import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import AuthProvider from "./lib/AuthProvider";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";


class App extends Component {
  render() {
    return (
      <AuthProvider>
       
        <div className="container">
          

          <Switch>
          <AnonRoute exact path="/" component={Signup} />
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/private" component={Private} />
          </Switch>
        </div>
       
      </AuthProvider>
    );
  }
}

export default App;
