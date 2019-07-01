import React, { Component } from 'react'
import {Card} from 'react-bootstrap';

class TourDetails extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tour: this.props.tour
		}

	}

	componentDidMount() {
		 const url = "https://citybreakshenkar.herokuapp.com//getTour/"+this.props.tour._id;
		 console.log(url)
		 fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				var self=this;
				data.map((data) => {
					// console.log(data)
					self.setState({tour:data});
				})
			 })
	 }
	render(){
		return(
				<div className='tour'>
					<Card style={{ boxShadow: '5px 10px 18px #888888', maxWidth:"365px",maxHeight:"380px",float:"left", margin:'15px', border:'none'}}>
						<Card.Body style={{background:'#F2F1EF'}}>
							<div>
								<Card.Title style={{marginLeft:'-12px',color:'black', width:"350px",height:"240px", backgroundImage:`url(${this.props.tour.image_url[0]})`}}></Card.Title>
								<p style={{fontSize:'24px', marginTop:'-50px', color:'black', fontWeight:'bold'}}>{this.state.tour.name}</p>
							</div>
							<Card.Text style={{color:'black'}}>Area: {this.state.tour.area}</Card.Text>
							<Card.Text style={{color:'black'}}>Sub Area: {this.state.tour.sub_area}</Card.Text>
							<Card.Text style={{color:'black'}}>About: {this.state.tour.about}</Card.Text>
							<Card.Text style={{color:'black'}}>Distance: {this.state.tour.distance} KM</Card.Text>
							<Card.Text style={{color:'black'}}>Tags: {this.state.tour.tags}</Card.Text>
						</Card.Body>
						<Card.Footer style={{width:'365px'}}>
							<small className="text-muted">Duration: {this.state.tour.duration}</small>

						</Card.Footer>
					</Card>
					<Card>
						<Card.Body style={{background:'#F2F1EF'}}>
							<Card.Text>Point List: {this.state.tour.points_list}</Card.Text>
						</Card.Body>
					</Card>
				</div>
		)
	}
}

export default TourDetails
