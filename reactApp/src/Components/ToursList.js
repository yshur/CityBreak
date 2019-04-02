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
		 const url = "http://localhost:3000/getAllTours";
		 fetch(url)
		 	.then((res) => {
		 		return res.json();
		 	})
		 	.then((data) => {
		 		var self=this;
		 		data.map((data) => {
		 			console.log('tour')
		 			self.add(data._id,data.id, data.source, data.lengthInKm, data.description, data.imagesUrls[0], data.title, data.category, data.location);
		 		})
			 })
	 }
	eachTour(tour, i) {
		console.log(tour.id)
		return (
			<div key={tour._id} index={tour._id} >
				<CardGroup style={{display:'block'}}>
				  <Card style={{maxWidth:"360px",maxHeight:"450px",float:"left", margin:'20px'}}>
						<Tour >
				    <Card.Img variant="top" img="true" style={{width:"350px",height:"300px"}} src={tour.imagesUrls} />
				    <Card.Body>
							<Card.Title style={{color:'black', width:"400px"}}>{tour.title}</Card.Title>
			      	<Card.Text style={{color:'black'}}>Km Distance: {tour.lengthInKm}</Card.Text>
						</Card.Body>
				    <Card.Footer>
				      <small className="text-muted">Last updated 3 mins ago</small>
				    </Card.Footer>
						</Tour>
				  </Card>
				</CardGroup>
			</div>
		)
	}
	add(_id,id,source,lengthInKm,description,imagesUrls,title,category,location) {

		this.setState(prevState => ({
			tours: [
				...prevState.tours,
				{
					_id:_id,
					id:id,
					source:source,
					lengthInKm:lengthInKm,
					description:description,
					imagesUrls:imagesUrls,
					title:title,
					category:category,
					location:location
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
