import React, { Component } from 'react'
import UserItem from './UserItem'
import { NavLink } from "react-router-dom";


class UserInterface extends Component {

    render() {

        return (
            <div>
             <h1 style={{fontFamily: 'Love Ya Like A Sister', padding:"20px", textAlign: "center" }}> User Interface </h1>
        <div className="row" style={{marginTop: "10px", fontFamily: 'Love Ya Like A Sister' }}>

            <div className="col-sm" style={{marginLeft:"18px"}}>
                <div className="card" style={{margin: "20px"}}>

                    <div className="card-body" style={{padding:"10px", background: "#fff5e6"}}>
                    <h5 className="card-title">Create Event</h5>
                    <p className="card-text">Create new event and invite friends</p>
                    <NavLink exact to="/createEvent" className="btn btn-primary" activeStyle={this.style} >
                        Create Event
                    </NavLink>
                    </div>
                </div>
            </div>
            <div className="col-sm" style={{marginLeft:"18px"}}>
                <div className="card" style={{margin: "20px"}}>
                    <div className="card-body" style={{padding:"10px", background: "#ffffcc"}}>
                    <h5 className="card-title">My Events</h5>
                    <p className="card-text">Show all your events that you invited</p>
                    <NavLink exact to="/events" className="btn btn-primary" activeStyle={this.style} >
                        My Events
                    </NavLink>
               </div>
            </div>
          </div>
                 <div className="col-sm" style={{marginLeft:"18px"}}>
                <div className="card" style={{margin: "20px"}}>
                    <div className="card-body" style={{padding:"10px", background: "#ccffff"}}>
                    <h5 className="card-title">All Events</h5>
                    <p className="card-text">Show all events in application</p>
                    <NavLink exact to="/events" className="btn btn-primary" activeStyle={this.style} >
                        All Events
                    </NavLink>
               </div>
            </div>
          </div>
        </div>
        <div class="footer">
            <p style={{marginTop: "20px"}}> &copy; All right reserved to Roi Shmueli & Yair Shur</p>
        </div>
        </div>

        )

    }
}

export default UserInterface
