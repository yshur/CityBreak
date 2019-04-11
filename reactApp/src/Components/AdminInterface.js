import React, { Component } from 'react'
import AdminTour from './AdminTour'
import {Card, CardGroup} from 'react-bootstrap';

class AdminInterface extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tours: []
		}
		this.eachTour = this.eachTour.bind(this)
		this.add = this.add.bind(this)
		this.delete = this.delete.bind(this)
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
	delete(_id) {
	console.log('deleted: '+_id)
	this.setState(prevState => ({
		tours: prevState.tours.filter(tour => tour._id !== _id)
	}))
}
	eachTour(tour, i) {
		console.log(tour.id)
		return (
			<div key={tour._id} index={tour._id} >
				<CardGroup style={{display:'block', marginLeft:'70px'}}>
				  <Card style={{maxWidth:"330px",maxHeight:"380px",float:"left", margin:'20px'}}>
						<AdminTour>
						<AdminTour key={tour._id} index={tour._id} onDelete={this.delete} />
				    <Card.Img variant="top" img="true" style={{width:"300px",height:"200px",margin:'13px'}} src={tour.imagesUrls} />
				    <Card.Body>
							<Card.Title style={{color:'black', width:"400px"}}>{tour.title}</Card.Title>
			      	<Card.Text style={{color:'black'}}>Km Distance: {tour.lengthInKm}</Card.Text>
						</Card.Body>
				    <Card.Footer>
				      <small className="text-muted">Last updated 3 mins ago</small>
				    </Card.Footer>
						</AdminTour>
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

export default AdminInterface
