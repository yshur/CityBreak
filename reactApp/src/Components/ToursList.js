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
		 const url = "http://localhost:3000/getTours";
		 fetch(url)
		 	.then((res) => {
		 		return res.json();
		 	})
		 	.then((data) => {
		 		var self=this;
		 		data.map((data) => {
		 			console.log('tour')
		 			self.add(data._id,data.id, data.area, data.name, data.recommended_season[0], data.tags[0]);
		 		})
			 })
	 }
	eachTour(tour, i) {
		console.log(tour.id)
		return (
			<div key={tour._id} index={tour._id} >
				<CardGroup style={{display:'block', marginLeft:'70px'}}>
				  <Card style={{maxWidth:"330px",maxHeight:"380px",float:"left", margin:'20px'}}>
						<Tour >
				    <Card.Img variant="top" img="true" style={{width:"300px",height:"200px",margin:'13px'}} src={'https://www.google.com/search?q=paris&rlz=1C1CHZL_iwIL720IL720&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjqjJWxmP3iAhWPOcAKHfcVDNIQ_AUIECgB&biw=1422&bih=642#imgrc=cZdGEdBkRC2izM'} />
				    <Card.Body>
							<Card.Title style={{color:'black', width:"400px"}}>Name: {tour.name} </Card.Title>
			      	<Card.Text style={{color:'black'}}>Area: {tour.area}</Card.Text>
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
	add(_id,id, area, name, recommended_season, tags) {

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
