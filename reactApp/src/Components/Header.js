import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import logo from './logo.PNG';

class Header extends Component {
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
        return (
            <nav className="navbar navbar-light bg-light justify-content-between">
              <NavLink exact to="/" activeStyle={this.style} >
                <img src = {logo}  alt="Card cap" />
              </NavLink>

                <div style={this.header}>
                <NavLink exact to="/userInterface" activeStyle={this.style} >
                    Logged in
                </NavLink>
                </div>
            </nav>
        );
    }
}

export default Header;
