import React, { Component } from "react";
import { HashRouter as Router, NavLink, Route, useHistory } from "react-router-dom";
import SignIn from "./auth/sign-in";
import SignUp from "./auth/sign-up";
import "./lobby.css";


class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>

        <div className="signIn">
          <div className="appAside" />
          <div className="appForm">


            <div className="pageSwitcher">
              <NavLink
                to="/sign-in"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign In
              </NavLink>
              <NavLink
                exact
                to="/sign-up"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign Up
              </NavLink>
            </div>

            <div className="formTitle">
              <NavLink
                to="/sign-in"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/sign-up"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign Up
              </NavLink>
            </div>

            {/* <Redirect to="lobby/sign-up" /> */}

            <Route path="/sign-up" component={SignUp} />
            <Route exact path="/sign-in" component={SignIn} />
          </div>
        </div>
      </Router>

    );
  }
}

export default Lobby;