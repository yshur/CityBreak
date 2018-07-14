import React, { Component } from 'react'
import UserItem from './UserItem'
import myEvents from './myEvents.png'



class UserInterface extends Component {
      
    render() {
        
        return (
            <div>
             <h1 style={{fontFamily: 'Love Ya Like A Sister', padding:"20px", marginLeft:"8%" }}> User Interface </h1>
        <div className="row" style={{marginTop: "10px", fontFamily: 'Love Ya Like A Sister' }}>

            <div className="col-sm-6" style={{marginLeft:"18px"}}>
                <div className="card" style={{margin: "20px"}}>

                    <div className="card-body" style={{padding:"10px", background: "#fff5e6"}}>
                    <h5 className="card-title">Create Event</h5>
                    <p className="card-text">Create new event and invite your friends to come</p>
                    <a href="http://localhost:3000/createEvent" className="btn btn-primary">Create Event</a>
                    </div>
                </div>
            </div>
            <div className="col-sm-6" style={{marginLeft:"18px"}}>
                <div className="card" style={{margin: "20px"}}>
                    <div className="card-body" style={{padding:"10px", background: "#ffffcc"}}>
                    <h5 className="card-title">My Events</h5>
                    <p className="card-text">Show all your events that you invited</p>
                    <a href="http://localhost:3000/events" className="btn btn-primary">My Events</a>
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
