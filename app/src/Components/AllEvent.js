import React, { Component } from 'react'
import EventsList from './EventsList'
import LogedInUser from './logedInUser'
import axios from 'axios'

class MyEvents extends Component {

	constructor(props) {
		super(props)
		this.state = {
      userid: LogedInUser,
			url: "https://eventbreak.herokuapp.com/getAllEvents";
			method: "get",
			params: ""
		}
	}

	render() {
		return (
		 <div className="card EventsList" style={{width: 50+'em', marginBottom: 7+'px'}}>
		 	<EventsList key='22536' index='22536' url={this.state.url} method={this.state.method}
		 		params={this.state.params} />
		</div>
		)

	}
}

export default MyEvents
