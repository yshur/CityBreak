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
		 const url = "http://localhost:3000/getTours?"+(this.props.params ? this.props.params : 'limit=3');
		 console.log(url)
		 fetch(url)
		 	.then((res) => {
		 		return res.json();
		 	})
		 	.then((data) => {
		 		var self=this;
		 		data.map((data) => {
		 			console.log(data)
		 			self.add(data._id, data.area, data.name,data.about,data.image_url);
		 		})
			 })
	 }
	 componentWillReceiveProps() {
		 console.log(this.props.params)
			const url = "http://localhost:3000/getTours?"+this.props.params;
			console.log(url)
			fetch(url)
			 .then((res) => {
				 return res.json();
			 })
			 .then((data) => {
				 var self=this;
				 data.map((data) => {
					 console.log(data)
					 self.add(data._id, data.area, data.name,data.about,data.image_url);
				 })
				})
		}
	eachTour(tour, i) {
		return (
			<div key={tour._id+i} index={i} >
				<CardGroup style={{display:'block', marginLeft:'4%'}}>
				  <Card style={{ boxShadow: '5px 10px 18px #888888', maxWidth:"365px",maxHeight:"380px",float:"left", margin:'15px', border:'none'}}>
						<Tour>
				    <Card.Body style={{background:'#F2F1EF'}}>
							<div>
							<Card.Title style={{marginLeft:'-12px',color:'black', width:"350px",height:"240px", backgroundImage:`url(${tour.image_url})`}}></Card.Title>
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
	add(_id, area, name, about, image_url) {
		console.log(image_url)
		this.setState(prevState => ({
			tours: [
				...prevState.tours,
				{
					_id:_id,
					area:area,
					name:name,
					about:about,
					image_url:image_url
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
