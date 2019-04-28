import React, { Component } from 'react'
import Track from './Track'
import {Card, CardGroup} from 'react-bootstrap';

class TrackList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tracks: []
		}

		this.eachTrack = this.eachTrack.bind(this)
		this.add = this.add.bind(this)
	}

	componentDidMount() {
		 const url = "http://localhost:3000/getAllRoutes";
		 fetch(url)
		 	.then((res) => {
		 		return res.json();
		 	})
		 	.then((data) => {
		 		var self=this;
		 		data.map((data) => {
		 			// console.log('track')
		 			self.add(data._id,data.id, data.name,data.route);
					console.log(data.route);
		 		})
			 })
	 }
	eachTrack(track, i) {
		// console.log(track.id)
		return (
				<div key={track.id} index={track._id} >
					<CardGroup style={{display:'block', marginLeft:'70px'}}>
						<Card style={{maxWidth:"330px",maxHeight:"380px",float:"left", margin:'20px'}}>
							<Track>
							<Card.Body>
								<Card.Title style={{color:'black', width:"400px"}}>{track.name}</Card.Title>
								<Card.Text style={{color:'black'}} key={i}>Route: {track.route[0].name}</Card.Text>
								<Card.Text style={{color:'black'}} key={i}>Arrival: {track.route[0].arrival}</Card.Text>
								<Card.Text style={{color:'black'}} key={i}>Distance: {track.route[0].distance}</Card.Text>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted">Last updated 3 mins ago</small>
							</Card.Footer>
							</Track>
						</Card>
					</CardGroup>
				</div>

		)
	}
	add(_id,id,name,route) {

		this.setState(prevState => ({
			tracks: [
				...prevState.tracks,
				{
					_id:_id,
					id:id,
					name:name,
					route:route
				}]
		}))
	}

	render() {
		return (
		 		<div>
					{this.state.tracks.map(this.eachTrack)}
				</div>
		)
	}
}

export default TrackList
