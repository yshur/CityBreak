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
				<CardGroup style={{display:'block', marginLeft:'4%'}}>
				  <Card style={{ boxShadow: '5px 10px 18px #888888', maxWidth:"365px",maxHeight:"380px",float:"left", margin:'15px', border:'none'}}>
						<Tour>
				    <Card.Body style={{background:'#F2F1EF'}}>
							<div>
							<Card.Title style={{marginLeft:'-12px',color:'black', width:"350px",height:"240px", backgroundImage:`url('https://media.tacdn.com/media/attractions-splice-spp-360x240/07/32/b7/2f.jpg')`}}></Card.Title>
							<p style={{fontSize:'24px', marginTop:'-50px', color:'black', fontWeight:'bold'}}>{tour.name}</p>
							</div>
			      	<Card.Text style={{color:'black'}}>Area: {tour.area}</Card.Text>
							<Card.Text style={{color:'black'}}>About: {tour.about}</Card.Text>
						</Card.Body>
				    <Card.Footer style={{width:'365px'}}>
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
