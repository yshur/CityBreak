import React, { Component } from 'react'
import EventsList from './EventsList'
import LogedInUser from './logedInUser'

class MyEvents extends Component {

	constructor(props) {
		super(props)
		this.state = {
      userid: LogedInUser,
			url: "localhost:3000/getUserEvent",
			method: "post",
			params: "'userid': "+LogedInUser
		}
	}

	render() {
		return (
		 <div className="card EventsList" >
		 	<EventsList key='22536' index='22536' url={this.state.url} method={this.state.method}
		 		params={this.state.params} />
		</div>
		)

	}
}

export default MyEvents
