import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import { UserModel } from './UserModel'
import { UsersList } from "./UsersList"
import { EventsList } from "./EventsList"
import { CategoriesList } from "./CategoriesList"
import { EquipmentsList } from "./EquipmentsList"

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
    render() {
        return (
            <div style={this.header}>
                <NavLink exact to="/" activeStyle={this.style} >
                    Event Break
                </NavLink>
                <div className="admin" style={this.admin}>
                    <NavLink exact to="/Admin" activeStyle={this.active}>
                    Admin
                    </NavLink>
                </div>
                <div className="client" style={this.client}>
                    <NavLink to="/Client" activeStyle={this.active}>
                    Client
                    </NavLink>
                </div>
                <div className="users" style={this.client}>
                    <NavLink to="/users" activeStyle={this.active}>
                    Users
                    </NavLink>
                </div>
                <div className="events" style={this.client}>
                    <NavLink to="/events" activeStyle={this.active}>
                    Events
                    </NavLink>
                </div>
                <div className="categories" style={this.client}>
                    <NavLink to="/categories" activeStyle={this.active}>
                    Categories
                    </NavLink>
                </div>
                <div className="equipments" style={this.client}>
                    <NavLink to="/equipments" activeStyle={this.active}>
                    Equipments
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default Header;
