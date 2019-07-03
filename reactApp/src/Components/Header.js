import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { Redirect } from 'react-router'
import logo from './logo.PNG';
import Cookies from 'js-cookie'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
    this.logout = this.logout.bind(this);
  }
  logout() {
    Cookies.remove('user_id');
    Cookies.remove('session_id');
    Cookies.remove('first_name');
    Cookies.remove('last_name');
  }
  active = {
      fontWeight: "bold",
      color: "black"
  };
  header = {
      display:"flex",
      justifyContent: "flex-start",
      listStyle: "none"

  };
  admin = {
      padding: "5px",
  };
  client = {
      padding: "5px"
  }
  logo = {
      width:"80px",
      height: "120px"
  }
  render() {
      const user = Cookies.get('first_name');
      return (
          <nav className="navbar navbar-light bg-light justify-content-between">
            <NavLink exact to="/" activeStyle={this.style} >
              <img src = {logo}  alt="Card cap" />
            </NavLink>
            
            <div style={this.header}>
              <NavLink  onClick={this.logout}
                  exact to="/login" activeStyle={this.style} >
                  {user ? "Sign out"  : "Sign in"}
              </NavLink>
            </div>
          </nav>
      );
  }
}

export default Header
