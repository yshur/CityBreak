import React, { Component } from 'react'
import {Card} from 'react-bootstrap';

class TourItem extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render(){
		return(
				<div className='tour'>
					<Card style={{ boxShadow: '5px 10px 18px #888888', maxWidth:"365px",maxHeight:"380px",float:"left", margin:'15px', border:'none'}}>
						<Card.Body style={{background:'#F2F1EF'}}>
							<div>
								<Card.Title style={{marginLeft:'-12px',color:'black', width:"350px",height:"240px", backgroundImage:`url(${this.props.tour.image_url})`}}></Card.Title>
								<p style={{fontSize:'24px', marginTop:'-50px', color:'black', fontWeight:'bold'}}>{this.props.tour.name}</p>
							</div>
							<Card.Text style={{color:'black'}}>{this.props.tour.name}</Card.Text>
							<Card.Text style={{color:'black'}}>Area: {this.props.tour.area}</Card.Text>
							<Card.Text style={{color:'black'}}>{this.props.tour.about}</Card.Text>
						</Card.Body>
						<Card.Footer style={{width:'365px'}}>
							<small className="text-muted">Duration: {this.props.tour.duration}</small>
						</Card.Footer>
					</Card>
				</div>
		)
	}
}

export default TourItem
