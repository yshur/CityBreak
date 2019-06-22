import React, { Component } from 'react'
import Tour from './Tour'
import {Card, CardGroup} from 'react-bootstrap';

class ToursList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tours: []
		}
		this.eachTour = this.eachTour.bind(this)
		this.add = this.add.bind(this)
	}
	componentDidMount() {
		 const url = "http://localhost:3000/getTours?limit=3";
		 fetch(url)
		 	.then((res) => {
		 		return res.json();
		 	})
		 	.then((data) => {
		 		var self=this;
		 		data.map((data) => {
		 			console.log('tour')
		 			self.add(data._id,data.id, data.area, data.name, data.recommended_season[0], data.tags[0],data.about);
		 		})
			 })
	 }
	eachTour(tour, i) {
		console.log(tour.id)
		return (
			<div key={tour._id} index={tour._id} >
				<CardGroup style={{display:'block', marginLeft:'70px'}}>
				  <Card style={{maxWidth:"330px",maxHeight:"380px",float:"left", margin:'20px'}}>
						<Tour>
				    <Card.Body>
							<Card.Title style={{color:'black', width:"270px",height:"210px",margin:'5px', backgroundImage:`url('https://media.tacdn.com/media/attractions-splice-spp-360x240/07/32/b7/2f.jpg')`}}>{tour.name}</Card.Title>

			      	<Card.Text style={{color:'black'}}>Area: {tour.area}</Card.Text>
							<Card.Text style={{color:'black'}}>{tour.about}</Card.Text>
						</Card.Body>
				    <Card.Footer>
				      <small className="text-muted">Duration:</small>
				    </Card.Footer>
						</Tour>
				  </Card>
				</CardGroup>
			</div>
		)
	}
	add(_id,id, area, name, recommended_season, tags, about) {

		this.setState(prevState => ({
			tours: [
				...prevState.tours,
				{
					_id:_id,
					id:id,
					area:area,
					name:name,
					recommended_season:recommended_season,
					tags:tags,
					about:about
				}]
		}))
	}

	render() {
		return (
		 		<div>
		 			{this.state.tours.map(this.eachTour)}
				</div>
		)
	}
}

export default ToursList
